<template>
  <BasicForm @register="register" @submit="handleSubmit" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'CertInfo' });
</script>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { useAppStore } from '/@/store/modules/app';
  import { CertSchemas } from '../info.data';
  import { watchEffect, unref, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { defHttp } from '/@/utils/http/axios';
  import { customerListApi } from '/@/api/system/project';
  import { useRouter } from 'vue-router';
  const { replace } = useRouter();

  enum Api {
    CREATE_CERTIFICATE = '/api/certificate/create',
    UPDATE_CERTIFICATE = '/api/certificate/update',
    GET_CERTIFICATE = '/api/certificate/details'
  }
  const props = defineProps({
    clickName: {
      type: String
    },
    count: {
      type: Number
    }
  });

  const appSize = useAppStore().getAppSize;
  const route = useRoute();
  const cfId = ref(route.params?.id);
  const cusId = route.params?.cusId || '';
  const isNew = ref(route.params?.id == '0' || !route.params?.id || route.params?.id == ':id');

  const { setTitle } = useTabs();
  const [register, { validate, resetFields, setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: CertSchemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize == 'small' ? 'small' : 'default',
    showAdvancedButton: false,
    showResetButton: false,
    showSubmitButton: false
  });
  const customsList = ref([]);
  const customName = ref('');
  onMounted(async () => {
    const values = await customerListApi();
    customsList.value = values.data;
    const arr: any = customsList.value?.filter((item: any) => {
      if (item?.value == cusId) {
        return item;
      }
    });
    if (arr.length > 0) {
      customName.value = arr[0].text;
    }

    if (isNew.value) {
      setTitle('新增证件');
      if (cusId != ':cusId')
        setFieldsValue({
          customerId: cusId,
          customerName: unref(customName)
        });
    } else {
      const values = await defHttp.post(
        { url: Api.GET_CERTIFICATE, params: { key: cfId.value } },
        { isTransformResponse: false }
      );
      values.data.fieldTime = [];
      values.data.fieldTime.push(values.data.validityBegin);
      values.data.fieldTime.push(values.data.validityEnd);

      setFieldsValue(values.data);
      setTitle('编辑证件：' + values.data.bsCode);
    }
  });

  watchEffect(() => {
    if (unref(props.count) || 0 > 0) {
      switch (unref(props.clickName)) {
        case 'save':
          handleSubmit();
          break;
        case 'reset':
          resetFields();
          break;
      }
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      if (values.fieldTime) {
        if (!values.validityBegin) values.validityBegin = values.fieldTime[0];
        if (!values.validityEnd) values.validityEnd = values.fieldTime[1];
      } else {
        values.validityBegin = null;
        values.validityEnd = null;
      }
      if (isNew.value) {
        var res = await defHttp.post(
          { url: Api.CREATE_CERTIFICATE, params: values },
          { isTransformResponse: false }
        );
        if (res.success) {
          replace({
            path: '/xyos/certificate/edit/' + res.data.id + '/' + res.data.customerId
          });
        }
        // 新增执行重定向
      } else {
        await defHttp.post({ url: Api.UPDATE_CERTIFICATE, params: values }, { isToastMsg: true });
      }
    } catch (e) {
      console.log(e);
    }
  }
</script>

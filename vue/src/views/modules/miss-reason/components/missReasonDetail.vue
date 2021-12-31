<template>
    <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="isUpdate ? '编辑丢失原因' : '新增丢失原因'"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="register" @submit="handleSubmit" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'MissReasonDetail' });
</script>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { formSchema } from './missReason';
  import { isFunction } from '/@/utils/is';
  import { missReasonInsert, missReasonUpdate } from '../api/missReason';

  const appSize = useAppStore().getAppSize;

  const props = defineProps({
    missReasonId: {
      type: String
    },
    onSubmitSuccess: {
      type: Function
    },
    onSubmitError: {
      type: Function
    }
  });
  const isUpdate = ref(true);

  const [register, { validate, resetFields, setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: formSchema,
    actionColOptions: {
      span: 24
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: false,
    showSubmitButton: false,
    autoSetPlaceHolder: true
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    //重设值
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    console.log(111);
    if (!unref(isUpdate)) {
      if (props.missReasonId) {
        setFieldsValue({
          formMissReasonId: unref(props.missReasonId)
        });
      }
    }
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record
      });
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      console.log(values);
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      const fun = unref(isUpdate) ? missReasonUpdate : missReasonInsert;
      let result = await fun(values);
      if (result) {
        if (isFunction(props.onSubmitSuccess)) {
          props.onSubmitSuccess();
          closeDrawer();
        }
      } else {
        if (isFunction(props.onSubmitError)) props.onSubmitError();
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
<style lang="less" scoped></style>

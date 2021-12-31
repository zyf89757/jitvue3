<template>
  <Card title="业务信息" class="p-0">
    <BasicForm
      @register="register"
      @reset="handleReset"
      @submit="handleSubmit"
      :submitButtonOptions="{ text: '确认' }"
    />
  </Card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'BusinessAddition' });
</script>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { getSysAddition, sysAdditionUpdate } from '/@/api/demo/account';
  import { additionSchemas } from '../addition';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { citiesOptionsData, areasOptionsData } from '../components/Address';

  const appSize = useAppStore().getAppSize;

  const { createMessage } = useMessage();

  const userStore = useUserStore();

  const userInfo = userStore.getUserInfo;

  const [register, { validate, setFieldsValue, updateSchema }] = useForm({
    labelWidth: 200,
    schemas: additionSchemas,
    actionColOptions: {
      span: 20
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: true,
    showSubmitButton: true,
    autoSetPlaceHolder: true
  });

  async function loadData() {
    const param = userInfo.tenantId;
    let result = await getSysAddition(param);
    if (result != null && result.code == 200) {
      let citiesOptions = citiesOptionsData[result.data.provinceCode];
      updateSchema({
        field: 'cityCode',
        componentProps: {
          allowClear: false,
          options: citiesOptions,
          placeholder: '请选择市',
          onChange: (a: any, b: any) => {
            if (a === undefined) {
              return;
            }
            let areasOptions = areasOptionsData[b.id];
            updateSchema({
              field: 'areaCode',
              componentProps: {
                allowClear: false,
                options: areasOptions,
                placeholder: '请选择县(区)'
              }
            });
          }
        }
      });
      let areasOptions = areasOptionsData[result.data.cityCode];
      updateSchema({
        field: 'areaCode',
        componentProps: {
          allowClear: false,
          options: areasOptions,
          placeholder: '请选择县(区)'
        }
      });
      setFieldsValue(result.data);
    }
  }

  loadData();

  async function handleSubmit() {
    try {
      const values = await validate();
      let result = await sysAdditionUpdate(values);
      if (result != null && result.success) createMessage.success('修改成功！');
      else createMessage.error(result.message);
    } finally {
    }
  }

  function handleReset() {
    loadData();
  }
</script>
<style lang="less" scoped></style>

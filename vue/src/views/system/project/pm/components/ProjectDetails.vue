<template>
    <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="isUpdate ? '编辑项目' : '新增项目'"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="register" @submit="handleSubmit" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ProjectDetails' });
</script>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { sysProjectAdd, sysProjectUpdate } from '/@/api/system/project';
  import { projectSchemas } from '../project.data';
  import { isFunction } from '/@/utils/is';

  const appSize = useAppStore().getAppSize;

  const props = defineProps({
    customerId: {
      type: String
    },
    customerName: {
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
    schemas: projectSchemas,
    actionColOptions: {
      span: 24
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: false,
    showSubmitButton: false,
    autoSetPlaceHolder: true,
    fieldMapToTime: [['fieldTime', ['beginDate', 'endDate'], 'YYYY-MM-DD']]
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    //重设值
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    console.log(props);
    if (!unref(isUpdate)) {
      if (props.customerId) {
        setFieldsValue({
          fromCustomerId: unref(props.customerId),
          fromCustomerName: unref(props.customerName)
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
      if (values.fieldTime) {
        if (!values.beginDate) values.beginDate = values.fieldTime[0];
        if (!values.endDate) values.endDate = values.fieldTime[1];
      } else {
        values.beginDate = null;
        values.endDate = null;
      }
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      const fun = unref(isUpdate) ? sysProjectUpdate : sysProjectAdd;
      let result = await fun(values);
      if (result) {
        if (isFunction(props.onSubmitSuccess)) props.onSubmitSuccess();
        closeDrawer();
      } else {
        if (isFunction(props.onSubmitError)) props.onSubmitError();
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
<style lang="less" scoped></style>

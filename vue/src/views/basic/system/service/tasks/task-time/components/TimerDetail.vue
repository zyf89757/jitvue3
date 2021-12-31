<template>
    <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="isUpdate ? '编辑后台任务' : '新增后台任务'"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="register" @submit="handleSubmit" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'TimerDetails' });
</script>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { createTimerTask, updateTimerTask } from '/@/api/demo/task';
  import { timerSchemas } from '../task-time';
  import { isFunction } from '/@/utils/is';
  const appSize = useAppStore().getAppSize;

  const props = defineProps({
    entity: {
      type: Object,
      default: null
    },
    onSubmitSuccess: {
      type: Function
    },
    onSubmitError: {
      type: Function
    }
  });
  const isUpdate = ref(false);

  const [register, { validate, resetFields, setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: timerSchemas,
    actionColOptions: {
      span: 24
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: false,
    showSubmitButton: false,
    autoSetPlaceHolder: true
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    console.log(data);
    //重设值
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record
      });
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      const fun = !unref(isUpdate) ? createTimerTask : updateTimerTask;
      let result = await fun(values, values.id);
      if (result) {
        if (isFunction(props.onSubmitSuccess)) props.onSubmitSuccess();
      } else {
        if (isFunction(props.onSubmitError)) props.onSubmitError();
      }
      closeDrawer();
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
<style lang="less" scoped></style>

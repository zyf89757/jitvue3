<template>
    <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="isUpdate ? '编辑菜单' : '新增菜单'"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="register" @submit="handleSubmit" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'MenuDetails' });
</script>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { sysMenuAdd, sysMenuUpdate } from '/@/api/saas/app/menuManage';
  import { menuSchemas } from '../menu.data';
  import { isFunction } from '/@/utils/is';
  import { appMenuListApi } from '/@/api/saas/app/menuManage';
  const appSize = useAppStore().getAppSize;

  const props = defineProps({
    entity: {
      type: Object,
      default: null
    },
    applicationId: {
      type: String
    },
    menuId: {
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

  const [register, { validate, resetFields, setFieldsValue, updateSchema }] = useForm({
    labelWidth: 120,
    schemas: menuSchemas,
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
    updateSchema({
      field: 'pid',
      componentProps: {
        api: appMenuListApi,
        params: { appId: unref(props.applicationId) },
        resultField: 'data',
        immediate: true
      }
    });
    if (!unref(isUpdate)) {
      let menuId = props.menuId == '' ? '0' : props.menuId;
      setFieldsValue({
        applicationId: unref(props.applicationId),
        pid: menuId
      });
    }
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record
      });
    }
    /*
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getMenuList();
    updateSchema({
      field: 'parentMenu',
      componentProps: { treeData },
    });
    */
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      const fun = unref(isUpdate) ? sysMenuUpdate : sysMenuAdd;
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

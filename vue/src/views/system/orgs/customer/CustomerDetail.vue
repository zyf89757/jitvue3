<template>
    <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="isUpdate ? '编辑客户' : '新增客户'"
    width="50%"
    @ok="handleSubmit"
  >
    <!-- 新增头像功能 -->
    <!-- <CropperAvatar
      :uploadApi="uploadApi"
      :value="avatar"
      btnText="更换头像"
      :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
      @change="updateAvatar"
      width="150"
    /> -->

    <BasicForm @register="register" @submit="handleSubmit" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'CustomerDetail' });
</script>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { sysCustomerAdd, sysCustomerUpdate, uploadApi } from '/@/api/system/customer';

  import { formSchema } from './detail';
  import { isFunction } from '/@/utils/is';
  // import { CropperAvatar } from '/@/components/Cropper/index';
  // import headerImg from '/@/assets/images/header.jpg';

  const appSize = useAppStore().getAppSize;

  const props = defineProps({
    entity: {
      type: Object,
      default: null
    },
    formOrgId: {
      type: String
    },
    formDepartmentId: {
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
    labelWidth: 140,
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
    props.formOrgId = !!data?.formOrgId;
    props.formDepartmentId = !!data?.formDepartmentId;
    // updateSchema({
    //   field: 'pid',
    //   componentProps: {
    //     api: appMenuListApi,
    //     params: { appId: unref(props.applicationId) },
    //     resultField: 'data',
    //     immediate: true,
    //   },
    // });
    if (!unref(isUpdate)) {
      setFieldsValue({
        formOrgId: unref(props.formOrgId),
        formDepartmentId: unref(props.formDepartmentId)
      });
    }
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record
      });
    }
    /*
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
      const fun = unref(isUpdate) ? sysCustomerUpdate : sysCustomerAdd;
      let result = await fun(values);
      if (result) {
        if (isFunction(props.onSubmitSuccess)) {
          props.onSubmitSuccess();
        }
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

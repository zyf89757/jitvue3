<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="isUpdate ? '编辑公告' : '新增公告'"
    width="50%"
    @ok="handleSubmit"
  >
    <template #centerFooter>
      <a-button type="primary" @click="draft"> 存为草稿</a-button>
    </template>
    <BasicForm @register="register" @submit="handleSubmit" @change="formdata" />
    <Shuttlebox
      @changeData="changeData"
      :editSeleData="editSeleData"
      :userdata="userdata"
      v-if="Inform"
    />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: { BasicDrawer, Shuttlebox }
  });
</script>
<script lang="ts" setup>
  import { sysnoticeadd, sysnoticeedit } from '/@/api/system/notice';
  import Shuttlebox from './Shuttlebox.vue';
  import { ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { formSchema } from './info.';
  import { isFunction } from '/@/utils/is';
  import { defHttp } from '/@/utils/http/axios';

  const appSize = useAppStore().getAppSize;
  const editSeleData = ref();
  const userdata = ref();
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
  function changeData(e) {
    setFieldsValue({
      noticeUserIdList: e
    });
  }

  const Inform = ref(true);
  function formdata() {
    var objvalue = getFieldsValue();
    if (objvalue.InformAll == 0) {
      setFieldsValue({
        InformAll: 1
      });
      return (Inform.value = false);
    } else {
      getUser();
      setFieldsValue({
        InformAll: 0
      });
      return (Inform.value = true);
    }
  }
  const formvalue = ref();
  const isUpdate = ref(true);
  const [register, { validate, resetFields, setFieldsValue, getFieldsValue }] = useForm({
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
    resetFields();
    getUser();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record
      });
      var userArray = new Array([]);
      var user = data.record.noticeUserIdList;
      let userindex = user.length;
      editSeleData.value = user;
      for (var i = 0; i < userindex; i++) {
        var userName = user[i].text;
        console.log(userName);
        userArray.push(userName);
      }
    }
  });
  async function getUser() {
    var obj = await defHttp.get(
      {
        url: '/api/tenant/user/KeyValues'
      },
      { isTransformResponse: true }
    );
    userdata.value = obj.data;
  }
  const emit = defineEmits(['okStaus']);
  async function draft() {
    const fromValues = await validate();
    let successStaus = 1;
    fromValues.status = 0;
    if (unref(isUpdate)) {
      defHttp.post({ url: '/api/notice/edit/', params: fromValues }, { isToastMsg: true });
      closeDrawer();
      emit('okStaus', successStaus);
    } else {
      defHttp.post({ url: `/api/notice/add/`, params: fromValues }, { isToastMsg: true });
      closeDrawer();
      emit('okStaus', successStaus);
    }
  }
  async function handleSubmit() {
    try {
      const values = await validate();
      values.status = 1;
      formvalue.value = values;
      setDrawerProps({ confirmLoading: true });
      const fun = unref(isUpdate) ? sysnoticeedit : sysnoticeadd;
      let result = await fun(values);
      formvalue.value == result;
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
<style lang="less" scoped>
  .subButton {
    float: right;
    margin-top: -30px;
  }
</style>

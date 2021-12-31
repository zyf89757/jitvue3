<template
  ><div class="moduce">
    <div class="btnPo">
      <a-button type="primary" class="subButton" @click="functs">保存</a-button>
    </div>
    <BasicForm @register="register" class="formOne" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ModuceForm' });
</script>

<script lang="ts" setup>
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { getmoduce } from './Deta';
  import { onActivated, onDeactivated, watchEffect } from 'vue';
  const appSize = useAppStore().getAppSize;
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '模型详情'
    },
    {
      field: 'modulName',
      component: 'Input',
      label: '模板名',
      colProps: {
        span: 18
      }
    },
    {
      field: 'modulSo',
      component: 'InputTextArea',
      label: '说明',
      colProps: {
        span: 18
      }
    }
  ];
  const props = defineProps({
    formMoudceid: {
      default: '',
      type: String
    }
  });
  const [register, { setFieldsValue, resetFields }] = useForm({
    labelWidth: 120,
    schemas: schemas,
    actionColOptions: {
      span: 24
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: false,
    showSubmitButton: false,
    autoSetPlaceHolder: true
  });
  async function loaddata() {
    if (props.formMoudceid == '') {
      return;
    }
    console.log(props.formMoudceid, 'Key');
    var result = await getmoduce(props.formMoudceid);
    var dataobj = result.data;
    console.log(result.data, '数据');
    setFieldsValue({
      modulName: dataobj.moduleName,
      modulSo: dataobj.remark
    });
    console.log(1);
  }
  onActivated(() => {
    loaddata();
  });
  watchEffect(() => {
    loaddata();
  });
  onDeactivated(() => {
    resetFields();
  });
</script>
<style>
  .moduce {
    width: 70%;
  }
  .btnPo {
    float: right;
  }
</style>

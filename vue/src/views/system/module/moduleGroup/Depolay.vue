<template>
  <div class="divdepo">
    <!-- <a-button type="reset" class="addbutton" @click="backSubmit">保存</a-button>
    <BasicForm @register="register" class="formOne" /> -->
    <BasicUpload
      :previewFileList="fileList"
      @change="handleChange"
      :maxSize="20"
      :maxNumber="10"
      :accept="['xls', 'xlsx']"
      :api="uploadApi"
      class="my-5"
      :emptyHidePreview="false"
      :showPreviewNumber="false"
    />
    <EzTable
      :data-source="dataSource"
      :allow-adding="false"
      :allow-deleting="false"
      :allow-updating="false"
    >
      <DxColumn data-field="templateName" caption="模板名称" />
      />
    </EzTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'RightDepoForm',
    components: {
      BasicForm,
      BasicUpload
    }
  });
</script>
<script lang="ts" setup>
  // import Card from '/@/components/Card/Card.vue';
  import { useAppStore } from '/@/store/modules/app';
  import { onActivated, ref } from 'vue';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { watchEffect, reactive, onDeactivated } from 'vue';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { moductListGroupApi } from '/@/api/system/module';
  import { BasicUpload } from '/@/components/Upload';
  import { UploadApiResult } from '/@/api/sys/model/uploadModel';
  import { UploadFileParams } from '/#/axios';
  import { useGlobSetting } from '/@/hooks/setting';
  import { Ez } from '/@/utils/devexpress';
  const { uploadUrl = '' } = useGlobSetting();
  const appSize = useAppStore().getAppSize;
  const fileList = ref();
  const dataSource = ref();
  const loadId = ref();
  const props = defineProps({
    fromgroupid: {
      default: '',
      type: String
    }
  });
  function loadDataSourceContacts() {
    const url = `/api/Template`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { moducegroupid: props.fromgroupid }
    });
  }
  function handleChange() {
    loadDataSourceContacts();
  }
  watchEffect(() => {
    loadDataSourceContacts();
  });
  const { createMessage } = useMessage();
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '详细'
    },
    {
      field: 'sonModuceid',
      component: 'Input',
      label: '组模型编码',
      colProps: {
        span: 30
      },
      required: true
    },
    {
      field: 'moduleType',
      component: 'ApiSelect',
      label: '组模板类型',
      rules: [{ required: false }],
      componentProps: ({ formModel, formActionType }) => {
        return {
          api: moductListGroupApi,
          resultField: 'data',
          labelField: 'text',
          valueField: 'value',
          immediate: true,
          onChange: (e: String, target: any) => {
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'dept',
              componentProps: {
                api: moductListGroupApi,
                params: { orgId: e },
                resultField: 'data',
                labelField: 'text',
                valueField: 'value',
                onChange: (e1: String, target: any) => {
                  console.log(e1);
                }
              }
            });
          }
        };
      },
      colProps: {
        span: 30
      },
      required: true
    },
    {
      field: 'modulSo',
      component: 'Input',
      label: '组模型名',
      colProps: {
        span: 30
      },
      required: true
    },
    {
      field: 'groupName',
      component: 'Input',
      label: '组名称',
      colProps: {
        span: 30
      },
      required: true
    },
    {
      field: 'sayform',
      component: 'InputTextArea',
      label: '说明',
      colProps: {
        span: 30
      }
    }
  ];
  const [register, { setFieldsValue, getFieldsValue }] = useForm({
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
  function uploadApi(
    params: UploadFileParams,
    onUploadProgress: (progressEvent: ProgressEvent) => void
  ) {
    return defHttp.uploadFile<UploadApiResult>(
      {
        url: uploadUrl + '/api/Excel/UploadExcel/key?key=' + props.fromgroupid,
        onUploadProgress
      },
      params
    );
  }
  onActivated(() => {
    setFieldsValue({
      sonModuceid: '自动生成'
    });
    loadDataSourceContacts();
  });

  onDeactivated(() => {
    loadId.value = null;
  });
</script>

<style>
  .divdepo {
    width: 30%;
    float: right;
    margin-top: -430px;
  }
  .addbutton {
    margin-left: 20px;
  }
  .subButton {
    float: right;
  }
  .my-5 {
    margin-top: -40px;
  }
</style>

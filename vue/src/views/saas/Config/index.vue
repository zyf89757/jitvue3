<template>
  <PageWrapper>
    <EzSearch>
      <BasicForm @register="register" @submit="handleSubmit1" />
    </EzSearch>
      <EzTable
      title="系统配置"
      ref-name="SysConfig"
      :data-source="dataSource"
      :page-size="20"
      :edit-mode="'row'"
      :show-more="true"
      :from-mode="false"
      :toolbar="[
        {
          name: 'bulkimport',
          type: 'Upload',
          title: '增量导入',
          props: { apiUrl: bulkimportConfig },
          click: null,
          auth: ''
        }
      ]"
      :more-items="[
        {
          name: 'enable',
          type: 'Button',
          title: '启用',
          click: toEnable,
          auth: '123'
        },
        {
          name: 'disable',
          type: 'Button',
          title: '禁用',
          click: toDisable,
          auth: '123'
        }
      ]"
      :more-items-filter="onMoreItemsFilter"
      selection-mode="single"
    >
      <DxColumn data-field="configType" caption="参数类型" width="140px">
        <DxLookup :data-source="user_types" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="configKey" caption="参数Key" width="160px" />
      <DxColumn data-field="configValue" caption="参数值" width="300px" />
      <DxColumn data-field="remark" caption="说明" />
      <DxColumn
        data-field="enabled"
        data-type="boolean"
        caption="状态"
        width="50px"
        :allowFiltering="false"
        :allow-editing="false"
        :fixed="true"
        :fixed-position="'right'"
        :cell-template="statusTemplate"
      />
    </EzTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, watchEffect } from 'vue';

  export default defineComponent({
    name: 'SysConfig'
  });
</script>
<script lang="ts" setup>
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
  import { Ez } from '/@/utils/devexpress';
  import { ref, reactive } from 'vue';
  import { ImportParams } from '/@/api/interface/common';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { defHttp } from '/@/utils/http/axios';
  import { BasicForm, useForm, FormSchema } from '/@/components/EzControls/EzSearchForm/index';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useAppStore } from '/@/store/modules/app';
  const user_types = [
    { value: '1', text: '正式环境' },
    { value: '0', text: '测试环境' }
  ];
  const appSize = useAppStore().getAppSize;
  const { createMessage } = useMessage();
  let loadParams = reactive({ configtype: '' });
  const { uploadUrl = '' } = useGlobSetting();
  const dataSource = ref({});
  function loadDataSource() {
    const url = `/api/config`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  async function bulkimportConfig(
    params: ImportParams,
    onUploadProgress: (progressEvent: ProgressEvent) => void
  ) {
    const e: any = await defHttp.uploadFile(
      {
        url: uploadUrl + '/api/config/bulkimport',
        onUploadProgress
      },
      params
    );

    if (e.data && !e.data.success) {
      createMessage.error(e.data.message);
    } else if (e.data && e.data.success) {
      createMessage.success(e.data.message);
    }
    return e;
  }
  const schemas: FormSchema[] = [
    {
      field: 'configType',
      component: 'Select',
      label: '请选择类型',
      colProps: {
        span: 8
      },
      componentProps: {
        options: [
          {
            label: '正式环境',
            value: '1',
            key: '1'
          },
          {
            label: '测试环境',
            value: '0',
            key: '2'
          }
        ]
      }
    }
  ];
  const [register, { getFieldsValue }] = useForm({
    labelWidth: 125,
    compact: true,
    schemas: schemas,
    actionColOptions: {
      span: 24
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: true,
    showSubmitButton: true,
    showAdvancedButton: true,
    alwaysShowLines: 1
  });
  async function handleSubmit1() {
    var objvalue = await getFieldsValue();
    loadParams.configtype = objvalue.configType;
  }
  enum Api {
    Enabled = '/api/config/enable',
    Disabled = '/api/config/disable'
  }

  function toEnable(item, e) {
    defHttp.post({ url: Api.Enabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }

  function toDisable(item, e) {
    defHttp.post({ url: Api.Disabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }

  function onMoreItemsFilter(items, e) {
    return (
      items.filter((it) => {
        return it.name != (e.data.enabled ? 'enable' : 'disable');
      }) || []
    );
  }
  function statusTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' + (e.value ? '>启用' : ' class="ant-typography ant-typography-danger">禁用') + '</b>';
    return el.appendChild(container);
  }
  watchEffect(() => {
    loadDataSource();
  });
</script>
<style lang="less" scoped></style>

<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="模板管理"
        ref-name="SysTemplate"
        :height="380"
        :data-source="dataSource"
        :page-size="10"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="true"
        :key-expr="'id'"
        :selection-changed="onSelectionChanged"
        :from-mode="false"
        :parent-key-expr="'pid'"
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
        <DxColumn data-field="moduleName" caption="组模板名称" width="130px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="templateName" caption="模板名称" width="90px" />
        <DxColumn data-field="templateOwnerType" caption="模板类型" width="160px" />
        <DxColumn data-field="templateUrl" caption="模板URL" width="160px" />
        <DxColumn data-field="remark" caption="说明" width="160px" />
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
    <MappingGroup :formMappid="formMappid" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SysTemplate',
    components: { MappingGroup }
  });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import MappingGroup from './templateGroup/tegroup.vue';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { ref, reactive, watchEffect } from 'vue';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import { useAppStore } from '/@/store/modules/app';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { searchSchemas } from './temp';
  const dataSource = ref({});
  const formMappid = ref();
  let loadParams = reactive({ templateName: '' });
  const appSize = useAppStore().getAppSize;
  function loadDataSource() {
    const url = `/api/Template`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  //初始化查询tab
  const [register, { getFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: searchSchemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });
  async function handleSubmit1() {
    var objvalue = await getFieldsValue();
    console.log(objvalue);
    loadParams.templateName = objvalue.templateName;
    loadDataSource();
  }

  enum Api {
    Enabled = '/api/Template/enable',
    Disabled = '/api/Template/disable'
  }

  function toEnable(item, e) {
    defHttp.post({ url: Api.Enabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }
  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      formMappid.value = currentSelectedRowKeys[0];
    }
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

<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="模型管理"
        ref-name="sysmodule"
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
          },
          {
            name: 'deteail',
            type: 'Button',
            title: '详情',
            click: toDeteail,
            auth: '123'
          }
        ]"
        :more-items-filter="onMoreItemsFilter"
        selection-mode="single"
      >
        <DxColumn data-field="code" caption="系统模块编码" width="130px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="sysName" caption="系统名称" width="130px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="moduleName" caption="模型名称" width="90px" />
        <DxColumn data-field="remark" caption="备注" width="160px" />

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
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({ name: 'SysModule' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import { BasicForm, FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { ref, reactive, watchEffect } from 'vue';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import { useAppStore } from '/@/store/modules/app';
  import { router } from '/@/router/index';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  const dataSource = ref({});
  const formMoudceid = ref();
  let loadParams = reactive({ modulename: '' });
  const appSize = useAppStore().getAppSize;
  function loadDataSourceContacts() {
    const url = `/api/system/module`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  const schemas: FormSchema[] = [
    {
      field: 'orgs',
      component: 'Input',
      label: '请输入关键字',
      defaultValue: loadParams.modulename,
      colProps: {
        span: 6
      }
    }
  ];
  const [register, { getFieldsValue }] = useForm({
    labelWidth: 100,
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
    loadParams.modulename = objvalue.orgs;
  }

  enum Api {
    Enabled = '/api/system/module/enable',
    Disabled = '/api/system/module/disable'
  }

  function toEnable(item, e) {
    defHttp.post({ url: Api.Enabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }
  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      formMoudceid.value = currentSelectedRowKeys[0];
    }
  }
  function toDisable(item, e) {
    defHttp.post({ url: Api.Disabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }
  function toDeteail(item, e) {
    router.push('/system/module/moduleGroup');
    sessionStorage.setItem('Formkey', e.key);
    formMoudceid.value = e.key;
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
    loadDataSourceContacts();
  });
</script>

<template>
  <div>
    <EzTable
      title="映射管理"
      ref-name="MappIng"
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
      <DxColumn data-field="templateName" caption="模板名称" width="90px" />
      <DxColumn data-field="propertyName" caption="属性名称" width="160px" />
      <DxColumn data-field="mappingName" caption="映射名称" width="160px" />
      <DxColumn data-field="rowIndex" caption="所在行" width="160px" />
      <DxColumn data-field="columnIndex" caption="所在列" width="160px" />
      <DxColumn data-field="remark" caption="备注" width="160px" />
      <DxColumn data-field="groupName" caption="组名称" width="160px" />
      <DxColumn data-field="pageIndex" caption="页索引" width="160px" />
      <DxColumn data-field="esite" caption="地址" width="160px" />
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
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({ name: 'MappIng' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  const dataSource = ref({});
  const formMoudceid = ref();
  const props = defineProps({
    formMappid: {
      default: '',
      type: String
    }
  });
  function loadDataSource() {
    const url = `/api/Mapping`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { formMappingId: props.formMappid },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  enum Api {
    Enabled = '/api/Mapping/enable',
    Disabled = '/api/Mapping/disable'
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

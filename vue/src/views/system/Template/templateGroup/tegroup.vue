<template>
  <div>
    <EzTable
      title="组模板管理"
      ref-name="MappingGroup"
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
      <DxColumn data-field="groupName" caption="组名" width="90px" />
      <DxColumn data-field="groupType" caption="组类型" width="160px" />
      <DxColumn data-field="pageIndex" caption="所在页" width="160px" />
      <DxColumn data-field="rowIndex" caption="起始行" width="160px" />
      <DxColumn data-field="columnIndex" caption="起始列" width="160px" />
      <DxColumn data-field="remark" caption="备注" width="160px" />
      <DxColumn data-field="hasHeader" caption="包含头" width="160px">
        <DxLookup :data-source="user_types" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="pageName" caption="页名" width="160px" />
      <DxColumn data-field="mappingType" caption="映射类型" width="160px" />
      <DxColumn data-field="exportErrorType" caption="出错类型" width="160px" />
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

  export default defineComponent({ name: 'MappingGroup' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
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
  const user_types = [
    { value: '0', text: '是' },
    { value: '1', text: '否' }
  ];
  function loadDataSource() {
    const url = `/api/MappingGroup`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { formMappingId: props.formMappid },
      insertUrl: `${url}/create-dev`,
      insertParams: { formMappingId: props.formMappid },
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  enum Api {
    Enabled = '/api/mappinggroup/enable',
    Disabled = '/api/mappinggroup/disable'
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

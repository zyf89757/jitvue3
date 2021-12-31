<template>
  <div>
    <PageWrapper contentClass="flex">
      <EzTable
        title="字典类型"
        ref-name="DictData"
        :data-source="dataSource"
        :page-size="20"
        class="w-8/20"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="true"
        :from-mode="false"
        :selection-changed="onSelectionChanged"
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
        :init-new-row="onInitNewRow"
        selection-mode="single"
      >
        <DxColumn data-field="name" caption="名称" width="130px" />
        <DxColumn data-field="code" caption="编码" width="160px" />
        <DxColumn data-field="remark" caption="备注" />
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
      <DictValue class="w-12/20" :fromTypeId="fromTypeId" />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'DictList'
  });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref, reactive } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import DictValue from './components/DictValue.vue';
  const dataSource = ref({});
  const fromTypeId = ref('');

  let loadParams = reactive({ typeName: '' });
  function loadDataSource() {
    const url = `/api/dict/type`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      fromTypeId.value = currentSelectedRowKeys[0];
    }
  }

  enum Api {
    Enabled = '/api/dict/type/enable',
    Disabled = '/api/dict/type/disable'
  }

  function toEnable(_item, e) {
    defHttp.post({ url: Api.Enabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }

  function toDisable(_item, e) {
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

  function onInitNewRow(e) {
    e.data.enabled = true;
    e.data.sortNum = 100;
  }
</script>

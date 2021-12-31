<template>
  <PageWrapper>
    <EzTable
      title="应用系统"
      ref-name="dgApplication"
      :height="300"
      :data-source="dataSource"
      :page-size="10"
      :edit-mode="'batch'"
      :toolbar="[]"
      :show-more="true"
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
      :selection-changed="onSelectionChanged"
      selection-mode="single"
    >
      <DxColumn data-field="code" caption="应用编码" width="100px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="name" caption="应用名称" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="enName" caption="应用英文名称" width="180px" />
      <DxColumn
        data-field="isProvider"
        data-type="boolean"
        width="60px"
        caption="服务商应用"
        :allowFiltering="false"
      />
      <DxColumn
        data-field="isSeparated"
        data-type="boolean"
        width="60px"
        caption="启用独立站点"
        :allowFiltering="false"
      />
      <DxColumn
        data-field="separateSite"
        caption="独立站点"
        width="180px"
        :allowFiltering="false"
      />
      <DxColumn data-field="description" caption="系统描述" :allowFiltering="false" />
      <DxColumn
        data-field="sortNum"
        caption="排序"
        width="58px"
        :allowFiltering="false"
        sortOrder="desc"
      >
        <DxRequiredRule />
      </DxColumn>
      <DxColumn
        data-field="enabled"
        data-type="boolean"
        caption="状态"
        width="50px"
        :allowFiltering="false"
        :allow-editing="false"
        :cell-template="statusTemplate"
      />
    </EzTable>
    <TenantApp :current-application-id="currentApplicationId" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'Apps' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import TenantApp from './components/TenantApp.vue';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';

  const dataSource = ref({});
  const currentApplicationId = ref('');

  function loadDataSource() {
    const url = `/api/application`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      currentApplicationId.value = currentSelectedRowKeys[0];
    }
  }

  function onInitNewRow(e) {
    e.data.enabled = true;
    e.data.isSeparated = false;
    e.data.sortNum = 100;
  }

  enum Api {
    Enabled = '/api/application/enable',
    Disabled = '/api/application/disable'
  }

  function toEnable(item, e) {
    defHttp.post({ url: Api.Enabled, params: { Key: e.key } }, { isPopupMsg: false });
  }

  function toDisable(item, e) {
    defHttp.post({ url: Api.Disabled, params: { Key: e.key } }, { isPopupMsg: false });
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
</script>
<style lang="less" scoped></style>

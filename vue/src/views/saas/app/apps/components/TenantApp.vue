<template>
  <EzTable
    ref-name="dgApplicationTenant"
    title="开通的租户"
    :height="300"
    :data-source="dataSourceTenant"
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
        auth: '123',
      },
      {
        name: 'disable',
        type: 'Button',
        title: '禁用',
        click: toDisable,
        auth: '123',
      },
    ]"
    :more-items-filter="onMoreItemsFilter"
    :init-new-row="onInitNewRowTenant"
  >
    <DxColumn data-field="originTenantId" caption="租户名" width="180px">
      <DxRequiredRule />
      <DxLookup :data-source="getTenants" display-expr="name" value-expr="id" />
    </DxColumn>
    <DxColumn data-field="reName" caption="应用重命名" width="180px" />
    <DxColumn data-field="redirectUrl" caption="应用重定向" :allowFiltering="false" />
    <DxColumn
      data-field="expiryDateEnabled"
      caption="启用有效期"
      data-type="boolean"
      width="50px"
      :allowFiltering="false"
    />
    <DxColumn
      data-field="expiryDate"
      caption="有效期"
      :allowFiltering="false"
      width="140px"
      format="yyyy-MM-dd HH:mm:ss"
    />
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
      :cell-template="statusTenantTemplate"
    />
  </EzTable>
</template>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/data-grid';
  import { ref, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';

  const props = defineProps({
    currentApplicationId: {
      default: '',
      type: String,
    },
  });

  const dataSourceTenant = ref({});

  function loadDataSourceTenant() {
    const url = `/api/application/tenant`;
    dataSourceTenant.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { Key: props.currentApplicationId },
      insertUrl: `${url}/create-dev`,
      insertParams: { appId: props.currentApplicationId },
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`,
    });
  }

  function onInitNewRowTenant(e) {
    e.data.enabled = true;
    e.data.sortNum = 100;
    e.data.applicationId = '';
    e.data.expiryDateEnabled = true;
    let dateTime = new Date();
    e.data.expiryDate = new Date(dateTime.setDate(dateTime.getDate() + 30));
    e.data.isDefault = false;
  }

  function getTenants() {
    return {
      store: Ez.CreateStore({
        key: 'id',
        loadUrl: `/api/tenant/tenants`,
      }),
    };
  }

  function statusTenantTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' + (e.value ? '>启用' : ' class="ant-typography ant-typography-danger">禁用') + '</b>';
    return el.appendChild(container);
  }

  enum Api {
    Enabled = '/api/application/tenant/enable',
    Disabled = '/api/application/tenant/disable',
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
  watchEffect(() => {
    loadDataSourceTenant();
  });
</script>

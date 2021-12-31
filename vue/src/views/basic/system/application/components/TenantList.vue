<template>
  <DataGrid
    :data-source="dataSource"
    ref="dataGrid"
    :height="dgHeight"
    @toolbar="onToolbarPreparing"
    @selection-changed="onSelectionChanged"
  >
    <DxEditing mode="row" :allow-adding="true" :allow-deleting="true" :allow-updating="true" />
    <DxColumn data-field="tenantId" caption="租户名">
      <DxLookup value-expr="id" display-expr="name" :data-source="tenantsData" />
    </DxColumn>

    <DxColumn data-field="expiryDate" caption="有效期" data-type="date" />
    <DxColumn data-field="expiryDateEnabled" caption="启用有效期" data-type="boolean" />
    <DxColumn data-field="reName" caption="系统别名" />
    <DxColumn data-field="redirectUrl" caption="自定义系统地址" />
    <DxColumn data-field="enabled" data-type="boolean" caption="启用" />
  </DataGrid>
</template>

<script setup>
  import { DxColumn, DxEditing, DxLookup } from 'devextreme-vue/data-grid';
  import { DataGrid } from '/@/components/DxDataGrid';
  import { ref, watchEffect } from 'vue';
  // import { defHttp } from '/@/utils/http/axios';
  import { Ez } from '/@/utils/devexpress';
  const tenantsData = Ez.TenantsData();

  const props = defineProps({
    applicationId: {
      default: '',
      type: String
    }
  });
  const dataGrid = ref();
  const dataSource = ref(null);
  const dgHeight = ref(0);
  const selData = ref({});

  watchEffect(() => {
    const url = `/api/application/tenant`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { Key: props.applicationId },
      insertUrl: `${url}/create-dev`,
      insertParams: { applicationId: props.applicationId },
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  });
  function onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        width: 86,
        type: 'normal',
        icon: 'refresh',
        text: '刷新',
        onClick: () => {
          dataGrid.value.instance.refresh();
        }
      }
    });
  }

  function onSelectionChanged({ selectedRowsData }) {
    selData.value = selectedRowsData[0];
  }
</script>

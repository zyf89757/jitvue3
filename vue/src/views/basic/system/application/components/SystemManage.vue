<template>
  <DxDataGrid
    ref="dataGrid"
    :data-source="dataSource"
    :height="dgHeight"
    :show-column-lines="true"
    :show-row-lines="true"
    :show-borders="true"
    :row-alternation-enabled="true"
    :focused-row-enabled="false"
    :column-auto-width="true"
    :column-hiding-enabled="false"
    :column-fixing="{ enabled: true }"
    :repaint-changes-only="true"
    :grouping="{ autoExpandAll: true }"
    :group-panel="{ visible: false }"
    :scrolling="{
      showScrollbar: 'auto',
      useNative: false
    }"
    :column-resizing-mode="'widget'"
    :selection="{ mode: 'single' }"
    :remote-operations="{
      paging: true,
      filtering: true,
      sorting: true,
      grouping: true,
      summary: true,
      groupPaging: true
    }"
    @content-ready="onContentReady"
    @toolbar="onToolbarPreparing"
    @selection-changed="onSelectionChanged"
  >
    <DxEditing mode="row" :allow-adding="true" :allow-deleting="true" :allow-updating="true" />
    <DxPaging :page-size="pageNum" />
    <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />
    <DxFilterRow :visible="true" />
    <DxColumnChooser :enabled="true" />
    <DxExport :enabled="true" :allow-export-selected-data="true" />

    <DxColumn data-field="code" caption="系统编码" />
    <DxColumn data-field="name" caption="系统名称" />
    <DxColumn data-field="enName" caption="英文名称" />
    <DxColumn data-field="description" caption="系统描述" />
    <DxColumn data-field="isSeparated" data-type="boolean" caption="独立" />
    <DxColumn data-field="separateSite" caption="独立站点" />
    <DxColumn data-field="enabled" data-type="boolean" caption="启用" />
  </DxDataGrid>
  <a-alert v-if="selData.id != ''" :message="'当前选中系统：' + selData.name" type="info" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SystemManage'
  });
</script>

<script setup lang="ts">
  import {
    DxColumn,
    DxDataGrid,
    DxEditing,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxColumnChooser,
    DxExport
  } from 'devextreme-vue/data-grid';
  import { ref, reactive, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { Ez } from '/@/utils/devexpress';

  const emit = defineEmits(['selectSys']);
  const dataGrid = ref(); //dataGrid 组件实例
  const dgHeight = ref(0);
  const dataSource = ref({});
  let selData = ref({ id: '', name: '' });

  const pageNum = 20;
  const pageSizes = [5, 10, 20, 50, 100];
  loadDataSource();
  function loadDataSource() {
    const url = `/api/application`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`,
      onRemoved: function (key) {
        if (key == selData.value.id) {
          selData.value = reactive({ id: '', name: '' });
        }
      }
    });
  }
  function onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
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
      },
      {
        location: 'before',
        widget: 'dxButton',
        options: {
          width: 150,
          type: 'default',
          icon: '',
          text: '复制',
          onClick: () => {
            if (!selData.value.id) {
              Ez.Notify('请先选中一条数据后再操作！');
            } else {
              defHttp.post({ url: `/api/tenant/reset-connection-string/${selData.value.id}` });
            }
          }
        }
      }
    );
  }
  function onContentReady() {
    var el = document.querySelector(
      '.dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit'
    );
    if (el) el.innerHTML = '操作';
  }
  // 选中数据
  function onSelectionChanged({ selectedRowsData }) {
    selData.value = selectedRowsData[0];
    emit('selectSys', selData);
  }
  onMounted(
    (window.onresize = function () {
      dgHeight.value = window.innerHeight - 150;
    })
  );
</script>

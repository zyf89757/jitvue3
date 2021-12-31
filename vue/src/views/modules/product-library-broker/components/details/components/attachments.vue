<template>
  <EzTable
    class="details-list"
    ref-name="ProductAttachments"
    :show-toolbar="false"
    :height="0"
    :data-source="dataSource"
    :page-size="20"
    :edit-mode="'row'"
    :show-more="false"
    :allow-adding="false"
    :more-items="[]"
    selection-mode="single"
    :form-mode="false"
    @ez-table="init"
  >
    <DxColumn data-field="fileOriginName" caption="附件名称" width="180px" :allow-editing="false" />
    <DxColumn data-field="fileSuffix" caption="附件后缀" width="80px" :allowEditing="false" />
    <DxColumn data-field="cbyTime" caption="上传时间" width="120px" :allowEditing="false" />
    <DxColumn data-field="fileType" caption="附件类型" width="120px" />
    <DxColumn data-field="fileName" caption="归档名称" width="180px" />
    <DxColumn data-field="remark" caption="备注" :allowFiltering="false" />
  </EzTable>
</template>
<script lang="ts">
  import { defineComponent, watchEffect, ref, unref } from 'vue';
  export default defineComponent({ name: 'ProductAttachments' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { Ez } from '/@/utils/devexpress';
  import { useRoute } from 'vue-router';

  const props = defineProps({
    clickName: {
      type: String
    },
    count: {
      type: Number
    },
    activeKey: { type: String }
  });

  const route = useRoute();
  const productId = route.params?.id.toString();
  const dataSource = ref({});
  const ezTable = ref<any>({});
  const cid = '2';

  function loadDataSource() {
    const url = `/api/product`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/attachments`,
      loadParams: {
        Key: productId || 'a'
      },
      updateUrl: `${url}/attachment-update`,
      deleteUrl: `${url}/attachment-remove`
    });
  }
  loadDataSource();

  function init(_ezTable) {
    ezTable.value = _ezTable;
  }

  watchEffect(() => {
    if ((unref(props.activeKey) || '') == cid) {
      if ((unref(props.count) || 0) > 0) {
        switch (unref(props.clickName)) {
          case 'refresh':
            refreshGrid();
            break;
        }
      }
    }
  });
  function refreshGrid() {
    ezTable.value?.refresh();
  }
</script>
<style lang="less" scoped></style>

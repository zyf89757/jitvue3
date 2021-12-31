<template>
  <div>
    <PageWrapper>
      <EzTable
        title="字典值管理"
        ref-name="DictData"
        :height="380"
        :data-source="dataSource"
        :page-size="10"
        :edit-mode="'row'"
        :show-more="false"
        :key-expr="'id'"
        :from-mode="false"
        :parent-key-expr="'pid'"
        selection-mode="single"
        :toolbar="[
          {
            name: '导入',
            type: 'Button',
            title: '导入',
            click: ImportExcel,
            auth: '123'
          }
        ]"
      >
        <DxColumn data-field="classify" caption="分类" width="160px" />
        <DxColumn data-field="value" caption="字典值" width="130px" />
        <DxColumn data-field="code" caption="编码" width="160px" />
        <DxColumn data-field="index" caption="查询码" width="160px" />
        <DxColumn />
      </EzTable>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'DictData',
    components: {}
  });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref, watchEffect } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { Ez } from '/@/utils/devexpress';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  const [register3, { openModal: fork }] = useModal();
  const dataSource = ref({});
  const props = defineProps({
    fromTypeId: {
      default: '',
      type: String
    }
  });
  function loadDataSource() {
    const url = `/api/Dictdata`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { fromTypeId: props.fromTypeId },
      insertUrl: `${url}/create-dev`,
      insertParams: { typeId: props.fromTypeId },
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  function getDictype() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/DictType/KeyValues`
      })
    };
  }

  function ImportExcel() {
    fork(true);
  }
  watchEffect(() => {
    loadDataSource();
    getDictype();
  });
</script>
<style></style>

<template>
  <PageWrapper>
    <EzTable
      title="职位管理"
      ref-name="dgPosition"
      :data-source="dataSource"
      :page-size="20"
      :edit-mode="'single'"
      :toolbar="[]"
      :show-more="false"
      :key-expr="'id'"
      selection-mode="single"
      :form-mode="false"
      :init-new-row="onInitNewRow"
    >
      <DxColumn data-field="code" caption="职位编码" width="120px">
        <DxRequiredRule />
        <DxStringLengthRule :max="15" />
      </DxColumn>
      <DxColumn data-field="name" caption="职位名称" width="160px">
        <DxRequiredRule />
        <DxStringLengthRule :max="30" />
      </DxColumn>
      <DxColumn data-field="remarks" caption="备注" />
      <DxColumn
        data-field="sortNum"
        caption="排序"
        width="68px"
        :allowFiltering="false"
        sortOrder="desc"
      />
    </EzTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'GPosition' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule, DxStringLengthRule } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';

  const dataSource = ref({});

  function onInitNewRow(e) {
    e.data.sortNum = 100;
  }

  function loadDataSource() {
    const url = `/api/position`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();
</script>
<style lang="less" scoped></style>

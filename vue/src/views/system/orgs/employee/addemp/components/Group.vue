<template>
  <EzTable
    ref-name="dgGroupManager"
    title="小组管理"
    :height="0"
    :data-source="dataSource"
    :page-size="10"
    :edit-mode="'row'"
    :show-more="false"
    :toolbar="[]"
    :moreItems="[]"
    :allow-adding="props.currentFromDptKey != ''"
    :init-new-row="onInitNewRow"
  >
    <DxColumn data-field="code" caption="小组编码" width="100px">
      <DxRequiredRule />
      <DxStringLengthRule :max="15" />
    </DxColumn>
    <DxColumn data-field="name" caption="小组名称" width="120px">
      <DxRequiredRule />
      <DxStringLengthRule :max="30" />
    </DxColumn>
    <DxColumn data-field="enName" caption="小组英文名称" />
    <DxColumn
      data-field="sortNum"
      caption="排序"
      width="68px"
      :allowFiltering="false"
      sortOrder="desc"
    />
  </EzTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'DeptGroup' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule, DxStringLengthRule } from 'devextreme-vue/data-grid';
  import { ref, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';

  const props = defineProps({
    currentFromDptKey: {
      default: '',
      type: String
    },
    currentFromDptName: {
      default: '',
      type: String
    }
  });
  const dataSource = ref({});

  function loadDataSource() {
    const url = `/api/group`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { fromDptKey: props.currentFromDptKey },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  function onInitNewRow(e) {
    e.data.sortNum = 100;
    e.data.fromDptId = props.currentFromDptKey;
  }
  watchEffect(() => {
    loadDataSource();
  });
</script>

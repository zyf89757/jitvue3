<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit" />
      </EzSearch>
      <div class="flex">
        <EzTable
          title="部门管理"
          ref-name="dgDeptManager"
          :height="0"
          :data-source="dataSource"
          :edit-mode="'row'"
          :toolbar="[]"
          :moreItems="[]"
          :show-more="false"
          :init-new-row="onInitNewRow"
          :selection-changed="onSelectionChanged"
          selection-mode="single"
          :allow-updating="true"
          :key-expr="'id'"
          :allow-adding="currentfromOrgId != ''"
        >
          <DxColumn data-field="code" caption="部门编码" width="100px">
            <DxRequiredRule />
            <DxStringLengthRule :max="15" />
          </DxColumn>
          <DxColumn data-field="name" caption="部门名称" width="120px">
            <DxRequiredRule />
            <DxStringLengthRule :max="30" />
          </DxColumn>
          <DxColumn data-field="enName" caption="部门英文名称" />
          <DxColumn
            data-field="sortNum"
            caption="排序"
            width="68px"
            :allowFiltering="false"
            sortOrder="desc"
          />
        </EzTable>
      </div>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'BaseDeptManager' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule, DxStringLengthRule } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';

  import { useAppStore } from '/@/store/modules/app';
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch'; 
  import { searchSchemas } from './departmentSearch.data';

  const currentfromOrgId = ref('');
  const currentfromOrgName = ref('');
  const currentfromDptKey = ref('');
  const currentfromDptName = ref('');

  const appSize = useAppStore().getAppSize;

  const [register] = useForm({
    labelWidth: 150,
    schemas: searchSchemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });

  const dataSource = ref({});

  function loadDataSource() {
    const url = `/api/department`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadParams: { fromOrgId: currentfromOrgId.value },
      loadUrl: `${url}/list`,
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  async function handleSubmit(values: any) {
    currentfromOrgId.value = values.org;
    currentfromOrgName.value = values.fromOrgName;
    loadDataSource();
  }
  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys, selectedRowsData }) {
    if (currentSelectedRowKeys.length > 0) {
      currentfromDptKey.value = currentSelectedRowKeys[0];
      currentfromDptName.value = selectedRowsData[0].name;
    }
  }

  function onInitNewRow(e: { data: { enabled: boolean; sortNum: number; fromOrgId: string } }) {
    e.data.sortNum = 100;
    e.data.fromOrgId = currentfromOrgId.value;
  }
</script>
<style lang="less" scoped></style>

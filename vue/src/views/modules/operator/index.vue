<template>
  <PageWrapper>
    <EzSearch>
      <BasicForm @register="register" @submit="handleSubmit1" />
    </EzSearch>
    <EzTable
      ref-name="dgCustomsOperator"
      title="报关员操作员列表"
      :data-source="dataSource"
      :page-size="5"
      :show-more="true"
      :toolbar="[]"
      :edit-mode="'row'"
      selection-mode="single"
      :allow-updating="true"
      :allow-adding="true"
      :allow-editing="true"
      :allow-Filtering="true"
    >
      <DxColumn data-field="dclrBelongDepartment" caption="所属部门" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="purposeDepartment" caption="用途部门" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="purposeName" caption="用途人名称" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="dclrNo" caption="备案编号" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="dclrDepartment" caption="备案部门" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="dclrName" caption="备案操作员名称" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn
        data-field="dclrDate"
        caption="备案日期"
        width="120px"
        data-type="date"
        format="yyyy-MM-dd HH:mm:ss"
      >
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="cardNo" caption="报关员卡号" width="220px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="useDepartment" caption="使用部门" width="220px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="useName" caption="使用人名称" width="220px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn
        data-field="expirationDate"
        caption="过期时间"
        width="220px"
        data-type="date"
        format="yyyy-MM-dd HH:mm:ss"
      >
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="remarks" caption="备注" width="220px">
        <DxRequiredRule />
      </DxColumn>
    </EzTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'CustomsOperatorList' });
</script>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import { useAppStore } from '/@/store/modules/app';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { PageWrapper } from '/@/components/Page';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';

  import { searchSchemas } from './operator.data';
  const currentFromDclrNo = ref('');
  const currentFromDclrDepartment = ref('');
  const currentFromDclrName = ref('');
  const currentFromCardNo = ref('');
  const appSize = useAppStore().getAppSize;

  const [register] = useForm({
    labelWidth: 150,
    schemas: searchSchemas,
    actionColOptions: {
      span: 24
    },
    compact: false,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });

  const dataSource = ref({});

  function loadDataSource() {
    const url = `/api/customs-operator`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: {
        dclrNo: currentFromDclrNo.value,
        dclrDepartment: currentFromDclrDepartment.value,
        dclrName: currentFromDclrName.value,
        cardNo: currentFromCardNo.value
      },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`
    });
  }

  async function handleSubmit1(_values: any) {
    currentFromDclrNo.value = _values.dclrNo;
    currentFromDclrDepartment.value = _values.dclrDepartment;
    currentFromDclrName.value = _values.dclrName;
    currentFromCardNo.value = _values.cardNo;

    loadDataSource();
  }
  loadDataSource();
</script>

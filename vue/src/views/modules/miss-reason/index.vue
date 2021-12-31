<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="querySubmit" />
      </EzSearch>
      <EzTable
        title="数据丢失原因"
        ref-name="missReasonData"
        :data-source="dataSource"
        :page-size="20"
        :moreItems="[]"
        :show-more="false"
        selection-mode="single"
        :form-mode="true"
        :form-mode-event="onFormModeEvent"
        :selection-changed="onSelectionChanged"
        :allow-updating="true"
        :allow-adding="true"
      >
        <DxColumn data-field="cusCiqNo" caption="统一编号" width="130px" />
        <DxColumn data-field="customsBatchNo" caption="批次" width="80px" />
        <DxColumn data-field="cusIEFlag" caption="I/E" width="30px" />
        <DxColumn data-field="missReason" caption="丢失原因" width="160px" />
        <DxColumn data-field="dclrNo" caption="报关员编号" width="80px" />
        <DxColumn data-field="createUser" caption="创建人" width="100px" />
        <DxColumn data-field="declPersonName" caption="申报人" width="80px" />
        <DxColumn data-field="dclrDepartment" caption="部门" width="100px" />
        <DxColumn data-field="dclrOpeaterName" caption="操作员名称" width="80px" />
        <DxColumn data-field="cusDecStatusName" caption="报关状态" width="100px" />
        <DxColumn data-field="cusEntryTypeName" caption="通关类型" width="80px" />
        <DxColumn data-field="indbTime" caption="入库时间" width="80px" />
        <DxColumn data-field="updateTime" caption="最后更新时间" width="120px" />
      </EzTable>
      <MissReasonDetail @register="registerDrawer" :on-submit-success="onSubmitSuccess" />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'MissReasonList' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';

  import { useAppStore } from '/@/store/modules/app';
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { MissReasonDetail } from './compenonts/details/missReasonDetail.vue';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { searchSchemas } from './missReasonSearch.data';
  import { useDrawer } from '/@/components/Drawer';

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
  const currentMissReasonKey = ref({});
  const cusCiqNo = ref('');
  const customsBatchNo = ref('');
  const dclrNo = ref('');

  function loadDataSource() {
    const url = `/api/miss-reason`;
    dataSource.value = Ez.CreateStore({
      key: 'cusCiqNo',
      loadParams: {
        cusCiqNo: cusCiqNo.value,
        customsBatchNo: customsBatchNo.value,
        dclrNo: dclrNo.value
      },
      loadUrl: `${url}/list`
    });
  }

  async function querySubmit(values: any) {
    cusCiqNo.value = values.cusCiqNo;
    customsBatchNo.value = values.customsBatchNo;
    dclrNo.value = values.dclrNo;
    loadDataSource();
  }

  const [registerDrawer, { openDrawer }] = useDrawer();

  loadDataSource();

  function onFormModeEvent(isUpdate, e) {
    openDrawer(true, {
      record: e?.data,
      isUpdate: isUpdate
    });
  }
  function onSubmitSuccess() {
    loadDataSource();
  }
  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      currentMissReasonKey.value = currentSelectedRowKeys[0];
    }
  }
</script>

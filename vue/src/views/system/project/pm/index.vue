<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="项目管理"
        ref-name="tlProject"
        :height="0"
        :data-source="dataSource"
        :page-size="20"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="false"
        :allow-adding="currentCustomerId != ''"
        :more-items="[]"
        :selection-changed="onSelectionChanged"
        selection-mode="single"
        :form-mode="true"
        :form-mode-event="onFormModeEvent"
      >
        <DxColumn data-field="fromCustomerName" caption="所属客户" width="120px" />
        <DxColumn data-field="sName" caption="项目简称" width="90px" />
        <DxColumn data-field="code" caption="项目编码" width="90px" />
        <DxColumn data-field="name" caption="项目名称" />
        <DxColumn data-field="leaderName" caption="主负责人" width="80px" />
        <DxColumn
          data-field="projectDate"
          caption="项目时间"
          width="180px"
          :allowFiltering="false"
        />
        <DxColumn
          data-field="ptStatus"
          data-type="boolean"
          caption="状态"
          width="50px"
          :allowFiltering="false"
          :allow-editing="false"
          :cell-template="statusTemplate"
        />
      </EzTable>
    </PageWrapper>
    <ProjectDetails
      @register="registerDrawer"
      :on-submit-success="onSubmitSuccess"
      :on-submit-error="onSubmitError"
      :customer-id="currentCustomerId"
      :customer-name="currentCustomerName"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ProjectManager' });
</script>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { useDrawer } from '/@/components/Drawer';
  import ProjectDetails from './components/ProjectDetails.vue';

  import { useAppStore } from '/@/store/modules/app';
  import { searchSchemas } from './projectSearch.data';

  const appSize = useAppStore().getAppSize;

  const [register] = useForm({
    labelWidth: 120,
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
  const currentCustomerId = ref('');
  const currentCustomerName = ref('');
  const currentStatus = ref(-1);

  const [registerDrawer, { openDrawer }] = useDrawer();

  function loadDataSource() {
    const url = `/api/project`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: {
        customerId: currentCustomerId.value,
        status: currentStatus.value
      },
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      //currentMenuId.value = currentSelectedRowKeys[0];
    }
  }

  function onSubmitSuccess() {
    loadDataSource();
  }
  function onSubmitError() {
    loadDataSource();
  }

  function statusTemplate(el, e) {
    const container = document.createElement('span');

    let status;
    switch (e.value.toString()) {
      case '0':
        status = '正常';
        break;
      case '1':
        status = '结束';
        break;
      case '2':
        status = '异常';
        break;
    }

    container.innerHTML =
      '<b' +
      (e.value == 2 ? ' class="ant-typography ant-typography-danger" ' : '') +
      '>' +
      status +
      '</b>';
    return el.appendChild(container);
  }

  function onFormModeEvent(isUpdate, e) {
    var formData = e?.data;
    if (formData) {
      formData.fieldTime = [];
      formData.fieldTime.push(formData.beginDate);
      formData.fieldTime.push(formData.endDate);
      formData.ptStatus = formData.ptStatus.toString();
    }

    openDrawer(true, {
      record: formData,
      isUpdate: isUpdate
    });
  }

  async function handleSubmit1(values: any) {
    currentCustomerId.value = values.customer;
    currentCustomerName.value = values.fromCustomerName;
    currentStatus.value = values.status;
    loadDataSource();
  }
</script>
<style lang="less" scoped></style>

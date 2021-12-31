<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="任务管理"
        ref-name="tlTask"
        :height="0"
        :data-source="dataSource"
        :page-size="20"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="false"
        :more-items="[]"
        :selection-changed="onSelectionChanged"
        selection-mode="single"
        :form-mode="true"
        :form-mode-event="onFormModeEvent"
        :allow-adding="currentProjectId != ''"
      >
        <DxColumn data-field="fromProjectName" caption="所属项目" width="120px" />
        <DxColumn data-field="sName" caption="任务简称" width="80px" />
        <DxColumn data-field="code" caption="任务编码" width="80px" />
        <DxColumn data-field="name" caption="任务名称" />
        <DxColumn data-field="leaderName" caption="主负责人" width="80px" />
        <DxColumn data-field="taskDate" caption="任务时间" width="180px" :allowFiltering="false" />
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
    <TaskDetails
      @register="registerDrawer"
      :on-submit-success="onSubmitSuccess"
      :project-id="currentProjectId"
      :project-name="currentProjectName"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'TaskManager' });
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
  import TaskDetails from './components/TaskDetails.vue';

  import { useAppStore } from '/@/store/modules/app';
  import { searchSchemas } from './taskSearch.data';

  const appSize = useAppStore().getAppSize;

  const [register] = useForm({
    labelWidth: 100,
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
  const currentProjectId = ref('');
  const currentProjectName = ref('');
  const currentStatus = ref(-1);

  const [registerDrawer, { openDrawer }] = useDrawer();

  function loadDataSource() {
    const url = `/api/task`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: {
        projectId: currentProjectId.value,
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

  function statusTemplate(el, e) {
    const container = document.createElement('span');

    var status;
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
    if (e?.data) {
      e.data.fieldTime = [];
      e.data.fieldTime.push(e.data.beginDate);
      e.data.fieldTime.push(e.data.endDate);
      e.data.ptStatus = e.data.ptStatus.toString();
    }
    openDrawer(true, {
      record: e?.data,
      isUpdate: isUpdate
    });
  }

  async function handleSubmit1(values: any) {
    currentProjectId.value = values.project;
    currentProjectName.value = values.fromProjectName;
    currentStatus.value = values.status;
    loadDataSource();
  }
</script>
<style lang="less" scoped></style>

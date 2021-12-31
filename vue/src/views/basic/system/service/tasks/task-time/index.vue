<!-- 定时任务  -->
<template>
  <PageWrapper>
    <EzSearch>
      <BasicForm @register="register" @submit="handleSubmit" />
    </EzSearch>
    <EzTable
      title="后台任务"
      ref-name="timeTask"
      :height="0"
      :data-source="dataSource"
      :page-size="20"
      :edit-mode="'row'"
      :toolbar="[]"
      :show-more="false"
      :more-items="[]"
      selection-mode="single"
      :form-mode="true"
      :form-mode-event="onFormModeEvent"
    >
      <DxColumn data-field="tenantId" caption="租户" />
      <DxColumn data-field="jobName" caption="作业名称" :width="150" />
      <DxColumn data-field="jobGroup" caption="作业组" />
      <DxColumn data-field="doOnce" caption="只执行一次" :width="100" />
      <DxColumn data-field="startNow" caption="立即执行" :width="100" />
      <DxColumn data-field="interval" caption="执行间隔时间" />
      <DxColumn data-field="cron" caption="Cron表达式" />
      <DxColumn data-field="executeType" caption="执行类型" />
      <DxColumn data-field="timerType" caption="定时器类型" />
      <DxColumn data-field="requestType" caption="请求类型" />
      <DxColumn data-field="requestUrl" caption="请求url" />
      <DxColumn data-field="requestParameters" caption="请求参数" />
      <DxColumn data-field="headers" caption="Headers" />
      <DxColumn data-field="description" caption="备注" />
      <DxColumn data-field="enabled" caption="启用" />
    </EzTable>
    <!---日志记录-->
    <TimerDeatil @register="registerDrawer" :on-submit-success="onSubmitSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'TaskTime' });
</script>
<script lang="ts" setup>
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { reactive, ref } from 'vue';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { Ez } from '/@/utils/devexpress';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { BasicForm, FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { useAppStore } from '/@/store/modules/app';
  import TimerDeatil from './components/TimerDetail.vue';
  import { useDrawer } from '/@/components/Drawer/src/useDrawer';

  let loadParams = reactive({ tenantId: '', searchValue: '' });
  const schemas: FormSchema[] = [
    {
      field: 'tenantId',
      component: 'ApiSelect',
      label: '租户',
      colProps: {
        span: 6
      },
      rules: [{ required: true }],
      componentProps: {
        api: Ez.TenantsData,
        params: '',
        immediate: false,
        resultField: 'data',
        labelField: 'name',
        valueField: 'id'
      }
    },
    {
      field: 'searchValue',
      component: 'Input',
      label: '任务名',
      defaultValue: loadParams.searchValue,
      colProps: {
        span: 6
      }
    }
  ];
  const appSize = useAppStore().getAppSize;
  const [register, { validate }] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });

  const [registerDrawer, { openDrawer }]: any = useDrawer();

  async function handleSubmit() {
    const values = await validate();
    loadParams.tenantId = values.tenantId;
    loadParams.searchValue = values.searchValue;
    loadDataSource();
  }

  const dataSource: any = ref({});

  function loadDataSource() {
    const url = '/api/timer';
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadParams: { ...loadParams },
      loadUrl: `${url}/list`,
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  function onFormModeEvent(isUpdate, e) {
    openDrawer(true, {
      record: e?.data,
      isUpdate: isUpdate
    });
  }
  function onSubmitSuccess() {
    loadDataSource();
  }
</script>

<style lang="less" scoped>
  .task-a {
    a {
      display: block;
      width: 100%;
      cursor: pointer;
    }
  }

  .dx-row-focused {
    .task-a {
      color: #fff;
    }

    a {
      color: #fff;
    }
  }

  .text-center {
    text-align: center;
  }

  .dx-field-value-static,
  .dx-field-value:not(.dx-switch):not(.dx-checkbox):not(.dx-button) {
    width: 75%;
  }

  .status {
    text-align: center;
  }

  .text-normal {
    color: #5cb85c;
  }

  .text-suspend {
    color: #eb6c55;
  }

  .text-error {
    color: #f70a02;
  }
</style>

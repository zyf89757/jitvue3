<!-- 定时任务  -->
<template>
  <PageWrapper>
    <EzSearch>
      <BasicForm @register="register" @submit="handleSubmit" />
    </EzSearch>
    <EzTable
      title="调度任务"
      ref-name="timeTask"
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
    >
      <DxColumn data-field="tenant" caption="租户" :visible="true" />
      <DxColumn
        data-field="creation_time"
        caption="任务下派时间"
        data-type="date"
        :allow-editing="false"
        :width="120"
        format="yyyy-MM-dd HH:mm:ss"
      />
      <DxColumn data-field="job_name" caption="任务名" :allow-filtering="false" width="180" />
      <DxColumn data-field="job_desc" caption="任务描述" width="270" />
      <DxColumn data-field="job_progress" caption="进度" width="70" />
      <DxColumn data-field="job_status" :width="120" caption="状态" :allow-editing="false" />
      <DxColumn
        data-field="start_time"
        caption="任务开始时间"
        data-type="date"
        :allow-editing="false"
        :width="120"
        format="yyyy-MM-dd HH:mm:ss"
      />
      <DxColumn
        data-field="end_time"
        caption="任务完成时间"
        data-type="date"
        :allow-editing="false"
        :width="120"
        format="yyyy-MM-dd HH:mm:ss"
      />
      <DxColumn data-field="need_download" caption="下载" data-type="boolean" width="100" />
      <DxColumn data-field="need_callback" caption="回执" width="100" data-type="boolean" />
      <DxColumn data-field="need_notice" caption="通知" width="100" data-type="boolean" />
      <DxColumn data-field="download_path" caption="下载地址" :visible="false" />
      <DxColumn data-field="callback_path" caption="回执地址" :visible="false" />
      <DxColumn data-field="callback_params" caption="回执参数" :visible="false" />
      <DxColumn data-field="notice_siteemail" caption="站内信" :visible="false" />
      <DxColumn data-field="notice_email" caption="邮件" :visible="false" />
      <DxColumn data-field="notice_phone" caption="短信" :visible="false" />
      <DxColumn data-field="src" caption="来源" :width="180" />
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
  import { computed, reactive, ref, watch, onMounted, watchEffect } from 'vue';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { startTimerJob, stopTimerJob } from '/@/api/demo/task';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { BasicForm, FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { useAppStore } from '/@/store/modules/app';
  import TimerDeatil from './components/TimerDetail.vue';
  import { useDrawer } from '/@/components/Drawer/src/useDrawer';

  let loadParams = reactive({ tenantId: '', searchValue: '' });
  const schemas: FormSchema[] = [
    {
      field: 'isDone',
      component: 'Checkbox',
      label: '查看已完成',
      colProps: {
        span: 4,
      },
    },
    {
      field: 'tenantId',
      component: 'ApiSelect',
      label: '租户',
      colProps: {
        span: 8,
      },
      rules: [{ required: true }],
      componentProps: {
        api: Ez.TenantsData,
        params: '',
        immediate: false,
        resultField: 'data',
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'Time',
      component: 'RangePicker',
      label: '任务时间区间',
      colProps: {
        span: 8,
      },
    },
  ];
  const appSize = useAppStore().getAppSize;
  const [register, { validate }] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: {
      span: 24,
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1,
  });

  const [registerDrawer, { openDrawer }]: any = useDrawer();

  async function handleSubmit() {
    const values = await validate();
    loadParams.tenantId = values.tenantId;
    loadParams.searchValue = values.searchValue;
    loadDataSource();
  }
  const statusArr = [
    { value: 'offline', text: '离线', editable: false },
    { value: 'normal', text: '正常', editable: true },
    { value: 'suspend', text: '暂停', editable: true },
    { value: 'abnormal', text: '异常', editable: false },
  ];

  const taskDetailVisible = ref(false); // 任务详情
  var selData = reactive({ jobid: '' });
  const type = ref('');

  const changes = ref([]);
  const tempType = ref('');

  const dataSource: any = ref({});

  function loadDataSource() {
    const url = '/api/timer';
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadParams: { ...loadParams },
      loadUrl: `${url}/list`,
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`,
    });
  }

  // 显示日志
  function toggleTaskDetailVisble(key, value = 'local') {
    selData.jobid = key;
    type.value = value;
    taskDetailVisible.value = true;
  }

  const statusText = computed(() => {
    return statusArr.filter((item) => item.editable).map((item) => item.value);
  });
  const getTaskType = computed(() => {
    return changes.value[0]?.data?.task_way ?? null;
  });

  // 处理编辑时的任务方式
  function editingStart(res) {
    tempType.value = res.data.task_way;
  }

  watch(getTaskType, (newVal) => {
    tempType.value = newVal;
  });
  // 选中的data
  const onSelectionChanged = function ({ selectedRowsData }) {
    selData = selectedRowsData[0];
  };

  function onFormModeEvent(isUpdate, e) {
    openDrawer(true, {
      record: e?.data,
      isUpdate: isUpdate,
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

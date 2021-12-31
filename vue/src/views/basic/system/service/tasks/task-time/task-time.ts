import { FormSchema } from '/@/components/Form/index';
import { appListApi } from '/@/api/saas/app/menuManage';
import { Ez } from '/@/utils/devexpress';

export const timerSchemas: FormSchema[] = [
  {
    field: 'tenantId',
    component: 'ApiSelect',
    label: '租户',
    colProps: {
      span: 12
    },
    rules: [{ required: true }],
    componentProps: {
      api: Ez.TenantsData,
      immediate: false,
      resultField: 'data',
      labelField: 'name',
      valueField: 'id'
    }
  },
  {
    field: 'applicationId',
    label: '所属应用',
    rules: [{ required: true }],
    component: 'ApiSelect',
    componentProps: () => {
      return {
        api: appListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: false
      };
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'jobName',
    component: 'Input',
    label: '作业名称',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'jobGroup',
    component: 'Input',
    label: '作业组',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'executeType',
    component: 'Select',
    required: true,
    label: '执行类型',
    componentProps: {
      options: [
        { value: 0, label: '并行执行' },
        { value: 1, label: '串行执行' }
      ]
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'timerType',
    component: 'Select',
    label: '定时器类型',
    defaultValue: 0,
    componentProps: {
      options: [
        { value: 0, label: '间隔方式' },
        { value: 1, label: 'Cron 表达式' }
      ]
    },
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'interval',
    component: 'Input',
    label: '执行间隔时间',
    colProps: {
      span: 12
    },
    show: ({ values }) => {
      return values.timerType == 0;
    }
  },
  {
    field: 'cron',
    component: 'Input',
    label: 'Cron表达式',
    colProps: {
      span: 12
    },
    helpMessage: [
      '当选择了需要内链或外链打开的选项，此处输入要打开的链接地址。',
      '例：https://www.djitd.com'
    ],
    show: ({ values }) => {
      return values.timerType == 1;
    }
  },
  {
    field: 'requestType',
    label: '请求类型',
    component: 'ApiSelect',
    componentProps: () => {
      return {
        api: Ez.GetEnumData,
        params: { enumName: 'RequestTypeEnum' },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true
      };
    },
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'requestUrl',
    component: 'Input',
    label: '请求url',
    colProps: {
      span: 12
    }
  },
  {
    field: 'requestParameters',
    component: 'Input',
    label: '请求参数',
    colProps: {
      span: 12
    }
  },
  {
    field: 'headers',
    component: 'Input',
    label: 'Headers',
    colProps: {
      span: 12
    }
  },
  {
    field: 'description',
    component: 'Input',
    label: '备注',
    colProps: {
      span: 12
    }
  }
];

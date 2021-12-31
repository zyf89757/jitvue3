import { FormSchema } from '/@/components/Form/index';

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
    field: 'level',
    component: 'Input',
    label: '任务优先级',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'src',
    component: 'Input',
    label: '任务来源',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'jobName',
    component: 'Input',
    label: '任务名称',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'jobCode',
    component: 'Input',
    label: '任务编号',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'jobDesc',
    component: 'Input',
    label: '任务描述',
    colProps: {
      span: 12
    }
  },
  {
    field: 'jobGrogress',
    component: 'Input',
    label: '任务进度',
    colProps: {
      span: 12
    }
  },
  {
    field: 'authToken',
    component: 'Input',
    label: '授权token',
    colProps: {
      span: 12
    }
  },
  {
    field: 'startTime',
    component: 'Input',
    label: '开始时间',
    colProps: {
      span: 12
    }
  },
  {
    field: 'endTime',
    component: 'Input',
    label: '结束时间',
    colProps: {
      span: 12
    }
  },
  {
    field: 'divider-111',
    component: 'Divider'
  },
  {
    field: 'needCallback',
    component: 'Checkbox',
    label: '是否需要回执',
    colProps: {
      span: 12
    },
    componentProps: ({ formActionType }) => {
      const { updateSchema } = formActionType;
      return {
        onChange: (e: ChangeEvent) => {
          if (e.target.checked) {
            updateSchema({
              field: 'callbackUrl',
              rules: [{ required: true }]
            });
            updateSchema({
              field: 'callbackHeaders',
              rules: [{ required: true }]
            });
          } else {
            updateSchema({
              field: 'callbackUrl',
              rules: [{ required: false }]
            });
            updateSchema({
              field: 'callbackHeaders',
              rules: [{ required: false }]
            });
          }
        }
      };
    }
  },
  {
    field: 'callbackUrl',
    component: 'Input',
    label: '回执url',
    colProps: {
      span: 12
    }
  },
  {
    field: 'callbackParameters',
    component: 'Input',
    label: '回执参数',
    colProps: {
      span: 12
    }
  },
  {
    field: 'callbackHeaders',
    component: 'Input',
    label: '回执Headers',
    colProps: {
      span: 12
    }
  },
  {
    field: 'divider-112',
    component: 'Divider'
  },
  {
    field: 'needNotice',
    component: 'Checkbox',
    label: '是否需要通知',
    colProps: {
      span: 12
    },
    componentProps: ({ formActionType }) => {
      const { updateSchema } = formActionType;
      return {
        onChange: (e: ChangeEvent) => {
          if (e.target.checked) {
            updateSchema({
              field: 'noticeEmail',
              rules: [{ required: true }]
            });
          } else {
            updateSchema({
              field: 'noticeEmail',
              rules: [{ required: false }]
            });
          }
        }
      };
    }
  },
  {
    field: 'noticeEmail',
    component: 'Input',
    label: '通知邮箱',
    colProps: {
      span: 12
    }
  },
  {
    field: 'noticePhone',
    component: 'Input',
    label: '通知手机号',
    colProps: {
      span: 12
    }
  },
  {
    field: '',
    component: 'Divider'
  },
  {
    field: 'needDownload',
    component: 'Checkbox',
    label: '是否需要下载',
    colProps: {
      span: 12
    }
  },
  {
    field: 'downloadPath',
    component: 'Input',
    label: '下载地址',
    colProps: {
      span: 12
    },
    dynamicDisabled: true
  }
];

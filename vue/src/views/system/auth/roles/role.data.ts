import { FormSchema } from '/@/components/Form/index';
import { empListApi } from '/@/api/system/project';

export const taskSchemas: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    component: 'Input',
    label: '任务名称',
    colProps: {
      span: 24,
    },
    required: true,
  },

  {
    field: 'sName',
    component: 'Input',
    label: '任务简称',
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    field: 'code',
    component: 'Input',
    label: '任务编号',
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    field: 'formProjectId',
    label: '所属客户名称',
    component: 'Input',
    show: false,
    required: true,
  },
  {
    required: true,
    field: 'formProjectName',
    label: '所属项目名称',
    component: 'Input',
    colProps: {
      span: 12,
    },
    dynamicDisabled: false,
  },
  {
    field: 'leaderId',
    component: 'ApiSelect',
    label: '主负责人',
    componentProps: ({ formModel }) => {
      return {
        api: empListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e, target) => {
          console.log(e);
          formModel.leaderName = target.label;
        },
      };
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'leaderName',
    label: '主负责人名称',
    component: 'Input',
    show: false,
  },
  {
    field: 'fieldTime',
    component: 'RangePicker',
    label: '任务时间',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'ptStatus',
    component: 'RadioGroup',
    label: '状态',
    colProps: {
      span: 12,
    },
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '正常',
          value: '0',
        },
        {
          label: '结束',
          value: '1',
        },
        {
          label: '异常',
          value: '2',
        },
      ],
    },
    rules: [{ required: true }],
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '说明',
    colProps: {
      span: 24,
    },
  },
];

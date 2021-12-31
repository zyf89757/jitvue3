import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';
import { customerListApi } from '/@/api/system/project';

export const searchSchemas: FormSchema[] = [
  {
    field: 'customer',
    component: 'ApiSelect',
    label: '所属客户',
    rules: [{ required: true }],
    componentProps: ({ formModel }) => {
      return {
        api: customerListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e, target) => {
          console.log(e);
          formModel.fromCustomerName = target.label;
        }
      };
    },
    colProps: {
      span: 8
    },
    helpMessage: ['选择项目的所属的客户']
  },
  {
    required: true,
    field: 'fromCustomerName',
    label: '所属客户名称',
    component: 'Input',
    show: false
  },
  {
    field: 'status',
    component: 'RadioGroup',
    label: '项目状态',
    colProps: {
      span: 12
    },
    defaultValue: '-1',
    componentProps: {
      options: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '停用',
          value: '1'
        },
        {
          label: '异常',
          value: '2'
        },
        {
          label: '全部',
          value: '-1'
        }
      ]
    },
    rules: [{ required: true }],
    helpMessage: ['选择项目的状态']
  }
];

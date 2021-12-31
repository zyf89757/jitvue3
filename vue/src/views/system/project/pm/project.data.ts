import { FormSchema } from '/@/components/Form/index';
import { customerListApi, empListApi } from '/@/api/system/project';

export const projectSchemas: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
  },
  {
    field: 'name',
    component: 'Input',
    label: '项目名称',
    colProps: {
      span: 24
    },
    required: true
  },

  {
    field: 'sName',
    component: 'Input',
    label: '项目简称',
    colProps: {
      span: 12
    },
    required: true,
    componentProps: {
      maxLength: 6
    }
  },
  {
    field: 'code',
    component: 'Input',
    label: '项目编号',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'fromCustomerId',
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
      span: 12
    }
  },
  {
    required: true,
    field: 'fromCustomerName',
    label: '所属客户名称',
    component: 'Input',
    show: false
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
        }
      };
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'leaderName',
    label: '主负责人名称',
    component: 'Input',
    show: false
  },
  {
    field: 'fieldTime',
    component: 'RangePicker',
    label: '项目时间',
    colProps: {
      span: 12
    },
    required: false
  },

  {
    field: 'ptStatus',
    component: 'RadioGroup',
    label: '状态',
    colProps: {
      span: 12
    },
    //numberToString: true,
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '结束',
          value: '1'
        },
        {
          label: '异常',
          value: '2'
        }
      ]
    },
    rules: [{ required: true }]
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '说明',
    colProps: {
      span: 24
    }
  }
];

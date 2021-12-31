import { FormSchema } from '/@/components/Form/index';
import { customerListApi } from '/@/api/system/project';

export const CertSchemas: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
  },
  {
    field: 'divider-1',
    component: 'Divider',
    label: '基本信息',
    colProps: {
      span: 24
    }
  },
  {
    field: 'bsCode',
    component: 'Input',
    label: '业务编号',
    colProps: {
      span: 8
    },
    componentProps: {
      maxLength: 64,
      disabled: true,
      placeholder: '保存后系统自动生成'
    }
  },
  {
    field: 'customerId',
    component: 'ApiSelect',
    label: '经营单位',
    rules: [{ required: true }],
    componentProps: ({ formModel }) => {
      return {
        api: customerListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (_e, target) => {
          formModel.customerName = target.label;
        }
      };
    },
    colProps: {
      span: 8
    }
  },
  {
    required: true,
    field: 'customerName',
    label: '经营单位编号',
    component: 'Input',
    show: false
  },
  {
    field: 'orgCode',
    component: 'Input',
    label: '企业内部编号',
    colProps: {
      span: 8
    },
    componentProps: {
      maxLength: 64
    },
    required: true
  },

  {
    field: 'certType',
    component: 'ApiSelect',
    label: '证件类型',
    rules: [{ required: true }],
    componentProps: ({ formModel }) => {
      return {
        api: customerListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (_e, target) => {
          formModel.certTypeName = target.label;
        }
      };
    },
    colProps: {
      span: 8
    }
  },
  {
    required: true,
    field: 'certTypeName',
    label: '证件类型名称',
    component: 'Input',
    show: false
  },
  {
    field: 'code',
    component: 'Input',
    label: '证件号码',
    colProps: {
      span: 8
    },
    componentProps: {
      maxLength: 64
    },
    required: true
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    colProps: {
      span: 24
    }
  },
  {
    field: 'enabled',
    component: 'Switch',
    label: '启用',
    defaultValue: true,
    colProps: {
      span: 8
    }
  },
  {
    field: 'divider-1',
    component: 'Divider',
    label: '证件授权信息',
    colProps: {
      span: 24
    }
  },

  {
    field: 'fieldTime',
    component: 'RangePicker',
    label: '证件有效期',
    colProps: {
      span: 8
    },
    dynamicDisabled: ({ values }) => {
      const disabled = values.validityEnabled;
      return !disabled;
    }
  },
  {
    field: 'validityEnabled',
    component: 'Switch',
    label: '启用有效期',
    defaultValue: false,
    colProps: {
      span: 4
    },
    required: true
  },
  {
    field: 'countMax',
    component: 'InputNumber',
    label: '最大使用次数',
    defaultValue: 0,
    colProps: {
      span: 4
    },
    dynamicDisabled: ({ values }) => {
      const disabled = values.countEnabled;
      return !disabled;
    }
  },
  {
    field: 'countLast',
    component: 'InputNumber',
    label: '剩余使用次数',
    defaultValue: 0,
    colProps: {
      span: 4
    },
    dynamicDisabled: ({ values }) => {
      const disabled = values.countEnabled;
      return !disabled;
    }
  },
  {
    field: 'countEnabled',
    component: 'Switch',
    label: '启用次数',
    defaultValue: false,
    colProps: {
      span: 4
    },
    required: true
  }
];

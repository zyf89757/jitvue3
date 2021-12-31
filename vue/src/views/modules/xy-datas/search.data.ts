import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';

export const searchSchemas: FormSchema[] = [
  {
    field: 'ownerCode',
    component: 'Select',
    label: '所属企业',
    rules: [{ required: true }],
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '全部',
          value: '0'
        },
        {
          label: '兴亚',
          value: '3107980011'
        },
        {
          label: '丹砂',
          value: '312264K003'
        }
      ],
      immediate: true
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'status',
    component: 'RadioGroup',
    label: '状态',
    colProps: {
      span: 16
    },
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '正常',
          value: '1'
        },
        {
          label: '缺数据',
          value: '2'
        },
        {
          label: '缺回执',
          value: '3'
        },
        {
          label: '缺单证',
          value: '4'
        },
        {
          label: '单证不一致',
          value: '5'
        },
        {
          label: '全部',
          value: '0'
        }
      ]
    },
    rules: [{ required: true }]
  },
  {
    field: 'unit',
    component: 'RadioGroup',
    label: '经营单位',
    colProps: {
      span: 8
    },
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '全部',
          value: '0'
        },
        {
          label: '收发货人',
          value: '1'
        },
        {
          label: '消费使用单位',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'cusCode',
    label: '海关编码',
    component: 'Input',
    colProps: {
      span: 6
    },
    componentProps: {
      maxLength: 64
    },
    dynamicDisabled: ({ values }) => {
      return values.unit == 0;
    }
  },
  {
    field: 'unitName',
    label: '单位名称',
    component: 'Input',
    colProps: {
      span: 10
    },
    componentProps: {
      maxLength: 64
    },
    dynamicDisabled: ({ values }) => {
      return values.unit == 0;
    }
  },
  {
    field: 'range',
    component: 'RangePicker',
    label: '统计范围',
    colProps: {
      span: 8
    }
  },
  {
    field: 'dDate',
    component: 'RangePicker',
    label: '申报日期',
    colProps: {
      span: 8
    }
  },
  {
    field: 'pDate',
    component: 'RangePicker',
    label: '放行日期',
    colProps: {
      span: 8
    }
  },
  {
    field: 'cusCiqNo',
    label: '统一编号',
    component: 'Input',
    colProps: {
      span: 8
    },
    componentProps: {
      maxLength: 18
    }
  },
  {
    field: 'entryId',
    label: '报关单号',
    component: 'Input',
    colProps: {
      span: 8
    },
    componentProps: {
      maxLength: 18
    }
  },
  {
    field: 'billNo',
    label: '提运单号',
    component: 'Input',
    colProps: {
      span: 8
    },
    componentProps: {
      maxLength: 64
    }
  },
  {
    field: 'batch',
    component: 'InputTextArea',
    label: '(批量) 统一编号',
    colProps: {
      span: 24
    },
    componentProps: {
      maxLength: 4000,
      placeholder: '请使用半角空格、分号；可以直接复制Excel内容'
    }
  }
];

import { FormSchema } from '/@/components/Form';

export const additionSchemas: FormSchema[] = [
  {
    field: 'userCompanyCustomsCode',
    component: 'Input',
    label: '经营单位编码：',
    componentProps: {
      style: { width: '90%' },
      placeholder: '请输入经营单位'
    },
    colProps: {
      span: 2
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'userCompanyCustomsName',
    component: 'Input',
    label: '经营单位名称：',
    componentProps: {
      style: { width: '99%' },
      placeholder: '请输入经营单位'
    },
    colProps: {
      span: 4
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'commodityNo',
    component: 'Input',
    label: '物料号：',
    colProps: {
      span: 3
    },
    componentProps: {
      style: { width: '80%' },
      placeholder: '请输入物料号'
    },
    required: true
  },
  {
    field: 'hsCode',
    component: 'Input',
    label: '商品hsCode：',
    colProps: {
      span: 3
    },
    componentProps: {
      style: { width: '90%' },
      placeholder: '请输入商品编码'
    },
    required: true
  },
  {
    field: 'nameCn',
    component: 'Input',
    label: '中文品名：',
    componentProps: {
      style: { width: '80%' },
      placeholder: '请输入中文品名'
    },
    colProps: {
      span: 3
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'nameEn',
    component: 'Input',
    label: '英文品名：',
    colProps: {
      span: 3
    },
    componentProps: {
      style: { width: '80%' }
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'nameDecl',
    component: 'Input',
    label: '报关品名：',
    componentProps: {
      style: { width: '90%' },
      placeholder: '请输入报关品名'
    },
    colProps: {
      span: 3
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'ciqName',
    component: 'Input',
    label: 'CIQ编码名称',
    componentProps: {
      style: { width: '80%' },
      placeholder: '请输入CIQ编码名称'
    },
    colProps: {
      span: 3
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'ciqCode',
    component: 'Input',
    label: 'Ciq编码',
    componentProps: {
      style: { width: '80%' },
      placeholder: '请输入CIQ编码'
    },
    colProps: {
      span: 3
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'gType',
    component: 'Select',
    label: '物料类型',
    colProps: {
      span: 4
    },
    componentProps: {
      style: { width: '90%' },
      placeholder: '请输入物料类型',
      options: [
        {
          label: '成品',
          value: 'E'
        },
        {
          label: '料件',
          value: 'I'
        },
        {
          label: '成品&料件',
          value: '&'
        }
      ]
    },
    required: true
  },
  {
    field: 'declareElement',
    component: 'Input',
    label: '申报要素：',
    componentProps: {
      style: { width: '96%' },
      placeholder: '请输入申报要素'
    },
    colProps: {
      span: 24
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'declareNorm',
    component: 'Input',
    label: '申报规范：',
    componentProps: {
      style: { width: '96%', hight: '200%' },
      placeholder: '请输入申报规范'
    },
    colProps: {
      span: 24
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'declareUnit',
    component: 'Input',
    label: '申报计量单位',
    componentProps: {
      style: { width: '96%' },
      placeholder: '请输入申报计量单位'
    },
    colProps: {
      span: 2
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'declareUnitName',
    component: 'Input',
    label: '申报计量单位名称：',
    componentProps: {
      style: { width: '80%' },
      placeholder: '请输入申报计量单位名称'
    },
    colProps: {
      span: 3
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'receiveCompanyCustomsNames',
    component: 'Input',
    label: '收发货人名称:',
    componentProps: {
      style: { width: '80%' },
      placeholder: '请输入收发货人名称'
    },
    colProps: {
      span: 3
    },
    required: false,
    defaultValue: ''
  },
  {
    field: 'receiveCompanyCustomsCode',
    component: 'Input',
    label: '收发货人海关十单位编码：',
    componentProps: {
      style: { width: '80%' },
      placeholder: '请输入收发货人海关十单位编码'
    },
    colProps: {
      span: 3
    },
    required: false,
    defaultValue: ''
  },

  {
    field: 'country',
    component: 'Input',
    label: '原产国：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 3
    },
    defaultValue: ''
  },
  {
    field: 'countryName',
    component: 'Input',
    label: '原产国名称：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 3
    },
    defaultValue: ''
  },
  {
    field: 'length',
    component: 'Input',
    label: '长：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'weidth',
    component: 'Input',
    label: '宽：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'height',
    component: 'Input',
    label: '高：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'lengthUnitName',
    component: 'Input',
    label: '长度计量单位名称：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'lengthUnit',
    component: 'Input',
    label: '长度计量单位：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'netWeight',
    component: 'Input',
    label: '参考净重：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'netWeightUnitName',
    component: 'Input',
    label: '净重单位名称：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'netWeightUnit',
    component: 'Input',
    label: '净重单位：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'grossWeight',
    component: 'Input',
    label: '参考毛重：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'grossWeightUnit',
    component: 'Input',
    label: '毛重单位：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'grossWeightUnitName',
    component: 'Input',
    label: '毛重单位名称：',
    required: false,
    componentProps: {
      style: { width: '80%' }
    },
    colProps: {
      span: 2
    },
    defaultValue: ''
  },
  {
    field: 'enabled',
    component: 'Switch',
    label: '启用',
    defaultValue: true,
    colProps: {
      span: 2
    }
  }
];

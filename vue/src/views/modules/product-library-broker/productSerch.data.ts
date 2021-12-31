import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';

export const searchpdSchemas: FormSchema[] = [
  {
    field: 'userCompanyCustomsCode',
    component: 'Input',
    label: '经营单位编码  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'isEnable',
    component: 'Switch',
    defaultValue: true,
    label: '是否启用  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'commodityNo',
    component: 'Input',
    label: '物料号/货号  ',
    componentProps: {
      style: { width: '99%' },
      placeholder: '请输入'
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'hsCode',
    component: 'Input',
    label: 'HsCode  ',
    componentProps: {
      style: { width: '99%' },
      placeholder: '请输入'
    },
    colProps: {
      span: 8
    }
  }
];

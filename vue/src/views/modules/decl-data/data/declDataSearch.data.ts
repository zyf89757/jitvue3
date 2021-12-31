import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';

export const searchSchemas: FormSchema[] = [
  {
    field: 'dclTrnRelFlag',
    component: 'Input',
    label: '报关单类型  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'etpsCategoryName',
    component: 'Input',
    label: '企业类别  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'ciqIEFlag',
    component: 'Input',
    label: '进出口标志  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'entryId',
    component: 'Input',
    label: '报关单号  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'cusCiqNo',
    component: 'Input',
    label: '统一编号  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'cnsnTradeCode',
    component: 'Input',
    label: '境内收发货人  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'billNo',
    component: 'Input',
    label: '提运单号  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'customMaster',
    component: 'Input',
    label: '申报地海关  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'updateTimeStart',
    component: 'DatePicker',
    label: '起始日期  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'updateTimeEnd',
    component: 'DatePicker',
    label: '结束日期  ',
    colProps: {
      span: 8
    }
  }
];

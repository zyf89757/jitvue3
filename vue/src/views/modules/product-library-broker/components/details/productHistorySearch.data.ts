import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';

const historyTableOptions: LabelValueOptions = [
  {
    label: '2018年预归类',
    value: 'XYBG_2018'
  },
  {
    label: '2020年预归类',
    value: 'XYBG_2020'
  },
  {
    label: '商检软件数据库',
    value: 'GYT'
  }
];
export const searchSchemas: FormSchema[] = [
  {
    field: 'historyTable',
    component: 'Select',
    label: '数据来源  ',
    componentProps: {
      style: { width: '90%' },
      placeholder: '请输入物料类型',
      options: historyTableOptions
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'userCompanyCustomsCode',
    component: 'Input',
    label: '经营单位编码  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'isUpdata',
    component: 'Switch',
    defaultValue: false,
    label: '是否已经导入到新库  ',
    colProps: {
      span: 8
    }
  },
  {
    field: 'entryId',
    component: 'Input',
    label: '物料号  ',
    componentProps: {
      style: { width: '99%' },
      placeholder: '功能未填充'
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'hsCode',
    component: 'Input',
    label: 'hsCode  ',
    componentProps: {
      style: { width: '99%' },
      placeholder: '功能未填充'
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'DatePickerstart',
    component: 'DatePicker',
    label: '起始日期  ',
    componentProps: {
      style: { width: '99%' },
      placeholder: '开始'
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'DatePickerend',
    component: 'DatePicker',
    label: '起始日期  ',
    componentProps: {
      style: { width: '99%' },
      placeholder: '结束'
    },
    colProps: {
      span: 6
    }
  }
];

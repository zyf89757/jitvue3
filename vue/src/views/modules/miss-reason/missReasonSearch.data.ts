import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';

export const searchSchemas: FormSchema[] = [
  {
    field: 'cusCiqNo',
    component: 'Input',
    label: '统一编号  ',
    componentProps: {
      placeholder: '请输入统一编号'
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'customsBatchNo',
    component: 'Input',
    label: '批次  ',
    componentProps: {
      placeholder: '请输入批次'
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'dclrNo',
    component: 'Input',
    label: '备案编号  ',
    componentProps: {
      placeholder: '请输入备案编号'
    },
    colProps: {
      span: 8
    }
  }
];

import { FormSchema } from '/@/components/Form/index';

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
  },
  {
    field: 'cusCiqNo',
    component: 'Input',
    label: '统一编号',
    colProps: {
      span: 12
    },
    required: true
  },

  {
    field: 'customsBatchNo',
    component: 'Input',
    label: '批次',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'missReason',
    component: 'Input',
    label: '丢失原因',
    colProps: {
      span: 24
    },
    required: true
  }
];

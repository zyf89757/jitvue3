import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';

export const searchSchemas: FormSchema[] = [
  {
    field: 'dclrNo',
    component: 'Input',
    label: '备案编号  ',
    componentProps: {
      style: { width: '90%' },
      placeholder: '请输入备案编号'
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'dclrDepartment',
    component: 'Input',
    label: '备案部门  ',
    componentProps: {
      style: { width: '80%' },
      placeholder: '请输入备案编号'
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'dclrName',
    component: 'Input',
    label: '备案操作员名称  ',
    colProps: {
      span: 8
    },
    componentProps: {
      style: { width: '90%' },
      placeholder: '请输入备案编号'
    }
  },
  {
    field: 'cardNo',
    component: 'Input',
    label: '报关员卡号  ',
    componentProps: {
      style: { width: '80%' },
      placeholder: '报关员卡号'
    },
    colProps: {
      span: 8
    }
  }
];

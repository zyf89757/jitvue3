import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';

export const searchSchemas: FormSchema[] = [
  {
    field: 'templateName',
    component: 'Input',
    label: '模板名称',
    colProps: {
      span: 12
    }
  }
];

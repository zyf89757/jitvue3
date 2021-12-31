import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';

export const searchSchemas: FormSchema[] = [
  {
    field: 'year',
    component: 'Select',
    label: '统计范围',
    // rules: [{ required: true }],
    defaultValue: new Date().getFullYear(),
    componentProps: () => {
      const date = new Date();
      const year = date.getFullYear();
      const list = [];
      for (let i = 2021; i <= year; i++) {
        list.push({ label: i + '年', value: i });
      }
      return {
        options: list,
        immediate: true
      };
    },
    colProps: {
      span: 8
    }
  }
];

import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';
import { appListOrgApi } from '/@/api/system/org';

export const searchSchemas: FormSchema[] = [
  {
    field: 'org',
    component: 'ApiSelect',
    label: '选择当前组织 : ',
    rules: [{ required: true }],
    componentProps: ({ formModel }) => {
      return {
        api: appListOrgApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (_e: any, target) => {
          formModel.fromOrgName = _e ? target.label : _e;
        }
      };
    },
    colProps: {
      span: 8
    },
    helpMessage: ['选择您需要查看详细部门信息的组织名称']
  },
  {
    required: true,
    field: 'fromOrgName',
    label: '当前部门所属的组织名称',
    component: 'Input',
    show: false
  }
];

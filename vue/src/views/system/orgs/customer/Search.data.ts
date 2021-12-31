import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';
import { orgListApi, deptListApi } from '/@/api/system/customer';

export const searchSchemas: FormSchema[] = [
  {
    field: 'org',
    component: 'ApiSelect',
    label: '所属组织',
    rules: [{ required: false }],
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: orgListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e: String, target: any) => {
          // formModel.currentOrdId = target.value;
          // formModel.currentDepteId = undefined;
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'dept',
            componentProps: {
              api: deptListApi,
              params: { orgId: e },
              resultField: 'data',
              labelField: 'text',
              valueField: 'value',
              onChange: (e1: String, target: any) => {
                console.log(e1);
                // formModel.currentDepteId = target.value;
              },
            },
          });
        },
      };
    },
    colProps: {
      span: 7,
    },
  },
  {
    field: 'dept',
    component: 'ApiSelect',
    label: '所属部门',
    rules: [{ required: false }],
    componentProps: ({ formModel }) => {
      return {
        api: deptListApi,
        params: { orgId: formModel.org },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: false,
        onChange: (e: String, target: any) => {
          console.log(e);
          // formModel.currentDepteId = target.value;
        },
      };
    },
    colProps: {
      span: 7,
    },
  },
];

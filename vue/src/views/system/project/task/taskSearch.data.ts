import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';
import { customerListApi, projectListApi } from '/@/api/system/project';

export const searchSchemas: FormSchema[] = [
  {
    field: 'customer',
    component: 'ApiSelect',
    label: '所属客户',
    rules: [{ required: true }],
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: customerListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e: String, target: any) => {
          formModel.fromCustomerName = target.label;
          formModel.project = undefined;
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'project',
            componentProps: {
              api: projectListApi,
              params: { customerId: e },
              resultField: 'data',
              labelField: 'text',
              valueField: 'value',
              onChange: (e1: String, target: any) => {
                console.log(e1);
                formModel.fromProjectName = target.label;
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
    field: 'project',
    component: 'ApiSelect',
    label: '所属项目',
    rules: [{ required: true }],
    componentProps: ({ formModel }) => {
      return {
        api: projectListApi,
        params: { customerId: formModel.customer },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: false,
        onChange: (e: String, target: any) => {
          console.log(e);
          formModel.fromProjectName = target.label;
        },
      };
    },
    colProps: {
      span: 7,
    },
  },
  {
    required: true,
    field: 'fromProjectName',
    label: '所属项目名称',
    component: 'Input',
    show: false,
  },
  {
    field: 'status',
    component: 'RadioGroup',
    label: '项目状态',
    colProps: {
      span: 10,
    },
    defaultValue: '-1',
    componentProps: {
      options: [
        {
          label: '正常',
          value: '0',
        },
        {
          label: '停用',
          value: '1',
        },
        {
          label: '异常',
          value: '2',
        },
        {
          label: '全部',
          value: '-1',
        },
      ],
    },
    rules: [{ required: true }],
  },
];

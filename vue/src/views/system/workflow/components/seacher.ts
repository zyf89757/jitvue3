import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';
import { appListApi, appMenuList } from '/@/api/saas/app/menuManage';
// 引用外部api配置的路由请求
import { flowdicAsync } from '/@/api/system/workflow';
import { optionProps } from 'ant-design-vue/lib/vc-mentions/src/Option';

export const searchFlowSchemas: FormSchema[] = [
  {
    field: 'system',
    component: 'ApiSelect',
    label: '所属系统',
    rules: [{ required: false }],
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: appListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e: String, target: any) => {
          const { updateSchema } = formActionType;
          updateSchema([
            {
              field: 'modular',
              componentProps: {
                api: appMenuList,
                params: { appId: e },
                resultField: 'data',
                labelField: 'text',
                valueField: 'value',
                onChange: (e1: String, target: any) => {
                  console.log(e1);
                  // formModel.currentDepteId = target.value;
                }
              }
            },
            {
              field: 'flowId',
              componentProps: {
                api: flowdicAsync,
                params: { system: e, modular: formModel.modular },
                resultField: 'data',
                labelField: 'text',
                valueField: 'value',
                onChange: (e1: String, target: any) => {
                  console.log(e1);
                }
              }
            }
          ]);
        }
      };
    },
    colProps: {
      span: 7
    }
  },
  {
    field: 'modular',
    component: 'ApiSelect',
    label: '所属模块',
    rules: [{ required: false }],
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: appMenuList,
        params: { appId: formModel.system },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: false,
        onChange: (e: String, target: any) => {
          console.log(e);
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'flowId',
            componentProps: {
              api: flowdicAsync,
              params: { system: formModel.system, modular: e },
              resultField: 'data',
              labelField: 'text',
              valueField: 'value',
              onChange: (e1: String, target: any) => {
                console.log(e1);
              }
            }
          });
        }
      };
    },
    colProps: {
      span: 7
    }
  },
  {
    field: 'flowId',
    component: 'ApiSelect',
    label: '所属流程',
    rules: [{ required: false }],
    componentProps: ({ formModel }) => {
      return {
        api: flowdicAsync,
        params: { system: formModel.system, modular: formModel.modular },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: false,
        onChange: (e: String, target: any) => {
          console.log(e);
          // formModel.currentDepteId = target.value;
        }
      };
    },
    colProps: {
      span: 7
    }
  },
  {
    field: 'searchType',
    component: 'Select',
    label: '查询类型',
    rules: [{ required: false }],
    componentProps: {
      options: [
        {
          label: '发起审批',
          value: '0',
          key: '0'
        },
        {
          label: '待办审批',
          value: '1',
          key: '1'
        }
      ]
    },
    defaultValue: '0',
    colProps: {
      span: 7
    }
  }
];

export const searchSchemas: FormSchema[] = [
  {
    field: 'flowId',
    component: 'ApiSelect',
    label: '所属流程',
    rules: [{ required: false }],
    componentProps: ({ formModel }) => {
      return {
        api: flowdicAsync,
        params: { orgId: formModel.org },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: false,
        onChange: (e: String, target: any) => {
          console.log(e);
          // formModel.currentDepteId = target.value;
        }
      };
    },
    colProps: {
      span: 7
    }
  }
];

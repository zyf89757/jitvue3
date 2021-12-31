import { FormSchema } from '/@/components/Form/index';
// 引用外部api配置的路由请求
import { flowRoleAsync } from '/@/api/system/workflow';
import { appListApi, appMenuList } from '/@/api/saas/app/menuManage';

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
  },
  {
    field: 'name',
    component: 'Input',
    label: '流程名称',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'flowType',
    component: 'Input',
    label: '流程类型',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'checkRole',
    component: 'ApiSelect',
    label: '查看角色',
    colProps: {
      span: 12
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: flowRoleAsync,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
        }
      };
    }
  },
  {
    field: 'system',
    component: 'ApiSelect',
    defaultValue: [],
    label: '所属系统',
    rules: [{ required: true }],
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: appListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e) => {
          console.log('selected:', e);
          const { updateSchema } = formActionType;
          formModel.modular = '';
          updateSchema({
            field: 'modular',
            componentProps: {
              api: appMenuList,
              params: { appId: e },
              resultField: 'data',
              immediate: true
            }
          });
        }
      };
    },
    colProps: {
      span: 12
    }
  },

  {
    field: 'modular',
    component: 'ApiTreeSelect',
    label: '所属模块',
    colProps: {
      span: 12
    },
    componentProps: ({ formModel }) => {
      return {
        api: appMenuList,
        params: { appId: formModel.system },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true
      };
    }
  },
  {
    field: 'sortNum',
    label: '排序',
    component: 'InputNumber',
    colProps: {
      span: 12
    }
  },
  {
    field: 'enabled',
    label: '是否启用',
    component: 'Switch',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'remark',
    label: '说明',
    component: 'InputTextArea',
    colProps: {
      span: 24
    }
  }
];

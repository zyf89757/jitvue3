import { FormSchema } from '/@/components/Form/index';
// 引用外部api配置的路由请求
import { flowRoleAsync, flowdicAsync, stepdicAsync, methoddicAsync } from '/@/api/system/workflow';
import { AutoComplete } from 'ant-design-vue';

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
  },
  {
    field: 'stepName',
    component: 'Input',
    label: '步骤名称',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'approveMethod',
    component: 'ApiSelect',
    label: '审批方式',
    colProps: {
      span: 12
    },
    componentProps: ({ formModel }) => {
      return {
        api: methoddicAsync,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
        }
      };
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
    componentProps: ({ formModel }) => {
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
    field: 'operationrole',
    component: 'ApiSelect',
    label: '审批角色',
    colProps: {
      span: 12
    },
    componentProps: ({ formModel }) => {
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
    field: 'sortNum',
    label: '步骤排序',
    component: 'InputNumber',
    colProps: {
      span: 12
    }
  },
  {
    field: 'flowID',
    component: 'ApiSelect',
    defaultValue: [],
    label: '所属流程',
    rules: [{ required: true }],
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: flowdicAsync,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e) => {
          console.log('selected:', e);
          const { updateSchema } = formActionType;
          debugger;
          formModel.modular = '';
          updateSchema([
            {
              field: 'previousStep',
              componentProps: {
                api: stepdicAsync,
                params: { id: e, stepid: formModel.id },
                resultField: 'data',
                labelField: 'text',
                valueField: 'value',
                immediate: true
              }
            },
            {
              field: 'rejectStep',
              componentProps: {
                api: stepdicAsync,
                params: { id: e, stepid: formModel.id },
                resultField: 'data',
                labelField: 'text',
                valueField: 'value',
                immediate: true
              }
            }
          ]);
        }
      };
    },
    colProps: {
      span: 12
    }
  },

  {
    field: 'previousStep',
    component: 'ApiSelect',
    label: '上一步骤',
    colProps: {
      span: 12
    },
    componentProps: ({ formModel }) => {
      if (formModel.flowID != null && formModel.id != null) {
        return {
          api: stepdicAsync,
          params: { id: formModel.flowID, stepid: formModel.id },
          resultField: 'data',
          labelField: 'text',
          valueField: 'value',
          immediate: true,
          showSearch: true
        };
      } else {
        return {
          api: null,
          resultField: 'data',
          labelField: 'text',
          valueField: 'value',
          immediate: true,
          showSearch: true
        };
      }
    }
  },
  {
    field: 'rejectStep',
    component: 'ApiSelect',
    label: '驳回步骤',
    colProps: {
      span: 12
    },
    componentProps: ({ formModel }) => {
      if (formModel.flowID != null && formModel.id != null) {
        return {
          api: stepdicAsync,
          params: { id: formModel.flowID, stepid: formModel.id },
          resultField: 'data',
          labelField: 'text',
          valueField: 'value',
          showSearch: false,
          immediate: true
        };
      } else {
        return {
          api: null,
          resultField: 'data',
          labelField: 'text',
          valueField: 'value',
          immediate: true,
          showSearch: true
        };
      }
    }
  },
  {
    field: 'businessCondition',
    component: 'Input',
    label: '业务流程状态',
    colProps: {
      span: 12
    },
    required: true
  },

  {
    field: 'isNotice',
    label: '是否通知',
    component: 'Switch',
    colProps: {
      span: 12
    },
    required: true
  },

  {
    field: 'noticeModel',
    label: '通知模板',
    component: 'InputTextArea',
    colProps: {
      span: 24
    }
  }
];

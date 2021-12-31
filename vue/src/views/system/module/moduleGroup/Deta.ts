import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';
import { moductListGroupApi } from '/@/api/system/module';
import { defHttp } from '/@/utils/http/axios';
export const searchSchemas: FormSchema[] = [
  {
    field: 'moduleType',
    component: 'ApiSelect',
    label: '组模型类型',
    rules: [{ required: false }],
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: moductListGroupApi,
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
              api: moductListGroupApi,
              params: { orgId: e },
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
      span: 12
    }
  },
  {
    field: 'sonModulName',
    component: 'Input',
    label: '组模型名',
    colProps: {
      span: 12
    }
  }
];

//获取模型信息
export function getmoduce(key) {
  return defHttp.get(
    {
      url: `/api/system/module/Key?key=` + key
    },
    { isTransformResponse: false }
  );
}

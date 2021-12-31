import { FormSchema } from '/@/components/Form/index';
import { titleApi, applyApi } from '/@/api/system/note';
// 声明表单的字段，字段和接口返回值一致
export const formSchema: FormSchema[] = [
  {
    // 数据字段
    field: 'id',
    // 展示字段
    label: 'id',
    // 可空要求
    required: true,
    // 默认值
    defaultValue: 0,
    // 表单的控件类型
    component: 'Input',
    // 是否展示
    show: false
  },
  {
    field: 'apply',
    component: 'ApiSelect',
    label: '应用',
    colProps: {
      span: 12
    },
    rules: [{ required: false }],
    componentProps: () => {
      return {
        api: applyApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: false
      };
    }
  },
  {
    field: 'messagetype',
    component: 'ApiSelect',
    label: '标题',
    colProps: {
      span: 12
    },
    rules: [{ required: false }],
    componentProps: () => {
      return {
        api: titleApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: false
      };
    }
  },

  {
    field: 'PhoneNum',
    component: 'Input',
    label: '手机号',
    colProps: {
      span: 12
    },
    required: true
  },

  {
    field: 'content',
    component: 'InputTextArea',
    label: '短信内容',
    colProps: {
      span: 12
    },
    required: true
  }
];

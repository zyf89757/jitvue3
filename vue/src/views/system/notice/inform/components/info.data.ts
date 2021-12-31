import { FormSchema } from '/@/components/Form/index';
import { LevelApi, StausApi } from '/@/api/system/notice';
import { MarkDown } from '/@/components/Markdown';
import { h } from 'vue';
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
    field: 'src',
    component: 'Input',
    label: '来源',
    colProps: {
      span: 12
    },
    required: true,
    show: true
  },
  {
    field: 'level',
    component: 'ApiSelect',
    label: '级别',
    componentProps: ({ formModel }) => {
      return {
        api: LevelApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e: String, target: any) => {
          console.log(e);
          formModel.level = target.value;
        }
      };
    },
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    colProps: {
      span: 24
    },
    required: true,
    componentProps: {
      maxLength: 27
    }
  },
  {
    field: 'content',
    component: 'Input',
    label: '内容',
    showImageUpload: true,
    rules: [{ required: true, trigger: 'blur' }],
    render: ({ model, field }) => {
      return h(MarkDown, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        }
      });
    }
  },
  {
    field: 'type',
    component: 'RadioButtonGroup',
    label: '类型',
    componentProps: {
      options: [
        {
          label: '通知',
          value: '1'
        },
        {
          label: '公告',
          value: '2'
        }
      ]
    },
    colProps: {
      span: 12
    },
    required: true
  },

  {
    field: 'InformAll',
    component: 'RadioGroup',
    defaultValue: false,
    label: '是否通知所有人',
    colProps: {
      span: 12
    },
    required: true,
    componentProps: {
      options: [
        {
          label: '是',
          value: '0'
        },
        {
          label: '否',
          value: '1'
        }
      ]
    }
  },
  {
    field: 'status',
    component: 'ApiSelect',
    label: '状态',
    componentProps: ({ formModel }) => {
      return {
        api: StausApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e: String, target: any) => {
          console.log(e);
          formModel.status = target.value;
        }
      };
    },
    colProps: {
      span: 12
    },
    show: false,
    required: false
  },
  {
    field: 'noticeUserIdList',
    component: 'ApiSelect',
    label: '通知的人',
    colProps: {
      span: 12
    },
    required: false,
    show: false
  }
];

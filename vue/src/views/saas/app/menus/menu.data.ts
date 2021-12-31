import { FormSchema } from '/@/components/Form/index';
import { appListApi, appMenuListApi } from '/@/api/saas/app/menuManage';
export const menuSchemas: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    required: true,
    defaultValue: 0,
    component: 'Input',
    show: false
  },
  {
    field: 'name',
    component: 'Input',
    label: '菜单名称',
    colProps: {
      span: 12
    },
    required: true,
    componentProps: {
      maxLength: 20
    }
  },
  {
    field: 'code',
    component: 'Input',
    label: '菜单编号',
    colProps: {
      span: 12
    },
    required: true,
    componentProps: {
      maxLength: 50
    }
  },
  {
    field: 'applicationId',
    component: 'ApiSelect',
    defaultValue: [],
    label: '所属应用',
    rules: [{ required: true }],
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: appListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e) => {
          console.log('selected:', e);
          const { updateSchema } = formActionType;
          formModel.pid = undefined;
          updateSchema({
            field: 'pid',
            componentProps: {
              api: appMenuListApi,
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
    field: 'type',
    component: 'RadioGroup',
    label: '菜单层级',
    colProps: {
      span: 12
    },
    required: true,
    defaultValue: '0',
    componentProps: ({ formModel }) => {
      return {
        options: [
          {
            label: '目录',
            value: '0'
          },
          {
            label: '菜单',
            value: '1'
          },
          {
            label: '按钮',
            value: '2'
          }
        ],
        onChange: (e: ChangeEvent) => {
          if (e.target.value == '0' || e.target.value == '1') formModel.openType = '1';
          else formModel.openType = '0';
        }
      };
    }
  },
  {
    field: 'redirect',
    component: 'Input',
    label: '重定向',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 128
    },
    show: ({ values }) => {
      return values.type == 0;
    },
    dynamicRules: ({ values }) => {
      if (values.type == '0') {
        return [
          {
            required: true,
            validator: async (rule, value) => {
              if (!value) {
                return Promise.reject('请输入重定向');
              }
            }
          }
        ];
      }
    },
    helpMessage:
      '如需打开首页加载此目录下菜单，请填写加载菜单路由，设为首页后其他设置的主页将被替代'
  },
  {
    field: 'pid',
    component: 'ApiTreeSelect',
    label: '父级菜单',
    colProps: {
      span: 12
    },
    show: ({ values }) => {
      return values.type != 0;
    },
    componentProps: ({ formModel }) => {
      return {
        api: appMenuListApi,
        params: { appId: formModel.applicationId },
        resultField: 'data',
        immediate: false
      };
    }
  },
  {
    field: 'openType',
    component: 'RadioGroup',
    label: '打开方式',
    colProps: {
      span: 12
    },
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '无',
          value: '0'
        },
        {
          label: '组件',
          value: '1'
        },
        {
          label: '内链',
          value: '2'
        },
        {
          label: '外链',
          value: '3'
        }
      ]
    },
    rules: [{ required: true }],
    dynamicDisabled: ({ values }) => {
      return values.type == 2;
    },
    helpMessage: ['按钮：无', '菜单：内链、外链、组件']
  },
  {
    field: 'helpUrl',
    component: 'Input',
    label: '帮助地址',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 128
    }
  },
  {
    field: 'levelScore',
    defaultValue: 100,
    component: 'InputNumber',
    label: '需要积分',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 3
    }
  },
  {
    field: 'divider-1',
    component: 'Divider',
    label: '',
    colProps: {
      span: 24
    }
  },
  {
    field: 'component',
    component: 'Input',
    label: '前端组件',
    colProps: {
      span: 12
    },
    required: true,
    dynamicDisabled: ({ values }) => {
      let disabled = values.type == 2;
      disabled = disabled || values.openType == 3;
      return disabled;
    },
    helpMessage: [
      '前端vue组件 views文件夹下路径，例：system/menu/index。',
      '注：目录级填写：RouteView(不带面包屑) Layout(带面包屑)，',
      '菜单级内链打开http链接填写：Iframe'
    ],
    defaultValue: 'Layout'
  },
  {
    field: 'router',
    component: 'Input',
    label: '路由地址',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 128
    },
    dynamicRules: ({ values }) => {
      if (values.type == '0') {
        return [
          {
            required: true,
            validator: async (rule, value) => {
              if (!value) {
                return Promise.reject('值不能为空');
              }
              if (value.toString()[0] != '/') {
                return Promise.reject('值需要是以"/"开始，请点击左边标签？帮助提示查看示例');
              }
              if (value.toString().split('/:')[0].match(new RegExp('[A-Z]'))) {
                return Promise.reject('值需要是小写，可以用-分割');
              }
              if (value.toString().toLowerCase() == 'null') {
                return Promise.reject('值不能为' + value);
              }
              return Promise.resolve();
            },
            trigger: 'change'
          }
        ];
      } else if (values.type == '1') {
        return [
          {
            required: true,
            validator: async (rule, value) => {
              if (!value) {
                return Promise.reject('值不能为空');
              }
              if (value.toString()[0] == '/') {
                return Promise.reject('值不能以/开始，请点击左边标签？帮助提示查看示例');
              }
              if (value.toString().split('/:')[0].match(new RegExp('[A-Z]'))) {
                return Promise.reject('值需要是小写，可以用-分割');
              }
              if (value.toString().toLowerCase() == 'null') {
                return Promise.reject('值不能为' + value);
              }
              return Promise.resolve();
            },
            trigger: 'change'
          }
        ];
      }
    },
    show: ({ values }) => {
      return values.type != 2;
    },
    helpMessage: [
      '浏览器显示的url',
      '需要全小写，以-分割，目录级别格式："/xx/aa",菜单级别：aa, aa/xx'
    ]
  },

  {
    field: 'link',
    component: 'Input',
    label: '内外链地址',
    colProps: {
      span: 12
    },
    show: ({ values }) => {
      return values.type != 2;
    },
    dynamicDisabled: ({ values }) => {
      let disabled = values.type != 2;
      disabled = disabled && values.openType < 2;
      return disabled;
    },
    helpMessage: [
      '当选择了需要内链或外链打开的选项，此处输入要打开的链接地址。',
      '例：https://www.djitd.com'
    ]
  },
  {
    field: 'icon',
    component: 'IconPicker',
    label: '图标',
    colProps: {
      span: 12
    },
    show: ({ values }) => {
      return values.type != 2;
    }
  },
  {
    field: 'permission',
    component: 'Input',
    label: '权限标识',
    colProps: {
      span: 12
    },
    show: ({ values }) => {
      return values.type == 2;
    }
  },
  {
    field: 'weight',
    component: 'RadioGroup',
    label: '权重',
    colProps: {
      span: 12
    },
    helpMessage: ['系统权重：菜单可分配给任何角色，', '业务权重：菜单对超级管理员不可见'],
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '系统权重',
          value: '0'
        },
        {
          label: '业务权重',
          value: '1'
        }
      ]
    },
    required: true
  },
  {
    field: 'visibled',
    component: 'Switch',
    label: '是否可见',
    defaultValue: true,
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'sortNum',
    defaultValue: 100,
    component: 'InputNumber',
    label: '排序',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'remark',
    component: 'Input',
    label: '备注',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 256
    }
  }
];

import { FormSchema } from '/@/components/Form/index';
// import { customerListApi, empListApi } from '/@/api/system/project';
import { Ez } from '/@/utils/devexpress';
import { h } from 'vue';

export const tenantSchemas: FormSchema[] = [
  {
    field: 'id',
    label: '记录',
    component: 'Input',
    show: false,
    colProps: {
      span: 12
    }
  },
  {
    required: true,
    field: 'code',
    label: '编码',
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      maxlength: 16
    }
  },
  {
    field: 'name',
    label: '租户名称',
    component: 'Input',
    show: true,
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'tenantAid',
    component: 'Input',
    label: '识别码',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'tenantType',
    label: '租户类型',
    component: 'ApiSelect',
    componentProps: () => {
      return {
        api: Ez.GetEnumData,
        params: { enumName: 'SystemType' },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true
      };
    },
    colProps: {
      span: 12
    },
    required: true
  },
  // S:服务商 O:货主 B:报关行
  {
    field: 'businessType',
    label: '业务类型',
    component: 'Select',
    componentProps: () => {
      return {
        options: [
          {
            label: '服务商',
            value: 'S'
          },
          {
            label: '货主',
            value: 'O'
          },
          {
            label: '报关行',
            value: 'B'
          }
        ]
      };
    },
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'levelScore',
    component: 'Input',
    defaultValue: 100,
    label: '积分',
    colProps: {
      span: 12
    },
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'expiryDate',
    component: 'DatePicker',
    label: '有效期',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'expiryDateEnabled',
    component: 'Checkbox',
    label: '启用有效期',
    colProps: {
      span: 12
    }
  },
  {
    field: 'superUserName',
    label: '超级管理员',
    component: 'Input',
    componentProps: {
      disabled: true
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'superUserId',
    label: '超级管理员iD',
    show: false,
    component: 'Input',
    componentProps: {
      disabled: true
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'enabled',
    component: 'Checkbox',
    label: '是否上线',
    colProps: {
      span: 12
    },
    componentProps: {
      disabled: true
    }
  },

  {
    field: 'logoUrl',
    component: 'Input',
    label: 'Logo地址',
    colProps: {
      span: 12
    },
    render: ({ values }) => {
      return h('img', { src: values.logoUrl });
    },
    show: ({ values }) => {
      return values.id != null && values.id != undefined;
    }
    // 组件内部自定义
    // renderComponentContent: () => {
    //   return {
    //     suffix: () => 'suffix'
    //   };
    // }
  },
  {
    field: 'enabledCustomLogo',
    component: 'Checkbox',
    label: '启用自定义logo',
    colProps: {
      span: 12
    },
    componentProps: ({ formModel }) => {
      disabled: formModel.logoUrl != '';
    },
    show: ({ values }) => {
      return values.id != null && values.id != undefined;
    }
  },
  {
    field: 'connectionString',
    component: 'InputTextArea',
    label: '数据库链接字符串',
    colProps: {
      span: 24
    },
    componentProps: {
      autoSize: {
        minRows: 3,
        maxRows: 5
      },
      disabled: true
    }
  },
  {
    field: 'remark',
    component: 'Input',
    label: '备注',
    colProps: {
      span: 24
    }
  }
];

import { FormSchema } from '/@/components/Form/index';
// 引用外部api配置的路由请求
import { typeApi, orgListApi, deptListApi } from '/@/api/system/customer';
// 导入日期
import dayjs from 'dayjs';
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
    field: 'fromOrgId',
    component: 'ApiSelect',
    label: '所属组织',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: orgListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e: String, target: any) => {
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'fromDepartmentId',
            componentProps: {
              api: deptListApi,
              params: { orgId: e },
              resultField: 'data',
              labelField: 'text',
              valueField: 'value',
              onChange: (e1: String, target: any) => {
                // formModel.fromOrgId = target.value;
                // formModel.formDepartmentId = undefined;
                // formModel.currentDepteId = target.value;
              }
            }
          });
        }
      };
    },
    colProps: {
      span: 12
    },
    required: true
  },

  {
    field: 'fromDepartmentId',
    component: 'ApiSelect',
    label: '所属部门',
    componentProps: ({ formModel }) => {
      return {
        api: deptListApi,
        params: { orgId: formModel.formOrgId },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e: String, target: any) => {
          console.log(e);
          formModel.fromDepartmentId = target.value;
        }
      };
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'divider-1',
    component: 'Divider',
    label: ''
  },
  {
    field: 'typeCode',
    component: 'ApiSelect',
    label: '企业类型',
    componentProps: ({ formModel }) => {
      return {
        api: typeApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
          formModel.typeName = target.label;
        }
      };
    },
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'typeName',
    component: 'Input',
    label: '企业类型名称',
    colProps: {
      span: 12
    },
    required: true,
    show: false
  },
  {
    field: 'code',
    component: 'Input',
    label: '企业编码',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 63
    },
    required: true
  },
  {
    field: 'sName',
    component: 'Input',
    label: '企业简称',
    colProps: {
      span: 12
    },
    required: true,
    componentProps: {
      maxLength: 27
    }
  },
  {
    field: 'fullName',
    component: 'Input',
    label: '企业全称',
    colProps: {
      span: 12
    },
    required: true,
    componentProps: {
      maxLength: 219
    }
  },
  {
    field: 'currentCustomsCode',
    component: 'Input',
    label: '海关十位编码',
    colProps: {
      span: 12
    },
    required: true,
    componentProps: {
      maxLength: 11
    }
  },
  {
    field: 'oldCustomsCode',
    component: 'Input',
    label: '海关十位编码(旧)',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 11
    }
  },
  {
    field: 'currentCustomsCiqNum',
    component: 'Input',
    label: '检验检疫编码',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 11
    },
    required: true
  },
  {
    field: 'oldCustomsCiqNum',
    component: 'Input',
    label: '检验检疫编码(旧)',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 11
    }
  },
  {
    field: 'address',
    component: 'Input',
    label: '地址',
    colProps: {
      span: 24
    },
    componentProps: {
      maxLength: 256
    }
  },
  {
    field: 'expiryDate',
    component: 'DatePicker',
    label: '有效期',
    colProps: {
      span: 12
    },
    //绑定控件数据和事件
    componentProps: ({ formModel, formActionType }) => {
      return {
        //禁用函数功能
        disabledDate: (e) => {
          return e < dayjs('2000-01-01', 'YYYY-MM-DD');
        }
      };
    },
    // 默认值
    defaultValue: new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    )
  },
  {
    field: 'expiryDateEnabled',
    component: 'Switch',
    label: '启用有效期',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'divider-1',
    component: 'Divider',
    label: ''
  },

  {
    field: 'country',
    component: 'Input',
    label: '国家',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 64
    }
  },
  {
    field: 'city',
    component: 'Input',
    label: '城市',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 3
    }
  },

  {
    field: 'industry',
    component: 'Input',
    label: '行业',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 64
    }
  },
  {
    field: 'tax',
    component: 'Input',
    label: '传真',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 24
    }
  },
  {
    field: 'enName',
    component: 'Input',
    label: '英文名称',
    colProps: {
      span: 24
    },
    componentProps: {
      maxLength: 256
    }
  },
  {
    field: 'enAddress',
    component: 'Input',
    label: '英文地址',
    colProps: {
      span: 24
    },
    componentProps: {
      maxLength: 256
    }
  },
  {
    field: 'legalPerson',
    component: 'Input',
    label: '法人代表',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 64
    }
  },
  {
    field: 'usci',
    component: 'Input',
    label: '社会信用代码',
    colProps: {
      span: 12
    },
    componentProps: {
      maxLength: 32
    }
  },
  {
    field: 'isForeignEnterprise',
    component: 'Switch',
    defaultValue: false,
    label: '是否外企',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'needQualification',
    component: 'Switch',
    defaultValue: false,
    label: '是否需要资质',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'divider-1',
    component: 'Divider',
    label: ''
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
    field: 'enabled',
    component: 'Switch',
    defaultValue: true,
    label: '启用',
    colProps: {
      span: 12
    },
    required: true
  }
];

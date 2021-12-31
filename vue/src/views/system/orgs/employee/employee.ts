import { FormSchema } from '/@/components/Form/index';
// 引用外部api配置的路由请求
import { groupListApi, orgListApi, deptListApi } from '/@/api/system/customer';

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
  },
  // {
  //   field: 'photoUrl',
  //   component: 'Input',
  //   label: '照片地址',
  //   colProps: {
  //     span: 24,
  //   },
  // },
  // {
  //   field: 'identityCard',
  //   component: 'Input',
  //   label: '身份证号',
  //   colProps: {
  //     span: 24,
  //   },
  // },
  {
    field: 'code',
    component: 'Input',
    label: '工号',
    colProps: {
      span: 24
    },
    required: true
  },

  {
    field: 'name',
    component: 'Input',
    label: '员工',
    colProps: {
      span: 12
    },
    required: true
  },
  // {
  //   field: 'pinYin',
  //   component: 'Input',
  //   label: '员工拼音',
  //   colProps: {
  //     span: 12,
  //   },
  //   required: true,
  // },
  {
    field: 'phoneNum',
    component: 'Input',
    label: '手机号',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: {
      span: 12
    }
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
        onChange: (e: String, target: any) => {
          formModel.fromGroupId = '';
          formModel.fromDptId = '';
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'fromDptId',
            componentProps: {
              api: deptListApi,
              params: { orgId: e },
              resultField: 'data',
              labelField: 'text',
              valueField: 'value',
              onChange: (e1: String, target: any) => {
                console.log(e1);
                // formModel.fromOrgId = target.value;
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
    field: 'fromDptId',
    component: 'ApiSelect',
    label: '所属部门',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: deptListApi,
        params: { orgId: formModel.fromOrgId },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e: String, target: any) => {
          formModel.fromGroupId = '';
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'fromGroupId',
            componentProps: {
              api: deptListApi,
              params: { orgId: e },
              resultField: 'data',
              labelField: 'text',
              valueField: 'value',
              onChange: (e1: String, target: any) => {
                console.log(e1);
                // formModel.fromDptId = target.value;
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
    field: 'fromGroupId',
    component: 'ApiSelect',
    label: '所属小组',
    componentProps: ({ formModel }) => {
      return {
        api: groupListApi,
        params: { deptId: formModel.fromDptId },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e: String, target: any) => {
          console.log(e);
          // formModel.fromGroupId = target.value;
        }
      };
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'expiryDate',
    label: '用户有效期',
    component: 'DatePicker',
    colProps: {
      span: 12
    }
  },
  {
    field: 'expiryDateEnabled',
    label: '是否启用',
    component: 'Switch',
    colProps: {
      span: 12
    }
  },
  {
    field: 'passwordExpiryDate',
    label: '用户密码有效期',
    component: 'DatePicker',
    colProps: {
      span: 12
    }
  },
  {
    field: 'passwordExpiryDateEnabled',
    label: '是否启用',
    component: 'Switch',
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
    field: 'receiveMessage',
    label: '是否接收通知',
    component: 'Switch',
    colProps: {
      span: 12
    }
  }
];

import { FormSchema } from '/@/components/Form/index';
// import { customerListApi, empListApi } from '/@/api/system/project';
import { Ez } from '/@/utils/devexpress';
import { h, computed, unref } from 'vue';
import { useUserStore } from '/@/store/modules/user';
const userStore = useUserStore();
const userInfo = computed(() => userStore.getUserInfo);
const isProvider = unref(userInfo).isProvider;
const tenantId = unref(userInfo).tenantId;
const tenantName = unref(userInfo).tenantName;

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
    field: 'fkTenantId',
    label: '所属租户',
    component: 'ApiSelect',
    colProps: {
      span: 12
    },
    componentProps: () => {
      return {
        api: Ez.TenantsData,
        resultField: 'data',
        labelField: 'name',
        valueField: 'id',
        immediate: true
      };
    },
    ifShow: () => {
      return isProvider;
    }
  },
  // 非服务商展示租户名
  {
    required: true,
    field: 'fkTenantName',
    label: '所属租户',
    component: 'Input',
    colProps: {
      span: 12
    },
    defaultValue: tenantName,
    componentProps: {
      disabled: true
    },
    ifShow: () => {
      return !isProvider;
    }
  },
  // 非服务商隐藏填充租户id
  {
    required: true,
    field: 'fkTenantId',
    label: '所属租户id',
    component: 'Input',
    colProps: {
      span: 12
    },
    defaultValue: tenantId,
    componentProps: () => {
      return {
        api: Ez.TenantsData,
        disabled: true,
        resultField: 'data',
        labelField: 'name',
        valueField: 'id',
        immediate: true
      };
    },
    show: false,
    ifShow: () => {
      return !isProvider;
    }
  },
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      maxlength: 16
    },
    rules: [
      {
        required: true,
        validator: async (rule, value) => {
          const regExp = /^[A-Za-z]{1}[0-9A-Za-z_.]{4,15}$/;
          if (!regExp.test(value)) {
            return Promise.reject(
              '用户名格式不正确（必须由英文、数字或者下划线、点 组成，以英文字母开头并且为5至16字符'
            );
          }
          return Promise.resolve();
        },
        trigger: 'change'
      }
    ]
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    show: true,
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'userType',
    label: '用户类型',
    component: 'ApiSelect',
    componentProps: () => {
      return {
        api: Ez.GetEnumData,
        params: { enumName: 'AdminType' },
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
  {
    field: 'phoneNum',
    component: 'Input',
    label: '手机号',
    colProps: {
      span: 12
    },
    componentProps: {
      maxlength: 11
    },
    rules: [
      {
        required: true,
        validator: async (rule, value) => {
          const regExp =
            /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
          if (!regExp.test(value)) {
            return Promise.reject('请输入正确手机号');
          }
          return Promise.resolve();
        },
        trigger: 'change'
      }
    ]
  },

  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: {
      span: 12
    },
    componentProps: {
      maxlength: 50
    },
    rules: [
      {
        required: true,
        validator: async (rule, value) => {
          if (
            !value
              ?.toString()
              .match(
                new RegExp(
                  '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$'
                )
              )
          ) {
            return Promise.reject('请输入正确邮箱');
          }
          return Promise.resolve();
        },
        trigger: 'change'
      }
    ]
  },
  {
    field: 'expiryDate',
    component: 'DatePicker',
    label: '用户有效期',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'expiryDateEnabled',
    component: 'Switch',
    label: '启用用户有效期',
    colProps: {
      span: 12
    }
  },
  {
    field: 'passwordExpiryDate',
    component: 'DatePicker',
    label: '密码有效期',
    colProps: {
      span: 12
    },
    required: true
  },
  {
    field: 'passwordExpiryDateEnabled',
    component: 'Switch',
    label: '启用密码有效期',
    colProps: {
      span: 12
    }
  },
  {
    field: 'password',
    component: 'InputPassword',
    label: '密码',
    colProps: {
      span: 12
    },
    componentProps: {
      maxlength: 16,
      minlength: 8
    },
    rules: [
      {
        required: true,
        validator: async (rule, value) => {
          value = value || '';
          let lv = 0;
          if (value.match(/[a-z]/g)) {
            lv++;
          }
          if (value.match(/[A-Z]/g)) {
            lv++;
          }
          if (value.match(/[0-9]/g)) {
            lv++;
          }
          if (value.match(/(.[^a-z0-9A-Z])/g)) {
            lv++;
          }
          if (lv > 4) {
            lv = 4;
          }

          if (lv < 2 || value.length < 8 || value.lnegth > 16) {
            return Promise.reject('密码需要是由8-16位英文（区分大小写）、数字、字符的组合');
          }
        }
      }
    ],
    ifShow: ({ values }) => {
      return values.id == null || values.id == undefined;
    }
  },
  {
    field: 'userLogoUrl',
    component: 'Input',
    label: 'Logo地址',
    colProps: {
      span: 12
    },
    render: ({ values }) => {
      return h('img', { src: values.userLogoUrl });
    },
    ifShow: ({ values }) => {
      return values.id != null && values.id != undefined;
    }
  },
  {
    field: 'enabled',
    component: 'Switch',
    label: '是否启用',
    colProps: {
      span: 24
    }
  }
];

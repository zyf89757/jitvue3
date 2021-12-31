import { FormSchema } from '/@/components/Form';
import { provincesOptions, citiesOptionsData, areasOptionsData } from './components/Address';

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '租户编码：'
  },
  {
    field: 'name',
    component: 'Input',
    label: '租户名称：'
  },
  {
    field: 'superUserName',
    component: 'Input',
    label: '当前管理员：'
  }
];

export const additionSchemas: FormSchema[] = [
  {
    field: 'fromTenantId',
    label: 'fromTenantId',
    required: true,
    defaultValue: 0,
    component: 'Input',
    show: false
  },
  {
    field: 'mainIndustryInfo',
    component: 'Select',
    label: '主要行业信息：',
    componentProps: {
      placeholder: '请选择',
      options: [
        {
          label: '汽车与化工',
          value: '1',
          key: '1'
        },
        {
          label: '电子与电器',
          value: '2',
          key: '2'
        },
        {
          label: '物流服务商',
          value: '3',
          key: '3'
        },
        {
          label: '服装行业',
          value: '4',
          key: '4'
        },
        {
          label: '其他',
          value: '5',
          key: '5'
        }
      ]
    },
    required: true,
    colProps: {
      span: 20
    }
  },
  {
    field: 'mainBusiness',
    component: 'Input',
    label: '主营业务：',
    componentProps: {
      placeholder: '请输入',
      maxLength: 128
    },
    required: true,
    colProps: {
      span: 20
    }
  },
  {
    field: 'webSite',
    component: 'Input',
    label: '网站：',
    componentProps: {
      placeholder: '例如：www.yourwebsite.com',
      maxLength: 128
    },
    required: false,
    defaultValue: '',
    colProps: {
      span: 20
    }
  },
  {
    field: 'provinceCode',
    component: 'Select',
    label: '省：',
    colProps: {
      span: 6
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        allowClear: false,
        options: provincesOptions,
        immediate: true,
        placeholder: '请选择省',
        onChange: (e: any, v: any) => {
          if (e === undefined) {
            return;
          }
          const citiesOptions = citiesOptionsData[v.id];
          formModel.cityCode = undefined;
          formModel.areaCode = undefined;
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'cityCode',
            componentProps: {
              allowClear: false,
              options: citiesOptions,
              placeholder: '请选择市',
              onChange: (a: any, b: any) => {
                if (a === undefined) {
                  return;
                }
                const areasOptions = areasOptionsData[b.id];
                formModel.areaCode = undefined;
                const { updateSchema } = formActionType;
                updateSchema({
                  field: 'areaCode',
                  componentProps: {
                    allowClear: false,
                    options: areasOptions,
                    placeholder: '请选择县(区)'
                  }
                });
              }
            }
          });
          updateSchema({
            field: 'areaCode',
            componentProps: {
              allowClear: false,
              options: [],
              placeholder: '请选择县(区)'
            }
          });
        }
      };
    },
    required: true
  },
  {
    field: 'cityCode',
    component: 'Select',
    label: '市：',
    colProps: {
      span: 6
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        allowClear: false,
        options: citiesOptionsData[formModel.provinceCode], // defalut []
        placeholder: '请选择市',
        onChange: (e: any, v: any) => {
          if (e === undefined) {
            return;
          }
          const areasOptions = areasOptionsData[v.id];
          formModel.areaCode = undefined;
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'areaCode',
            componentProps: {
              allowClear: false,
              options: areasOptions,
              placeholder: '请选择县(区)'
            }
          });
        }
      };
    },
    required: true
  },
  {
    field: 'areaCode',
    component: 'Select',
    label: '县(区)：',
    colProps: {
      span: 8
    },
    componentProps: ({ formModel }) => {
      return {
        allowClear: false,
        options: areasOptionsData[formModel.cityCode], // defalut []
        placeholder: '请选择县(区)'
      };
    },
    required: true
  },
  {
    field: 'streetAddress',
    component: 'Input',
    label: '街道地址：',
    componentProps: {
      placeholder: '请输入公司详细联系地址',
      maxLength: 32
    },
    required: false,
    defaultValue: '',
    colProps: {
      span: 20
    }
  },
  {
    field: 'contactPhone',
    component: 'Input',
    label: '联系电话：',
    required: false,
    defaultValue: '',
    colProps: {
      span: 20
    },
    componentProps: {
      maxLength: 32
    }
  },
  {
    field: 'fax',
    component: 'Input',
    label: '传真：',
    required: false,
    defaultValue: '',
    colProps: {
      span: 20
    },
    componentProps: {
      maxLength: 32
    }
  }
];

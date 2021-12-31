import { FormSchema } from '/@/components/EzControls/EzSearchForm/index';
import { customerListApi } from '/@/api/system/project';
import { defHttp } from '/@/utils/http/axios';

export const certTypeListApi = () =>
  defHttp.get(
    {
      url: '/api/certificate/get-all-cert-type'
    },
    { isTransformResponse: false }
  );

export const searchSchemas: FormSchema[] = [
  {
    field: 'customer',
    component: 'ApiSelect',
    label: '所属客户',
    rules: [{ required: true }],
    componentProps: ({ formModel }) => {
      return {
        api: customerListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e, target) => {
          console.log(e);
          formModel.fromCustomerName = target.label;
        }
      };
    },
    colProps: {
      span: 8
    },
    helpMessage: ['选择证件所属的客户']
  },
  {
    required: true,
    field: 'fromCustomerName',
    label: '所属客户名称',
    component: 'Input',
    show: false
  },
  {
    field: 'certType',
    component: 'ApiSelect',
    label: '证件类型',
    componentProps: ({ formModel }) => {
      return {
        api: certTypeListApi,
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        onChange: (e, target) => {
          console.log(e);
          formModel.certTypeName = target.label;
        }
      };
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'certTypeName',
    label: '证件类型名称',
    component: 'Input',
    show: false
  },
  {
    field: 'code',
    component: 'Input',
    label: '证件号码',
    colProps: {
      span: 8
    },
    componentProps: {
      maxLength: 64
    }
  }
];

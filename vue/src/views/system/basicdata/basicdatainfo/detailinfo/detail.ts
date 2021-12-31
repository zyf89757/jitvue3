import { FormSchema } from '/@/components/Form/index';
// 引用外部api配置的路由请求
import { typeApi } from '/@/api/system/customer';
// 引用外部api配置的路由请求
import { BasicDicAsync, HscodeAsync, HscodeDetailAsync } from '../../api/basicdata';
// 导入日期
import dayjs from 'dayjs';
// 声明表单的字段，字段和接口返回值一致
export const formSchema: FormSchema[] = [
  {
    field: 'divider-basic',
    //展示效果是分割，类别
    component: 'Divider',
    label: 'ERP信息',
    colProps: {
      span: 24
    }
  },
  {
    field: 'materialNo',
    component: 'Input',
    label: '物料号',
    colProps: {
      span: 7
    },
    required: true
  },
  {
    field: 'gType',
    component: 'ApiSelect',
    label: '物料类型',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: BasicDicAsync,
        params: {
          id: '619bc000-bb63-a3f8-0072-8df318f01263'
        },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
        }
      };
    },
    colProps: {
      span: 7
    }
  },
  {
    field: 'erpNameCn',
    component: 'Input',
    label: 'ERP中文品名',
    colProps: {
      span: 7
    },
    required: true
  },
  {
    field: 'erpNameEn',
    component: 'Input',
    label: 'ERP英文品名',
    colProps: {
      span: 7
    }
  },
  {
    field: 'model',
    component: 'Input',
    label: 'ERP规格型号',
    colProps: {
      span: 7
    }
  },
  {
    field: 'erpDeclareUnit',
    component: 'ApiSelect',
    label: 'ERP计量单位',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: BasicDicAsync,
        params: {
          id: '619bbfeb-bb63-a3f8-0072-8df02778a4b1'
        },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
        }
      };
    },
    colProps: {
      span: 7
    }
  },
  {
    field: 'scaleFactorUnitERP',
    component: 'Input',
    label: '比例因子',
    colProps: {
      span: 7
    }
  },
  {
    field: 'currency',
    component: 'ApiSelect',
    label: '币制',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: BasicDicAsync,
        params: {
          id: '619bbe7a-bb63-a3f8-0072-8d953af57930'
        },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
        }
      };
    },
    colProps: {
      span: 7
    }
  },
  {
    field: 'priceMin',
    component: 'InputNumber',
    label: '最低价格',
    colProps: {
      span: 7
    }
  },
  {
    field: 'priceMax',
    component: 'InputNumber',
    label: '最高价格',
    colProps: {
      span: 7
    }
  },

  {
    field: 'length',
    component: 'Input',
    label: '长',
    colProps: {
      span: 7
    }
  },
  {
    field: 'weidth',
    component: 'Input',
    label: '宽',
    colProps: {
      span: 7
    }
  },
  {
    field: 'height',
    component: 'Input',
    label: '高',
    colProps: {
      span: 7
    }
  },
  {
    field: 'lengthUnit',
    component: 'ApiSelect',
    label: '长度单位',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: BasicDicAsync,
        params: {
          id: '619bbbbb-5078-28d4-0011-46b06e5c5fe3'
        },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
        }
      };
    },
    colProps: {
      span: 7
    }
  },
  {
    field: 'netWeight',
    component: 'Input',
    label: '参考净重',
    colProps: {
      span: 7
    },
    required: true
  },
  {
    field: 'netWeightUnit',
    component: 'ApiSelect',
    label: '净重单位',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: BasicDicAsync,
        params: {
          id: '619bbf8d-bb63-a3f8-0072-8dd628332bca'
        },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
        }
      };
    },
    colProps: {
      span: 7
    }
  },
  {
    field: 'grossWeight',
    component: 'Input',
    label: '参考毛重',
    colProps: {
      span: 7
    }
  },
  {
    field: 'grossWeightUnit',
    component: 'ApiSelect',
    label: '毛重单位',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: BasicDicAsync,
        params: {
          id: '619bbf8d-bb63-a3f8-0072-8dd628332bca'
        },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
        }
      };
    },
    colProps: {
      span: 7
    }
  },
  {
    field: 'isActive',
    component: 'Switch',
    label: '是否有效',
    colProps: {
      span: 7
    }
  },
  {
    field: 'divider-basic',
    //展示效果是分割，类别
    component: 'Divider',
    label: '申报信息',
    colProps: {
      span: 24
    }
  },
  {
    // 数据字段
    field: 'id',
    // 展示字段
    label: 'id',
    // 可空要求
    required: false,
    // 默认值
    defaultValue: 0,
    // 表单的控件类型
    component: 'Input',
    // 是否展示
    show: false
  },
  {
    field: 'hsCode',
    label: '商品编码',
    colProps: {
      span: 7
    },
    component: 'Input',
    slot: 'remoteSearch',
    // componentProps: ({ formModel, formActionType }) => {
    //   return {
    //     api: HscodeAsync,
    //     resultField: 'data',
    //     labelField: 'text',
    //     valueField: 'value',
    //     immediate: true,
    //     showSearch: true,
    //     onChange: (e, target) => {
    //       console.log(e);
    //       const hsdata =
    //         //切换值，动态加载表单值
    //         (formModel.typeName = target.label);
    //     }
    //   };
    // },
    required: true
  },
  {
    field: 'nameCn',
    component: 'Input',
    label: '中文品名',
    colProps: {
      span: 7
    },
    required: true
  },
  {
    field: 'nameEn',
    component: 'Input',
    label: '英文品名',
    colProps: {
      span: 7
    }
  },
  {
    field: 'ciqCode',
    component: 'Input',
    label: 'CIQ编码',
    colProps: {
      span: 7
    }
  },
  {
    field: 'declareUnit',
    component: 'Input',
    label: '申报计量单位',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: BasicDicAsync,
        params: {
          id: '619bbfeb-bb63-a3f8-0072-8df02778a4b1'
        },
        resultField: 'data',
        labelField: 'text',
        valueField: 'value',
        immediate: true,
        showSearch: true,
        onChange: (e, target) => {
          console.log(e);
        }
      };
    },
    colProps: {
      span: 7
    },
    required: true
  },
  {
    field: 'declareNorm',
    component: 'InputTextArea',
    label: '申报规范',
    colProps: {
      span: 21
    }
  },
  {
    field: 'declareElement',
    component: 'InputTextArea',
    label: '申报要素',
    colProps: {
      span: 21
    },
    required: true
  },
  {
    field: 'unitlScaleName',
    component: 'Input',
    label: '法定第一单位',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'unit2ScaleName',
    component: 'Input',
    label: '法定第二单位',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'divider-basic',
    //展示效果是分割，类别
    component: 'Divider',
    label: '税则信息',
    colProps: {
      span: 24
    }
  },
  {
    field: 'jg',
    component: 'Input',
    label: '监管条件',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'sj',
    component: 'Input',
    label: '商检监管条件',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'pt',
    component: 'Input',
    label: '普通进口税率',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'zz',
    component: 'Input',
    label: '增值税率',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'zh',
    component: 'Input',
    label: '最惠国进口税率',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'ckg',
    component: 'Input',
    label: '出口关税率',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'ckt',
    component: 'Input',
    label: '出口退税率',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'zd',
    component: 'Input',
    label: '暂定进口税率',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  {
    field: 'xf',
    component: 'Input',
    label: '消费税率',
    colProps: {
      span: 7
    },
    dynamicDisabled: true
  },
  // {
  //   field: 'expiryDate',
  //   component: 'DatePicker',
  //   label: '有效期',
  //   colProps: {
  //     span: 7
  //   },
  //   //绑定控件数据和事件
  //   componentProps: ({ formModel, formActionType }) => {
  //     return {
  //       //禁用函数功能
  //       disabledDate: (e) => {
  //         return e < dayjs('2000-01-01', 'YYYY-MM-DD');
  //       }
  //     };
  //   },
  //   // 默认值
  //   defaultValue: new Date(
  //     new Date().getFullYear() + 99,
  //     new Date().getMonth(),
  //     new Date().getDate()
  //   )
  // },
  // {
  //   field: 'expiryDateEnabled',
  //   component: 'Switch',
  //   label: '启用有效期',
  //   colProps: {
  //     span: 7
  //   },
  //   required: true
  // },
  {
    field: 'enabled',
    component: 'Switch',
    defaultValue: true,
    label: '启用',
    colProps: {
      span: 7
    },
    required: true
  }
];

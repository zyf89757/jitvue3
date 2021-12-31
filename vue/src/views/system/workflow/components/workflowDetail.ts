import { DescItem } from '/@/components/Description/index';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { Button } from '/@/components/Button';
import { FormSchema } from '/@/components/Form/index';

import { Badge } from 'ant-design-vue';
import { text } from 'stream/consumers';
export const refundSchema: DescItem[] = [
  {
    field: 'flowName',
    label: '流程名称'
  },
  {
    field: 'completeCondition',
    label: '审批状态'
    // render: ({ record }) => {
    //   console.log(record);
    //   return 'ceszt';
    // }
  },
  {
    field: 'businessCode',
    label: '业务编号'
  },
  {
    field: 'stepName',
    label: '当前步骤'
  },
  {
    field: 'cbyName',
    label: '申请人'
  },
  {
    field: 'cbyTime',
    label: '申请时间'
  }
];

export const refundTimeTableSchema: BasicColumn[] = [
  {
    title: '步骤名称',
    width: 150,
    dataIndex: 'stepName'
  },
  {
    title: '审批状态',
    width: 150,
    dataIndex: 'approveCondition'
    // customRender: ({ record }) => {
    //   console.log(record);
    //   return '测试值';
    // }approveComment
  },
  {
    title: '审批意见',
    width: 150,
    dataIndex: 'approveComment'
    // customRender: ({ record }) => {
    //   console.log(record);
    //   return '测试值';
    // }approveComment
  },
  {
    title: '是否通知',
    width: 150,
    dataIndex: 'isNoticeName'
  },
  {
    title: '审批人',
    width: 150,
    dataIndex: 'receiveName'
  },
  {
    title: '审批时间',
    width: 150,
    dataIndex: 'lbyTime'
  }
];

export const formSchema: FormSchema[] = [
  {
    field: 'stepId',
    label: 'stepId',
    component: 'Input',
    show: false
  },
  {
    field: 'workFlowID',
    label: 'workFlowID',
    component: 'Input',
    show: false
  },
  {
    field: 'approveComment',
    label: '审批意见',
    component: 'InputTextArea',
    required: true,
    colProps: {
      span: 24
    }
  }
];

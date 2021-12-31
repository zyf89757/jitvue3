export interface ButtonProps {
  name: string;
  title: string;
  type?: any;
  click: any;
  color?: string;
  loading?: Boolean;
  enabled?: Boolean | Function | Array<any>;
  disabled?: Boolean | Function | Array<any>;
  visibled?: Boolean | Function | Array<any>;
  tag?: string; //按钮预留标签,
  auth: string;
  props?: any;
  accept?: Array<any>;
}

export interface TabListType {
  key: string;
  title: string;
  component: any;
  disabled?: boolean | Function;
  props?: any;
}

export interface ImportParams {
  // 文件
  file: File | Blob;
  // 主键
  [key: string]: any;
}

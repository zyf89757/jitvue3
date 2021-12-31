export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // post请求的时候添加参数到url
  joinParamsToUrl?: boolean;
  // 格式化提交参数时间
  formatDate?: boolean;
  // 需要对返回数据进行处理
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean;
  // 默认将prefix 添加到url,默认true
  joinPrefix?: boolean;
  // 接口地址
  apiUrl?: string;
  // 消息提示类型
  errorMessageMode?: ErrorMessageMode;
  //  是否加入时间戳
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // 请求头是否加入token
  withToken?: boolean;
  //是否弹窗显示接口结果
  isPopupMsg?: boolean;
  // 是否以toast展示结果
  isToastMsg?: boolean;
}

export interface Result<T = any> {
  code?: number;
  type?: 'success' | 'error' | 'warning';
  message?: string;
  result: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

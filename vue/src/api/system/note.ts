import { defHttp } from '/@/utils/http/axios';

export function sysnoadd(parameter) {
  return defHttp.post({ url: `/api/message/send/`, params: parameter }, { isToastMsg: true });
}

//返回模板列表
export const templateApi = () =>
  defHttp.get(
    {
      url: '/api/message/templatetype'
    },
    { isTransformResponse: false }
  );
//返回类型所有标题
export const titleApi = (e: any) => {
  return defHttp.get(
    {
      url: '/api/message/templatetype/values'
    },
    { isTransformResponse: false }
  );
};
//获取标题下的应用分类
export const applyApi = (e: any) => {
  return defHttp.get(
    {
      url: '/api/message/templatetype/apply'
    },
    { isTransformResponse: false }
  );
};

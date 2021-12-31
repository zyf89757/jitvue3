import { defHttp } from '/@/utils/http/axios';

export function sysnoticeadd(parameter) {
  return defHttp.post({ url: `/api/notice/add/`, params: parameter }, { isToastMsg: true });
}

export function sysnoticeedit(parameter) {
  return defHttp.post({ url: '/api/notice/edit/', params: parameter }, { isToastMsg: true });
}
//返回级别列表
export const LevelApi = () =>
  defHttp.get(
    {
      url: '/api/notice/level'
    },
    { isTransformResponse: false }
  );
//返回类型列表
export const typeApi = () =>
  defHttp.get(
    {
      url: '/api/notice/type'
    },
    { isTransformResponse: false }
  );
//返回状态列表
export const StausApi = () =>
  defHttp.get(
    {
      url: '/api/notice/staus'
    },
    { isTransformResponse: false }
  );
//返回员工列表
export const EmpoleApi = () =>
  defHttp.get(
    {
      url: '/api/tenant/user/KeyValues'
    },
    { isTransformResponse: false }
  );

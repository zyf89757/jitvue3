import { defHttp } from '/@/utils/http/axios';

/**
 * 增加菜单
 * @param {*} parameter
 * @returns
 */
export function sysMenuAdd(parameter) {
  return defHttp.post({ url: '/api/menu/create', params: parameter }, { isToastMsg: true });
}

export function sysMenuUpdate(parameter, id) {
  return defHttp.post({ url: '/api/menu/update/' + id, params: parameter }, { isToastMsg: true });
}
/**
 * 返回应用列表
 * @returns 返回应用列表
 */
export const appListApi = () =>
  defHttp.get(
    {
      url: '/api/menu/get-applications'
    },
    { isTransformResponse: false }
  );

/**
 * 返回应用列表
 * @returns 返回应用列表
 */

export const appMenuListApi = (e) => {
  const _appId = e.appId ? e.appId : '';
  console.log('_appId:' + _appId);
  return defHttp.get(
    {
      url: '/api/menu/get-menus?Key=' + _appId
    },
    { isTransformResponse: false }
  );
};

/**
 * 返回应用列表
 * @returns 返回应用列表
 */

export const appMenuList = (e) => {
  const _appId = e.appId ? e.appId : '';
  console.log('_appId:' + _appId);
  return defHttp.get(
    {
      url: '/api/menu/get-app-menus?Key=' + _appId
    },
    { isTransformResponse: false }
  );
};

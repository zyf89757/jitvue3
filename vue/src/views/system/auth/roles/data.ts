import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetMenuList = '/api/role/get-menus',
  GetRoleMenus = '/api/role/permission/menus/',
  SaveMenu = '/api/role/permission/menu-save',
  RemoveMenu = '/api/role/permission/menu-remove'
}

// 获取所有菜单
export const getMenuList = () => {
  return defHttp.get({ url: Api.GetMenuList });
};

// 获取所有授权的菜单
export function getRoleMenus(parameter) {
  return defHttp.get({ url: Api.GetRoleMenus + parameter });
}

// 新增定时任务
export function saveMenu(parameter) {
  return defHttp.post({ url: Api.SaveMenu, params: parameter }, { isToastMsg: true });
}

// 新增定时任务
export function removeMenu(parameter) {
  return defHttp.post({ url: Api.RemoveMenu, params: parameter }, { isToastMsg: true });
}

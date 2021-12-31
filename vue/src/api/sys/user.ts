import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/api/auth/get-login-user',
  GetPermCode = '/getPermCode',
  ChangeSys = '/api/auth/change/current/application',
  ChangeDept = '/api/auth/change/current/department',
  ChangeGroup = '/api/auth/change/current/group',
  ChangeTask = '/api/auth/change/current/task'
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params
    },
    {
      errorMessageMode: mode
    }
  );
}
/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}
// 切换系统应用
export function changeSys(key) {
  return defHttp.post(
    { url: Api.ChangeSys, params: { key } },
    {
      errorMessageMode: 'none'
    }
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

//切换部门
export function ChangeDept(key) {
  return defHttp.post(
    { url: Api.ChangeDept, params: { key } },
    {
      errorMessageMode: 'none'
    }
  );
}

// 切换组
export function ChangeGroup(key) {
  return defHttp.post(
    { url: Api.ChangeGroup, params: { key } },
    {
      errorMessageMode: 'none'
    }
  );
}

//切换任务
export function ChangeTask(key) {
  return defHttp.post(
    { url: Api.ChangeTask, params: { key } },
    {
      errorMessageMode: 'none'
    }
  );
}

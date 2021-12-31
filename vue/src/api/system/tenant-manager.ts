//租户管理
import { defHttp } from '/@/utils/http/axios';

enum Api {
  CREATE_TENANT = '/api/tenant/create',
  UPDATE_TENANT = '/api/tenant/update/',
  UPDATE_TENANT_CONNECT = '/api/tenant/connection/update',
  UPDATE_TENANT_SCORE = '/api/tenant/score/update',
  UPDATE_TENANT_ADMIN = '/api/tenant/super/update',
  GET_TENANT_USERS = '/api/tenant/user/list',
  UPDATE_TENANT_ENABLED = '/api/tenant/enable',
  UPDATE_TENANT_DISABLE = '/api/tenant/disable'
}

// 新增租户
export function createTenant(parameter) {
  return defHttp.post({ url: Api.CREATE_TENANT, params: parameter }, { isToastMsg: true });
}

// 修改租户
export function updateTenant(parameter, id) {
  return defHttp.post({ url: Api.UPDATE_TENANT + id, params: parameter }, { isToastMsg: true });
}

// 修改租户数据库链接
export function updateTenantConnect(parameter) {
  return defHttp.post({ url: Api.UPDATE_TENANT_CONNECT, parameter }, { isTransformResponse: true });
}

// 修改租户积分
export function updateTenantScore(parameter) {
  return defHttp.post(
    { url: Api.UPDATE_TENANT_SCORE, params: parameter },
    { isTransformResponse: true }
  );
}

//重置管理员
export function updateTenantAdmin(parameter) {
  return defHttp.post(
    { url: Api.UPDATE_TENANT_ADMIN, params: parameter },
    { isTransformResponse: false, joinParamsToUrl: true }
  );
}

// 获取租户下成员
export function getTenantUser(key: string) {
  // debugger;
  return defHttp.get(
    { url: Api.GET_TENANT_USERS + '?tenantId=' + key },
    { isTransformResponse: false }
  );
}

//启用租户
export function enabledTenant(parameter) {
  return defHttp.post({ url: Api.UPDATE_TENANT_ENABLED, params: parameter }, { isToastMsg: true });
}

// 禁用租户
export function disableTenant(parameter) {
  return defHttp.post({ url: Api.UPDATE_TENANT_DISABLE, params: parameter }, { isToastMsg: true });
}

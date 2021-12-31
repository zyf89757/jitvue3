//租户管理
import { defHttp } from '/@/utils/http/axios';

enum Api {
  CREATE_TENANT_USER = '/api/tenant/user/create',
  UPDATE_TENANT_USER = '/api/tenant/user/update/',
  UPDATE_EMPLOYEE_ENABLED = '/api/tenant/user/bind/enable',
  UPDATE_EMPLOYEE_DISABLE = '/api/tenant/user/bind/disable'
}

// 新增租户用户
export function createTenantUser(parameter) {
  return defHttp.post({ url: Api.CREATE_TENANT_USER, params: parameter }, { isToastMsg: true });
}

// 修改租户用户
export function updateTenantUser(parameter, id) {
  return defHttp.post(
    { url: Api.UPDATE_TENANT_USER + id, params: parameter },
    { isToastMsg: true }
  );
}

//启用用户绑定的员工
export function enabledBinddEmployee(parameter) {
  return defHttp.post(
    { url: Api.UPDATE_EMPLOYEE_ENABLED, params: parameter },
    { isToastMsg: true }
  );
}

// 禁用用户绑定的员工
export function disabledBindEmployee(parameter) {
  return defHttp.post(
    { url: Api.UPDATE_EMPLOYEE_DISABLE, params: parameter },
    { isToastMsg: true }
  );
}

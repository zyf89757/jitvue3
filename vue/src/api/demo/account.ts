import { defHttp } from '/@/utils/http/axios';

//获取机构补充信息
export function getSysAddition(parameter) {
  return defHttp.get(
    { url: '/api/tenantaddition/find?tenantId=' + parameter },
    { isTransformResponse: false }
  );
}

//新增机构补充信息
export function sysAdditionAdd(parameter) {
  return defHttp.post(
    { url: '/api/tenantaddition/create', params: parameter },
    { isTransformResponse: false }
  );
}

//修改机构补充信息
export function sysAdditionUpdate(parameter) {
  return defHttp.post(
    { url: '/api/tenantaddition/update/', params: parameter },
    { isTransformResponse: false }
  );
}

//获取机构信息
export function getSysTenant(parameter) {
  return defHttp.get({ url: '/api/tenant/detail/' + parameter }, { isTransformResponse: false });
}

//获取机构log
export function changeTenantLogo(parameter) {
  return defHttp.post(
    { url: '/api/tenantaddition/update-tenant-logo', params: parameter },
    { isTransformResponse: false }
  );
}

//重置管理员
export function updateAdmin(parameter) {
  return defHttp.post(
    { url: '/api/tenantaddition/update-admin', params: parameter },
    { isTransformResponse: false }
  );
}

//获取管理员下拉框数据
export const getCurrentUser = () =>
  defHttp.get(
    {
      url: '/api/tenant/user/get-current-user'
    },
    { isTransformResponse: false }
  );

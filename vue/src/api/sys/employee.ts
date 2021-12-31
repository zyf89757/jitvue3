import { defHttp } from '/@/utils/http/axios';

/**
 * 增加
 * @param {*} parameter
 * @returns
 */
export function sysEmployeeAdd(parameter) {
  return defHttp.post({ url: '/api/employee/create', params: parameter }, { isToastMsg: true });
}

export function sysEmployeeUpdate(parameter) {
  return defHttp.post({ url: `/api/employee/update/`, params: parameter }, { isToastMsg: true });
}
/**
 * 返回客户列表
 * @returns 返回客户列表
 */
export const customerListApi = () =>
  defHttp.get(
    {
      url: '/api/orgs/customer/get-all-customer'
    },
    { isTransformResponse: false }
  );

/**
 * 返回员工列表
 * @returns 返回员工列表
 */
export const empListApi = () =>
  defHttp.get(
    {
      url: '/api/orgs/customer/get-all-customer'
    },
    { isTransformResponse: false }
  );

/**
 * 增加
 * @param {*} parameter
 * @returns
 */
export function sysTaskAdd(parameter) {
  return defHttp.post({ url: `/api/task/create/`, params: parameter }, { isToastMsg: true });
}

export function sysTaskUpdate(parameter) {
  return defHttp.post(
    { url: `/api/task/update/${parameter.id}`, params: parameter },
    { isToastMsg: true }
  );
}
/**
 * 返回客户列表
 * @returns 返回客户列表
 */
export const projectListApi = (e: any) => {
  const _customerId = e.customerId || '';
  return defHttp.get(
    {
      url: `/api/project/customer/projects?Key=` + _customerId
    },
    { isTransformResponse: false }
  );
};

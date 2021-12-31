import { defHttp } from '/@/utils/http/axios';
import { UploadApiResult } from '/@/api/sys/model/uploadModel';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
/**
 * 返回客户类型
 * @returns 返回客户类型
 */
export const typeApi = () =>
  defHttp.get(
    {
      url: '/api/orgs/customer/get-all-type'
    },
    { isTransformResponse: false }
  );

/**
 * 返回客户列表
 * @returns 返回客户列表
 */
export const orgListApi = () =>
  defHttp.get(
    {
      url: '/api/org/manager/current/orgs'
    },
    { isTransformResponse: false }
  );
/**
 * 返回客户列表
 * @returns 返回客户列表
 */
export const deptListApi = (e: any) => {
  const _orgId = e.orgId || '';
  return defHttp.get(
    {
      url: `/api/department/get-all-department-by-orgkey?fromOrgId=` + _orgId
    },
    { isTransformResponse: false }
  );
};

/**
 * 返回客户列表
 * @returns 返回客户列表
 */
export const groupListApi = (e: any) => {
  const _deptId = e.deptId || '';
  return defHttp.get(
    {
      url: `/api/group/get-all-group-by-dptkey?Key=` + _deptId
    },
    { isTransformResponse: false }
  );
};

/**
 * 增加
 * @param {*} parameter
 * @returns
 */
export function sysCustomerAdd(parameter) {
  return defHttp.post(
    { url: `/api/orgs/customer/create/`, params: parameter },
    { isToastMsg: true }
  );
}

export function sysCustomerUpdate(parameter) {
  return defHttp.post(
    { url: `/api/orgs/customer/update/${parameter.id}`, params: parameter },
    { isToastMsg: true }
  );
}

const { uploadUrl = `/api/service/file/upload/avatar` } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress
    },
    params
  );
}

/**
 * 返回树列表
 * @returns 返回树列表
 */
export const allOrgListApi = () =>
  defHttp.get(
    {
      url: '/api/org/manager/current/allorgs'
    },
    { isTransformResponse: false }
  );

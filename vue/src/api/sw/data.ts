import { defHttp } from '/@/utils/http/axios';

/**
 * 返回海关参数
 * @returns 返回海关参数
 */
export const appCustomsApi = ({ cType, parameters }) =>
  defHttp.get(
    {
      url: '/api/parameter/customs/' + cType,
      params: parameters
    },
    { isTransformResponse: false }
  );

/**
 * 返回账册参数
 * @returns 返回账册参数
 */
export const appNemsApi = ({ cType, parameters }) =>
  defHttp.get(
    {
      url: '/api/parameter/nems/' + cType,
      params: parameters
    },
    { isTransformResponse: false }
  );

/**
 * 返回手册参数
 * @returns 返回手册参数
 */
export const appNptsApi = ({ cType, parameters }) =>
  defHttp.get(
    {
      url: '/api/parameter/npts/' + cType,
      params: parameters
    },
    { isTransformResponse: false }
  );

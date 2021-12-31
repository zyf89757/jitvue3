import { defHttp } from '/@/utils/http/axios';

/**
 * 新增
 * @param {*} parameter
 * @returns 新增结果
 */
export function missReasonInsert(parameter) {
  return defHttp.post({ url: '/api/miss-reason/insert', params: parameter }, { isToastMsg: true });
}

/**
 * 修改
 * @param {*} parameter
 * @returns 修改结果
 */
export function missReasonUpdate(parameter) {
  return defHttp.post({ url: `/api/miss-reason/insert`, params: parameter }, { isToastMsg: true });
}

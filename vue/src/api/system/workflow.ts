import { defHttp } from '/@/utils/http/axios';

/**
 * 增加
 * @param {*} parameter
 * @returns
 */
export function Add(parameter) {
  return defHttp.post({ url: `/api/flow/add/`, params: parameter }, { isTransformResponse: false });
}
// 更新
export function Update(parameter) {
  return defHttp.post(
    { url: `api/flow/update?key=${parameter.id}`, params: parameter },
    { isTransformResponse: false }
  );
}
// 用户角色
export function flowRoleAsync() {
  return defHttp.get({ url: `api/rolebase/get-all-role` }, { isTransformResponse: false });
}
// 流程字典
export function flowdicAsync() {
  return defHttp.get({ url: `api/flow/get-all-flow` }, { isTransformResponse: false });
}
// 步骤字典
export function stepdicAsync(parameter) {
  return defHttp.get(
    { url: `api/flowstep/get-all-step/${parameter.id}/${parameter.stepid}` },
    { isTransformResponse: false }
  );
}
// 步骤审批方式字典
export function methoddicAsync() {
  return defHttp.get({ url: `api/flowstep/get-all-method` }, { isTransformResponse: false });
}

/**
 * 增加步骤
 * @param {*} parameter
 * @returns
 */
export function AddStep(parameter) {
  return defHttp.post(
    { url: `/api/flowstep/add/`, params: parameter },
    { isTransformResponse: false }
  );
}
// 更新步骤
export function UpdateStep(parameter) {
  return defHttp.post(
    { url: `api/flowstep/update?key=${parameter.id}`, params: parameter },
    { isTransformResponse: false }
  );
}

/**
 *执行流程
 * @param {*} parameter
 * @returns
 */
export function ExcuteFlow(parameter) {
  return defHttp.post(
    { url: `/api/workflow/excuteflow/`, params: parameter },
    { isTransformResponse: false }
  );
}

/**
 *驳回流程
 * @param {*} parameter
 * @returns
 */
export function RejectFlow(parameter) {
  return defHttp.post(
    { url: `/api/workflow/rejectflow/`, params: parameter },
    { isTransformResponse: false }
  );
}

/**
 *发起流程
 * @param {*} parameter
 * @returns
 */
export function StartFlow(parameter) {
  return defHttp.post(
    { url: `/api/workflow/startflow/`, params: parameter },
    { isTransformResponse: false }
  );
}

/**
 *获得工作流
 * @param {*} parameter
 * @returns
 */
export function GetWorkFlow(parameter) {
  return defHttp.get(
    { url: `/api/workflow/getbyid?Key=${parameter.id}` },
    { isTransformResponse: false }
  );
}

/**
 *获得工作流
 * @param {*} parameter
 * @returns
 */
export function GetWorkFlowFirst(parameter) {
  return defHttp.get(
    { url: `/api/workflow/list-first?flowid=${parameter.id}` },
    { isTransformResponse: false }
  );
}

/**
 *获得工作流审批步骤
 * @param {*} parameter
 * @returns
 */
export function GetFlowStep(parameter) {
  return defHttp.get(
    { url: `/api/workflowstep/get-steps?workflowid=${parameter.id}` },
    { isTransformResponse: false }
  );
}

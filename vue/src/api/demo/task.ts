import { defHttp } from '/@/utils/http/axios';

enum Api {
  START_TIMER_JOB = '/api/timer/start-timer-job',
  STOP_TIMER_JOB = '/api/timer/stop-timer-job',
  CREATE_TIMER_TASK = '/api/timer/create',
  UPDATE_TIMER_TASK = '/api/timer/update/'
}

//定时任务启动
/**
 * @description: Get sample options value
 */
export function startTimerJob() {
  return defHttp.get({ url: Api.START_TIMER_JOB });
}

// 定时任务暂停任务
export function stopTimerJob() {
  return defHttp.get({ url: Api.STOP_TIMER_JOB });
}

// 新增定时任务
export function createTimerTask(parameter) {
  return defHttp.post({ url: Api.CREATE_TIMER_TASK, params: parameter }, { isToastMsg: true });
}
// 修改定时任务
export function updateTimerTask(parameter, id) {
  return defHttp.post({ url: Api.UPDATE_TIMER_TASK + id, params: parameter }, { isToastMsg: true });
}

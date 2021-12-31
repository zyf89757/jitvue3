import { defHttp } from '/@/utils/http/axios';

/**
 *
 * 系统属性监控
 *
 */
export function sysMachineUse(parameter) {
  return defHttp.get({
    url: '/api/machine/get-use-info',
    params: parameter
  });
}

export function sysMachineBase(parameter) {
  return defHttp.get({
    url: '/api/machine/get-base-info',
    params: parameter
  });
}

export function sysMachineNetwork(parameter) {
  return defHttp.get({
    url: '/api/machine/get-network-info',
    params: parameter
  });
}

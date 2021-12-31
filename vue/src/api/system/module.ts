import { defHttp } from '/@/utils/http/axios';

/**
 * 返回子模板列表
 * @returns 返回子模板列表
 */
export const moductListGroupApi = () =>
  defHttp.get(
    {
      url: '/api/module/group/KeyValues'
    },
    { isTransformResponse: false }
  );
/**
 * 获取所有模型名称
 * @returns 返回所有模型
 */
export const sysModuceGroupApi = () =>
  defHttp.get(
    {
      url: '/api/system/module/KeyValues'
    },
    { isTransformResponse: false }
  );

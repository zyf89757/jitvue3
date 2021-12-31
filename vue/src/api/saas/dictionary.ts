import { defHttp } from '/@/utils/http/axios';
/**
 *
 * 返回字典类型列表
 * @returns 返回字典类型列表
 */
export const dictionaryTypeApi = () =>
  defHttp.get(
    {
      url: '/api/DictType/KeyValues'
    },
    { isTransformResponse: false }
  );

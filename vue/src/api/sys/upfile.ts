import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
const { uploadUrl = '' } = useGlobSetting();
const values = sessionStorage.getItem('groupkey');

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl + '/api/Excel/UploadExcel/key?key=' + values,
      onUploadProgress
    },
    params
  );
}
/**
 
 * @returns 返回映射关系组列表
 */
export const empMappingGroupApi = () =>
  defHttp.get(
    {
      url: '/api/MappingGroup/KeyValues'
    },
    { isTransformResponse: false }
  );

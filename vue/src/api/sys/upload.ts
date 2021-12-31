import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl + '/api/service/file/upload/avatar',
      onUploadProgress
    },
    params
  );
}
// 上传证件
export async function uploadAttachment(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  const e = await defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl + '/api/service/file/upload',
      onUploadProgress
    },
    params
  );

  if (e.data.success) {
    const data = e.data.data;
    const certificateId = params.data?.certificateId;
    await defHttp.post(
      { url: `/api/certificate/attachment-insert`, params: { certificateId, fileId: data } },
      { isToastMsg: true }
    );
  }
  return e;
}

// 上传文件类型附件
export async function BasicTypeAttachmentAsync(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  debugger;
  console.log(params);
  const e = await defHttp.uploadFile<UploadApiResult>(
    {
      url:
        uploadUrl +
        `/api/service/file/upload/typeattachment/${params.data?.basicdataid}/${params.data?.type}`,
      onUploadProgress
    },
    params
  );

  if (e.data.success) {
    const data = e.data.data;
    const id = params.data?.id;
    debugger;
  }
  return e;
}

// 上传资料库图片
export async function BasicPictureUploadAsync(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  debugger;
  console.log(params);
  const e = await defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl + `/api/service/file/upload/basicpicture/${params.data?.data.basicdataid}`,
      onUploadProgress
    },
    params
  );

  if (e.data.success) {
    const data = e.data.data;
    const id = params.data?.id;
    debugger;
  }
  return e;
}

// 上传资料库附件
export async function BasicAttachmentAsync(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  console.log(params);
  const e = await defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl + `/api/service/file/upload/basicattachment/${params.data?.data.basicdataid}`,
      onUploadProgress
    },
    params
  );

  if (e.data.success) {
    const data = e.data.data;
    const id = params.data?.id;
    debugger;
  }
  return e;
}

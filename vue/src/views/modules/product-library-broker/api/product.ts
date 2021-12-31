import { UploadApiResult } from '/@/api/sys/model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { ImportParams } from '/@/api/interface/common';

const { uploadUrl = '' } = useGlobSetting();

//获取产品资料信息
export function getProductsAddition(parameter) {
  return defHttp.get(
    { url: '/api/product/find?ProductId=' + parameter },
    { isTransformResponse: false }
  );
}

//修改产品资料信息
export function productsUpdate(productId, parameter) {
  return defHttp.post(
    { url: '/api/product/update/' + productId, params: parameter },
    { isTransformResponse: false }
  );
}

//新增产品资料信息
export function AdditionProducts(parameter) {
  return defHttp.post(
    { url: '/api/product/create', params: parameter },
    { isTransformResponse: false }
  );
}
// 上传产品附件
export async function uploadAttachmentProduct(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  console.log(params);
  const e = await defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl + '/api/service/file/upload',
      onUploadProgress
    },
    params
  );

  if (e.data.success) {
    const data = e.data.data;
    const productId = params.data?.productId;
    await defHttp.post(
      { url: `/api/product/attachment-insert`, params: { productId, fileId: data } },
      { isToastMsg: true }
    );
  }
  return e;
}

//
export async function importDicts(
  params: ImportParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  console.log(params);
  const e: any = await defHttp.uploadFile(
    {
      url: uploadUrl + '/api/product/import',
      onUploadProgress
    },
    params
  );
  console.log(e.data);
  console.log(params.data);

  return e;
}

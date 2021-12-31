import { defHttp } from '/@/utils/http/axios';
import { Ez } from '/@/utils/devexpress';
import { object } from 'vue-types';
import { ref } from 'vue';
import { json } from 'stream/consumers';
import { stubFalse } from 'lodash-es';
/**
 * 增加
 * @param {*} parameter
 * @returns
 */
export function sysBasicAdd(parameter) {
  return defHttp.post(
    { url: `/api/basicdata/data/add/`, params: parameter },
    { isTransformResponse: false }
  );
}
// 更新
export function sysBasicUpdate(parameter) {
  return defHttp.post(
    { url: `api/basicdata/data/update/${parameter.id}`, params: parameter },
    { isToastMsg: true }
  );
}
// 初审
export function BasicApproveAsync(parameter) {
  return defHttp.post(
    { url: `api/basicdata/data/approve?Key=${parameter.id}` },
    { isToastMsg: true }
  );
}
// 复审
export function BasicSecApproveAsync(parameter) {
  return defHttp.post(
    { url: `api/basicdata/data/sec_approve?Key=${parameter.id}` },
    { isToastMsg: true }
  );
}
// 驳回
export function BasicRejectAsync(parameter) {
  return defHttp.post(
    { url: `api/basicdata/data/reject?Key=${parameter.id}` },
    { isToastMsg: true }
  );
}
// 删除附件
export function BasicFileDeleteAsync(parameter) {
  return defHttp.post({ url: `api/service/file/delete?Key=${parameter.id}` }, { isToastMsg: true });
}

// 资料库图片
export function BasicPictureAsync(parameter) {
  return defHttp.get(
    { url: `api/service/file/piclist?businessid=${parameter.id}&code=BasicPicture` },
    { isTransformResponse: false }
  );
}
// 资料库图片上传
export function BasicPictureUploadAsync(id) {
  return defHttp.post(
    { url: `api/service/file/upload/basicpicture/${id}&code=BasicAttachment` },
    { isTransformResponse: false }
  );
}

// 资料库附件
export function BasicAttachmentAsync(parameter) {
  return defHttp.get(
    { url: `api/basicdata/data/attachments?Key=${parameter.id}` },
    { isTransformResponse: false }
  );
}

// 资料库附件上传
export function BasicAttachmentUploadAsync(id) {
  return defHttp.post(
    { url: `api/service/file/upload/basicattachment/${id}` },
    { isTransformResponse: false }
  );
}

// 资料库字典
export function BasicDicAsync(parameter) {
  return defHttp.get(
    { url: `api/Dictdata/KeyValues?FromTypeId=${parameter.id}` },
    { isTransformResponse: false }
  );
}

// hscode字典
export function HscodeAsync(parameter) {
  return defHttp.get(
    { url: `api/Dictdata/KeyValues?FromTypeId=${parameter.id}` },
    { isTransformResponse: false }
  );
}

// 返回物料详情
export const customerApis = (id) =>
  defHttp.get(
    {
      url: 'api/basicdata/data/getentity?key=' + id
    },
    { isTransformResponse: false }
  );

export async function options(params?: selectParams) {
  const data = await defHttp.get(
    {
      url: `/odata/SWServerDatas/Data.GetHsCode_Records(buss_type='GoodsElem')?$filter=contains(hscode,'${params.keyword}')`
    },
    { apiUrl: Ez.GlobSetting().hsCodeUrl, isTransformResponse: false }
  );
  const result = {
    list: [] as any[]
  };
  data.value.forEach((element, index) => {
    result.list.push({
      hscode: `${element.hscode}`
    });
  });
  return result;
}

export async function optionsList(params) {
  const data = await defHttp.get(
    {
      url: `/odata/SWServerDatas/Data.GetHsCode_Records(buss_type='GoodsElem')?$filter=contains(hscode,'${params.data}')`
    },
    { apiUrl: Ez.GlobSetting().hsCodeUrl, isTransformResponse: false }
  );
  const result = {
    list: [] as any[]
  };
  debugger;
  data.value.forEach((element, index) => {
    const hscodejson = JSON.parse(element.hscode_json);
    hscodejson.rows.forEach((hselement) => {
      result.list.push(hselement);
    });
  });
  return result.list;
}

// hscodedetail
export async function HscodeDetailAsync(parameter) {
  const data = await defHttp.get(
    {
      url: `/odata/SWServerDatas/Data.GetHsCode_Records(buss_type='MerchElement')?$filter=contains(hscode,'${parameter.hscode}')`
    },
    { apiUrl: Ez.GlobSetting().hsCodeUrl, isTransformResponse: false }
  );
  const result = {
    list: [] as any[]
  };
  debugger;
  data.value.forEach((element, index) => {
    if (index == 0) {
      const hscodejson = JSON.parse(element.hscode_json);
      hscodejson.forEach((hselement) => {
        result.list.push(hselement);
      });
    }
  });
  return result.list;
}

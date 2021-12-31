import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetDocs = 'api/decl/data/docs/download'
}

export function getHtmlData(parameter) {
  return defHttp.get({
    url: Api.GetDocs,
    timeout: 100 * 1000,
    params: parameter
  });
}

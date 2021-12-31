import { defHttp } from '/@/utils/http/axios';

export function sysEmailTemplateadd(parameter) {
  return defHttp.post(
    { url: `/api/email/template/create`, params: parameter },
    { isToastMsg: true }
  );
}

export function sysEmailTemplateedit(parameter) {
  return defHttp.post(
    { url: `/api/email/template/update/${parameter.id}`, params: parameter },
    { isToastMsg: true }
  );
}

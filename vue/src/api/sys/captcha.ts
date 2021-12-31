/**
 * 此处可直接引用自己项目封装好的 axios 配合后端联调
 */
import { defHttp } from '/@/utils/http/axios';

// import request from "@/api/axios.js"       //调用项目封装的axios

enum Api {
  CAPTCHA_GET = '/captcha/get',
  CAPTCHA_CHECK = '/captcha/check'
}
//获取验证图片  以及token
export const captchaGet = function () {
  return defHttp.post({ url: Api.CAPTCHA_GET }, { isTransformResponse: false });
};

//滑动或者点选验证
export const captchaCheck = function (data) {
  return defHttp.post({ url: Api.CAPTCHA_CHECK, data }, { isTransformResponse: false });
};

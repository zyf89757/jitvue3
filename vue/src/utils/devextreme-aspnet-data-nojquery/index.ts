import { createStore } from 'devextreme-aspnet-data-nojquery-jit';
import { deepMerge } from '/@/utils'; //深度合并
import { useGlobSetting } from '/@/hooks/setting'; //全局设置
import { useUserStore } from '/@/store/modules/user'; // 用户store

const { urlPrefix } = useGlobSetting();
const _OPTIONS = {
  updateMethod: 'POST',
  deleteMethod: 'POST',
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.headers = {
      Authorization: 'Bearer ' + useUserStore().getToken
    };
    const strRegex = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    if (!strRegex.test(ajaxOptions.url)) {
      ajaxOptions.url = urlPrefix + ajaxOptions.url;
    }
    ajaxOptions.xhrFields = { withCredentials: false };
  }
};

// vue版本缺少新增，修改，删除等额外传递参数
function createStoreConfig(options) {
  if ('insertParams' in options) {
    _OPTIONS.onInserting = (data) => {
      deepMerge(data, options.insertParams);
    };
  }
  if ('updateParams' in options) {
    _OPTIONS.onUpdating = (data) => {
      deepMerge(data, options.updateParams);
    };
  }
  if ('deleteParams' in options) {
    _OPTIONS.onRemoving = (data) => {
      deepMerge(data, options.deleteParams);
    };
  }
  return createStore(deepMerge(options, _OPTIONS));
}

export function CreateStore(options) {
  return createStoreConfig(options);
}

/* eslint-disable prefer-rest-params */

import { createVNode, render } from 'vue';
import { useUserStore } from '/@/store/modules/user'; // 获取user的store
import Form from '/@/components/DxForm/index.vue';
import dataSource from '/@/views/example/form/dataform';
import { defHttp } from '/@/utils/http/axios';
import { Button } from '/@/components/DxButton';
import { CreateStore } from '../devextreme-aspnet-data-nojquery'; //获取数据DataGrid
import { useGlobSetting } from '/@/hooks/setting'; // 获取env 设置的全局变量
import mime from 'mime';
import { EzFilePreview } from '/@/components/EzControls/EzFilePreview';
const { uploadUrl = '' } = useGlobSetting();
//Ez框架
export const Ez = {
  Name: 'EzFramework',
  Version: 'beta v0.0.0.1',
  DevIcons:
    '|arrowdown|arrowright|arrowup|spinleft|spinright|spinnext|spinprev|spindown|spinup|chevronleft|chevronright|chevronnext|chevronprev|chevrondown|chevronup|back|repeat|add|airplane|bookmark|box|car|card|cart|chart|check|clear|clock|close|coffee|comment|doc|download|edit|email|event|favorites|find|filter|floppy|folder|food|gift|globe|group|help|home|image|info|key|like|map|menu|message|money|music|overflow|percent|photo|plus|preferences|product|pulldown|refresh|remove|revert|runner|save|search|tags|tel|tips|todo|toolbox|trash|user|upload|',
  //类型判断
  Type: {
    isNumber: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Number]';
    },
    isString: function (obj) {
      return Object.prototype.toString.call(obj) === '[object String]';
    },
    isUndefined: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Undefined]';
    },
    isBoolean: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Boolean]';
    },
    isObject: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Object]';
    },
    isArray: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isFunction: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  },
  // 随机数
  rondomNum: function () {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + S4() + S4() + S4();
  },
  // 获取海关参数
  // typeanme json文件数据类型： 1、customs 2、nems 3、npts
  // params  json 值
  BasicData: function ({ typeName, paramName }) {
    return defHttp
      .get({ url: `/api/parameter/${typeName}/${paramName}` }, { isTransformResponse: false })
      .then((res) => {
        return res.data;
      });
  },
  // 获取token
  GetToken: function () {
    return useUserStore().getToken;
  },
  // 组件转dom
  RenderComponent: function (el, comp, options?) {
    const container = document.createElement('div');
    const vm = createVNode(comp, options);
    render(vm, container);
    if (this.Type.isString(el)) {
      return document.querySelector(el).appendChild(container);
    } else {
      return el.appendChild(container);
    }
  },
  // 获取DataGrid数据
  CreateStore: function (options) {
    return CreateStore(options);
  },
  // env 设置的变量
  GlobSetting: function () {
    return useGlobSetting();
  },

  //Guid操作1：判断是否是GUID
  IsGuid: function (value) {
    const reg = new RegExp(
      /^[0-9a-zA-Z]{8}[0-9a-zA-Z]{4}[0-9a-zA-Z]{4}[0-9a-zA-Z]{4}[0-9a-zA-Z]{12}$/
    );
    return reg.test(value);
  },

  //Guid操作2：返回不是Guid的值
  FormatGuid: function (value) {
    return this.IsGuid(value) ? '' : value;
  },
  // 存储仓库
  Storage: {
    Set: function (key, value) {
      return defHttp
        .post(
          { url: `/api/storage/set/json`, params: { key, value } },
          { isTransformResponse: false }
        )
        .then((res) => {
          return res;
        });
    },
    Get: function (key) {
      return defHttp.post({ url: `/api/storage/state/` + key }, { isTransformResponse: false });
    },
    Url: function () {
      const parseParam = function (param, key) {
        if (param) {
          let paramStr = '';
          if (param instanceof String || param instanceof Number || param instanceof Boolean) {
            paramStr += '&' + key + '=' + encodeURIComponent(param);
          } else {
            $.each(param, function (i) {
              if (i) {
                const k =
                  key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += '&' + parseParam(this, k);
              }
            });
          }
          return paramStr.substr(1);
        }
      };
      const count = arguments.length;
      if (count === 0) return;
      let _url, _args;
      if (count > 1 && arguments[count - 1] instanceof Object) {
        _args = '?' + parseParam(arguments[count - 1]);
        if (count === 2) {
          _url = arguments[0] + _args;
        }
        if (count === 3) {
          _url = '/' + arguments[0] + '/' + arguments[1] + _args;
        }
        if (count === 4) {
          _url = '/' + arguments[0] + '/' + arguments[1] + '/' + arguments[2] + _args;
        }
        location.href = _url;
      } else {
        if (count === 1) {
          _url = arguments[0];
        }
        if (count === 2) {
          _url = '/' + arguments[0] + '/' + arguments[1];
        }
        if (count === 3) {
          _url = '/' + arguments[0] + '/' + arguments[1] + '/' + arguments[2];
        }
        location.href = _url;
      }
    },
    Caching: {
      Local: {
        SetValue: function (key, value) {
          if (window.localStorage) {
            window.localStorage.setItem(key, value);
          }
        },
        SetJsonValue: function (key, value) {
          if (window.localStorage) {
            window.localStorage.setItem(key, JSON.stringify(value));
          }
        },
        GetJsonValue: function (key) {
          if (window.localStorage) {
            return JSON.parse(window.localStorage.getItem(key));
          }
          return '';
        },
        GetValue: function (key) {
          if (window.localStorage) {
            return window.localStorage.getItem(key);
          }
          return '';
        },
        Clear: function () {
          if (window.localStorage) {
            window.localStorage.clear();
          }
        },
        Remove: function (key) {
          if (window.localStorage) {
            if (key) {
              window.localStorage.removeItem(key);
            }
          }
        }
      },
      VerLocal: {
        SetValue: function (key, value, ver) {
          if (window.localStorage) {
            if (!ver) {
              ver = new Date().Format('yyyyMMdd');
            }
            const data = {
              value: value,
              ver: ver
            };
            window.localStorage.setItem(key, JSON.stringify(data));
          }
        },
        GetValue: function (key, ver) {
          if (window.localStorage) {
            if (!ver) {
              ver = new Date().Format('yyyyMMdd');
            }
            const data = JSON.parse(window.localStorage.getItem(key));
            if (data) {
              if (ver !== data.ver) {
                window.localStorage.removeItem(key);
              } else {
                return data.value;
              }
            }
          }
          return '';
        },
        Clear: function () {
          if (window.localStorage) {
            window.localStorage.clear();
          }
        },
        Remove: function (key) {
          if (window.localStorage) {
            if (key) {
              window.localStorage.removeItem(key);
            }
          }
        }
      },
      Session: {
        SetValue: function (key, value) {
          if (window.sessionStorage) {
            window.sessionStorage.setItem(key, value);
          }
        },
        SetJsonValue: function (key, value) {
          if (window.sessionStorage) {
            window.sessionStorage.setItem(key, JSON.stringify(value));
          }
        },
        GetJsonValue: function (key) {
          if (window.sessionStorage) {
            return JSON.parse(window.sessionStorage.getItem(key));
          }
          return '';
        },
        GetValue: function (key) {
          if (window.sessionStorage) {
            return window.sessionStorage.getItem(key);
          }
          return '';
        },
        Clear: function () {
          if (window.sessionStorage) {
            window.sessionStorage.clear();
          }
        },
        Remove: function (key) {
          if (window.sessionStorage) {
            if (key) {
              window.sessionStorage.removeItem(key);
            }
          }
        }
      },
      Cookie: {
        GetValue: function (key) {
          let arr = [];
          const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)'); //正则匹配
          if ((arr = document.cookie.match(reg))) {
            return unescape(arr[2]);
          } else {
            return null;
          }
        },
        SetValue: function (key, value) {
          const Days = 30;
          const exp = new Date();
          exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
          document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString();
        },
        Clear: function () {
          const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
          if (keys) {
            for (let i = 0; i < keys.length; i++)
              document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
          }
        },
        Remove: function (key) {
          const exp = new Date();
          exp.setTime(exp.getTime() - 1);
          const cval = Ez.Caching.Cookie.GetValue(key);
          if (cval !== null) {
            document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString();
          }
        }
      }
    },
    Button: {
      Init: function (id, icon, text, click, type) {
        let _id, _icon, _text, _click, _button;
        if (!ez.Type.isString(id)) {
          throw 'id is required.';
        } else {
          if (ez.Type.isString(icon) && ez.Type.isString(text) && ez.Type.isFunction(click)) {
            _icon = icon;
            _text = text;
            _click = click;
          }
          if (ez.Type.isString(icon) && ez.Type.isFunction(text)) {
            if (
              icon.indexOf('fa ') > -1 ||
              ez.DevIcons.indexOf(icon) > -1 ||
              icon.indexOf('/') > -1
            ) {
              _icon = icon;
            } else {
              _text = icon;
            }
            _click = text;
          }
          const op = {
            text: _text,
            type: type || 'normal',
            icon: _icon,
            onClick: function (e) {
              if (ez.Type.isFunction(_click)) _click(e);
            }
          };
          ez.RenderComponent(id, Button, op);
        }
      },
      Normal: function (id, icon, text, click) {
        this.Init(id, icon, text, click, 'normal');
      },
      Success: function (id, icon, text, click) {
        this.Init(id, icon, text, click, 'success');
      },
      Warning: function (id, icon, text, click) {
        this.Init(id, icon, click, 'danger');
      },
      Default: function (id, icon, text, click) {
        this.Init(id, icon, text, click, 'default');
      },
      // 扩展按钮
      OK: function (id, text, click) {
        this.Normal(id, 'check', text, click);
      },
      Submit: function (id, text) {
        let _id, _text;
        if (!ez.Type.isString(id)) {
          throw 'id is required.';
        } else {
          _id = id;
          _text = 'button_submit';
          if (ez.Type.isString(text)) {
            _text = text;
          }
          ez.RenderComponent(id, Button, {
            text: '提交',
            type: 'success',
            icon: 'todo',
            useSubmitBehavior: true
          });
        }
      }
    }
  },
  Form: {
    //初始化表单。id:表单的id；key： 表单配置表中 key；postData:初始值，可以不写；onReady:表单加载完成事件，参数 e；onTabChanged：tabbed类型的选择卡切换事件 ，参数e。
    //onTabChanged:  {onTabChanged:function(e){},onEnter:function(e),onDataChanged:function(e){},basicData:{}} 选择卡切换事件、回车事件、值改变事件
    Init: function (id, key, postData, onReady, onTabChanged) {
      console.log(this);
      if (!ez.Type.isString(key)) {
        throw 'key is required.';
      }
      let _postData,
        _formData,
        _onTabChanged,
        _onEditorEnterKey,
        _onFieldDataChanged,
        _onDataLoaded,
        _basicData;
      if (ez.Type.isFunction(onTabChanged)) {
        _onTabChanged = onTabChanged;
      } else if (ez.Type.isObject(onTabChanged)) {
        if (ez.Type.isFunction(onTabChanged.onEnter)) {
          _onEditorEnterKey = onTabChanged.onEnter;
        }
        if (ez.Type.isFunction(onTabChanged.onTabChanged)) {
          _onTabChanged = onTabChanged.onTabChanged;
        }
        if (ez.Type.isFunction(onTabChanged.onDataChanged)) {
          _onFieldDataChanged = onTabChanged.onDataChanged;
        }
        if (ez.Type.isFunction(onTabChanged.onDataLoaded)) {
          _onDataLoaded = onTabChanged.onDataLoaded;
        }
        if (ez.Type.isObject(onTabChanged.basicData)) {
          _basicData = onTabChanged.basicData;
        }
      }

      if (ez.Type.isObject(postData)) {
        _postData = postData;
      } else if (ez.Type.isFunction(postData)) {
        _formData = postData();
      }
      const setForm = function (op) {
        const container = document.createElement('div');
        const vm = createVNode(Form, op);
        render(vm, container);
        document.getElementById(id).appendChild(container);
      };

      const _options = {
        id,
        options: dataSource.getFormOption()
      };
      setForm(_options);
    },
    Init2: () => {
      const _options = {
        id: '',
        options: dataSource.getFormOption()
      };
      // console.log(id.value.options);
      // id.value.options = dataSource.getFormOption();
      // id.value.options = Object.assign({}, dataSource.getFormOption());
      return dataSource.getFormOption();
    },
    // 获取表单
    Get: function (id) {
      // console.log($this.$refs[id].instance);
      console.log(id);
      return id.value;
    }
  },
  // 租户数据
  TenantsData: async function (searchValue = '') {
    const _value = searchValue != '' && !(searchValue.constructor == Object) ? searchValue : '';
    const data = await defHttp.get(
      { url: `/api/tenant/user/tenants?SearchValue=` + _value },
      { isTransformResponse: false }
    );
    return data;
  },
  //枚举数据
  GetEnumData: (data) => {
    const { enumName } = data;
    return defHttp.get(
      { url: `/api/enumdata/list?EnumName=` + enumName },
      { isTransformResponse: false }
    );
    // return data;
  },
  // 下载文件
  DownloadFile: (apiUrl, fileName = null) => {
    const xhr: any = new XMLHttpRequest();
    const url = uploadUrl + apiUrl;
    xhr.open('get', url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.setRequestHeader('Authorization', 'Bearer ' + Ez.GetToken());
    xhr.responseType = 'blob';
    const formData = new FormData();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const _fileName =
          fileName ||
          decodeURI(
            xhr?.getResponseHeader('content-disposition')?.split(';')[1].split('=')[1]
          )?.replace(/\"/g, '');
        const type = mime.getType(fileName);
        const blob = new Blob([xhr.response], { type: type });
        const url = window.URL.createObjectURL(blob);
        //创建一个a标签元素，设置下载属性，点击下载，最后移除该元素
        const link = document.createElement('a');
        link.href = url;
        link.style.display = 'none';
        //取出下载文件名
        link.setAttribute('download', _fileName);
        link.click();
        window.URL.revokeObjectURL(url);
      }
    };
    xhr.send(formData);
  },
  // 预览文件
  PreviewFile: async (apiUrl, fileName = null) => {
    const preUrl = '';
    const xhr: any = new XMLHttpRequest();
    const url = uploadUrl + apiUrl;
    xhr.open('get', url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.setRequestHeader('Authorization', 'Bearer ' + Ez.GetToken());
    xhr.responseType = 'blob';
    const formData = new FormData();
    xhr.send(formData);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const pfileName =
          fileName ||
          decodeURI(xhr?.getResponseHeader('content-disposition').split(';')[1].split('=')[1])
            .toString()
            .replace(/\"/g, '');
        const type = mime.getType(pfileName);
        const blob = new Blob([xhr.response], { type: type });
        const url = window.URL.createObjectURL(blob);
        const body = document.querySelector('body');
        Ez.RenderComponent(body, EzFilePreview, { src: url, type });
        window.URL.revokeObjectURL(url);
      }
    };
    return preUrl;
  },
  // 登录token是否过期
  IsTokenExp: function () {
    const token = useUserStore().getToken;
    if (!token) return true;
    const data = decodeURIComponent(escape(window.atob(token.split('.')[1])));
    const exp = JSON.parse(data).exp;
    if (!exp) return true;
    const time = Date.parse(new Date()) / 1000;
    if (exp > time) return false;
    else return true;
  }
  //
};

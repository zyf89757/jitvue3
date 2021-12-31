or create a new repository on the command line

```
echo "# DjitdNext" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/clairing/DjitdNext.git
```

git push -u origin main

```
…or push an existing repository from the command line
git remote add origin https://github.com/clairing/DjitdNext.git
git branch -M main
git push -u origin main
…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.
```

提交注意事项 1 关闭远程

```
node_modules 修改：
一、devextreme-aspnet-data-nojquery
 调整：回调做了修改处理：
   function sendCore() {
        ajaxUtility.sendRequest(ajaxSettings).then(
          function (res, textStatus, xhr) {
            if (res.code) {
              if (res.code != 200) {
                var error = res.message;
                if (onAjaxError) {
                  var e = { xhr: xhr, error: error };
                  onAjaxError(e);
                  error = e.error;
                }
                if (error)
                  d.reject(error);
                else
                  d.reject(xhr, res.code);


              } else {
                if (customSuccessHandler)
                  customSuccessHandler(d, res, xhr);
                else
                  d.resolve();
              }

            }
            else {
              if (customSuccessHandler)
                customSuccessHandler(d, res, xhr);
              else
                d.resolve();
            }
          },
          function (xhr, textStatus) {
            var error = getErrorMessageFromXhr(xhr);
            if (onAjaxError) {
              var e = { xhr: xhr, error: error };
              onAjaxError(e);
              error = e.error;
            }

            if (error)
              d.reject(error);
            else
              d.reject(xhr, textStatus);
          }
        );
      }

 二、devextreme 本地化部署语言
     location/messages 需改
三、2、引用全局属性设置 env import { useGlobSetting } from '/@/hooks/setting';

四、每次改动env 文件相关文件
    需要重启vs code 服务程序

五、选择应用：
  组件：src\layouts\default\header\index.vue


```

问题： 8 月 4 号：

1、dataGrid 中的 dxColumn 的 cell-template，模板重写，在插槽 slot 无效（父组件中）

```

```

逻辑梳理： 一、修改系统配置

src\layouts\default\setting\SettingDrawer.tsx 配置属性

1、多语言标题 2、事件名 3、响应式获取绑定值 4、可选值

每个组件做了逻辑处理，如 SelectItem， 组件有引用 baseHandle，修改系统配置项后， appStore 会响应式保存状态，并通过后台接口提交保存用户系统配置

```
<SelectItem
 title={t('layout.setting.storageType')}
 event={HandlerEnum.STORAGE_TYPE}
 def={unref(getPermissionCacheType)}
 options={permissionCacheTypeOptions}
 />
```

二、登录 app 设置

src\logics\initAppConfig.ts

三、路由导航守卫 permissionGuard

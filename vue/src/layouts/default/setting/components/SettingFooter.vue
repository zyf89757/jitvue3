<template>
  <div :class="prefixCls">
    <a-button type="primary" block @click="handleSave">
      <CopyOutlined class="mr-2" />
      {{ t('layout.setting.saveBtn') }}
    </a-button>

    <a-button color="warning" block @click="handleResetSetting" class="my-3">
      <RedoOutlined class="mr-2" />
      {{ t('common.resetText') }}
    </a-button>
  </div>
</template>
<scrip lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SettingFooter'
});
</scrip>
<script lang="ts" setup>
  import { unref, computed } from 'vue';

  import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue';

  import { useAppStore } from '/@/store/modules/app';
  // import { usePermissionStore } from '/@/store/modules/permission';
  // import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import { useUserStore } from '/@/store/modules/user';
  import { APP_USER_THEME_CONFIG } from '/@/enums/cacheEnum';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import defaultProjectData from '/@/settings/defaultProjectSetting';
  // import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
  // import { updateGrayMode } from '/@/logics/theme/updateGrayMode';

  import { Ez } from '/@/utils/devexpress';

  // const permissionStore = usePermissionStore();
  const { prefixCls } = useDesign('setting-footer');
  const { t } = useI18n();
  const { createMessage } = useMessage();
  // const tabStore = useMultipleTabStore();
  const userStore = useUserStore();
  const appStore = useAppStore();
  const userInfo = unref(computed(() => userStore.getUserInfo));

  async function handleSave() {
    if (userInfo?.userId) {
      const { code, message } = await Ez.Storage.Set(
        APP_USER_THEME_CONFIG + userInfo?.userId,
        JSON.stringify(unref(appStore.getProjectConfig), null, 2)
      );
      if (code != '200' && code != '204') {
        createMessage.error(message);
      } else {
        createMessage.success(t('layout.setting.operatingTitle'));
      }
    } else {
      createMessage.error(t('sys.api.apiTimeoutMessage'));
    }
  }
  async function handleResetSetting() {
    try {
      appStore.setProjectConfig(defaultProjectData);
      // const { colorWeak, grayMode } = defaultSetting;
      // updateTheme(themeColor);
      // updateColorWeak(colorWeak);
      // updateGrayMode(grayMode);
      // appStore.resetAllState();
      // permissionStore.resetState();
      // tabStore.resetState();
      const { code, message } = await Ez.Storage.Set(
        APP_USER_THEME_CONFIG + userInfo?.userId,
        JSON.stringify(unref(defaultProjectData), null, 2)
      );
      if (code != '200' && code != '204') {
        createMessage.error(message);
      } else {
        createMessage.success(t('layout.setting.operatingTitle'));
        location.reload();
      }
    } catch (error: any) {
      createMessage.error(error);
    }
  }

  // function handleClearAndRedo() {
  //   localStorage.clear();
  //   appStore.resetAllState();
  //   permissionStore.resetState();
  //   tabStore.resetState();

  //   userStore.resetState();
  //   location.reload();
  // }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-footer';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;

    button:last-child {
      margin-top: 1em;
    }
  }
</style>

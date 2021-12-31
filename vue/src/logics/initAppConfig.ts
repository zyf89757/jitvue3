/**
 * Application configuration
 */
import type { ProjectConfig } from '/#/config';

import { APP_USER_THEME_CONFIG } from '/@/enums/cacheEnum';
import { unref, computed } from 'vue';
import projectSetting from '/@/settings/projectSetting';
import defaultprojectSetting from '/@/settings/defaultProjectSetting';
import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
import { updateDarkTheme } from '/@/logics/theme/dark';
import { changeTheme } from '/@/logics/theme';
import { useUserStore } from '/@/store/modules/user';
import { useAppStore } from '/@/store/modules/app';
import { useLocaleStore } from '/@/store/modules/locale';

import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env';

import { primaryColor } from '../../build/config/themeConfig';
// import { Persistent } from '/@/utils/cache/persistent';// 获取本地缓存的值
import { deepMerge } from '/@/utils';
import { ThemeEnum } from '/@/enums/appEnum';
import { Ez } from '/@/utils/devexpress';

// Initial project configuration
export async function initAppConfigStore() {
  const localeStore = useLocaleStore();
  const appStore = useAppStore();
  const userStore = useUserStore();
  const userInfo = unref(computed(() => userStore.getUserInfo));
  // 获取本地存储的项目配置信息
  // let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  let { data }: ProjectConfig = await Ez.Storage.Get(APP_USER_THEME_CONFIG + userInfo?.userId);
  data = data ? JSON.parse(data) : data;
  let projCfg = data as Projecting;
  projCfg = deepMerge(projectSetting, projCfg || {});
  const darkMode = appStore.getDarkMode;
  const {
    colorWeak,
    grayMode,
    themeColor,

    headerSetting: { bgColor: headerBgColor } = {},
    menuSetting: { bgColor } = {}
  } = projCfg;
  try {
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor);
    }

    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }
  if (data) {
    appStore.setProjectConfig(projCfg, false);
  } else {
    appStore.setProjectConfig(defaultprojectSetting, false);
  }

  // init dark mode
  updateDarkTheme(darkMode);
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
  }
  // init store
  localeStore.initLocale();

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}

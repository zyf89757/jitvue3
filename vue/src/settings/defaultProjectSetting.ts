import type { ProjectConfig } from '/#/config';
const setting: ProjectConfig = {
  showSettingButton: true,
  showDarkModeToggle: true,
  settingButtonPosition: 'auto',
  permissionMode: 'BACK',
  permissionCacheType: 1,
  sessionTimeoutProcessing: 0,
  themeColor: '#0960bd',
  grayMode: false,
  colorWeak: false,
  fullContent: false,
  contentMode: 'full',
  showLogo: true,
  showFooter: false,
  headerSetting: {
    bgColor: '#ffffff',
    fixed: true,
    show: true,
    theme: 'light',
    useLockPage: true,
    showFullScreen: true,
    showDoc: true,
    showNotice: true,
    showSearch: true
  },
  menuSetting: {
    bgColor: '#001529',
    fixed: true,
    collapsed: false,
    collapsedShowTitle: false,
    canDrag: false,
    show: true,
    hidden: false,
    menuWidth: 210,
    mode: 'inline',
    type: 'sidebar',
    theme: 'dark',
    split: false,
    topMenuAlign: 'center',
    trigger: 'FOOTER',
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: 'click',
    mixSideFixed: false
  },
  multiTabsSetting: {
    cache: false,
    show: true,
    canDrag: true,
    showQuick: true,
    showRedo: true,
    showFold: true
  },
  transitionSetting: {
    enable: false,
    basicTransition: 'fade-slide',
    openPageLoading: true,
    openNProgress: false
  },
  openKeepAlive: true,
  lockTime: 0,
  showBreadCrumb: true,
  showBreadCrumbIcon: false,
  useErrorHandle: false,
  useOpenBackTop: true,
  canEmbedIFramePage: true,
  closeMessageOnSwitch: true,
  removeAllHttpPending: false
};

export default setting;

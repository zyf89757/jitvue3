import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const example: AppRouteModule = {
  path: '/saas/manager',
  name: 'SaasManager',
  component: LAYOUT,
  redirect: '/saas/manager/apps',
  meta: {
    orderNo: 100,
    icon: 'ant-design:desktop',
    title: '平台管理'
  },
  children: [
    {
      path: 'apps',
      name: 'Apps',
      component: () => import('/@/views/saas/app/apps/index.vue'),
      meta: {
        title: '应用管理',
        icon: ''
      }
    },
    {
      path: 'menus',
      name: 'Menus',
      component: () => import('/@/views/saas/app/menus/index.vue'),
      meta: {
        title: '菜单管理',
        icon: ''
      }
    }
  ]
};

export default example;

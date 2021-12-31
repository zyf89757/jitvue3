import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const example: AppRouteModule = {
  path: '/example',
  name: 'Example',
  component: LAYOUT,
  redirect: '/example/datagrid',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '示例',
    orderNo: 13
  },
  children: [
    {
      path: 'datagrid',
      name: 'DataGrid',
      component: () => import('/@/views/example/data-grid/index.vue'),
      meta: {
        title: 'DataGrid',
        icon: 'simple-icons:about-dot-me'
      }
    },
    {
      path: 'form',
      name: 'Form',
      component: () => import('/@/views/example/form/index.vue'),
      meta: {
        title: 'Form',
        icon: 'simple-icons:about-dot-me'
      }
    },
    {
      path: 'test',
      name: 'Test',
      component: () => import('/@/views/example/test/index.vue'),
      meta: {
        title: 'Test',
        icon: 'simple-icons:about-dot-me'
      }
    },
    {
      path: 'test01',
      name: 'Test01',
      component: () => import('/@/views/basic/test1/index.vue'),
      meta: {
        title: '应用测试1',
        icon: ''
      }
    }
  ]
};

export default example;

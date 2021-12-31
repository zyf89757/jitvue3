<template>
  <span :class="[prefixCls, theme]" class="application-icon" @click="showAppDrawer">
    <MoreOutlined />
    <div class="sys-name" :class="[prefixCls, theme]">
      {{ userInfo.applicationName || '【请选择应用】' }}
    </div>
  </span>
  <AppDrawer @register="registerDrawer" @success="handleSuccess" />
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { MoreOutlined } from '@ant-design/icons-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import { Icon } from '/@/components/Icon';
  import { useDrawer } from '/@/components/Drawer';
  import AppDrawer from './AppDrawer.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { changeSys } from '/@/api/sys/user';
  import { usePermissionStore } from '/@/store/modules/permission';
  import { usePermission } from '/@/hooks/web/usePermission';
  export default defineComponent({
    name: 'HeaderTrigger',
    components: { MoreOutlined, Icon, AppDrawer },
    props: {
      theme: propTypes.oneOf(['light', 'dark'])
    },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();

      // 用户上下文
      const userStore = useUserStore();
      const userInfo = computed(() => userStore.getUserInfo);
      const permissionStore = usePermissionStore();
      const { refreshMenu } = usePermission();
      function showAppDrawer() {
        openDrawer(true, {});
      }
      // 处理选择成功的
      async function handleSuccess(data) {
        const res = await changeSys(data.id);
        if (res.code == 204 || res.code == 200) {
          permissionStore.setDynamicAddedRoute(false);
          await userStore.getUserInfoAction();
          refreshMenu();
        }
      }
      const { prefixCls } = useDesign('layout-header-trigger');
      return { showAppDrawer, registerDrawer, handleSuccess, prefixCls, userInfo };
    }
  });
</script>

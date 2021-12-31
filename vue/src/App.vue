<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import zhMessages from 'devextreme/localization/messages/zh.json';
  import { locale, loadMessages } from 'devextreme/localization';
  import 'dayjs/locale/zh-cn';
  loadMessages(zhMessages);
  locale(navigator.language);
  // support Multi-language
  const { getAntdLocale } = useLocale();
  // Listening to page changes and dynamically changing site titles
  useTitle();
  // DevExpress使用中文
</script>

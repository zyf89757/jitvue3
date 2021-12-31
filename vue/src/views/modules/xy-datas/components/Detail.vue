<template>
  <PageWrapper>
    <FramePage :frameSrc="frameSrc" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SWDetail'
  });
</script>
<script lang="ts" setup>
  import { ref } from 'vue';
  import FramePage from '/@/views/sys/iframe/index.vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const ieFlag = route.params?.IEFlag.toString();
  const cusCiqNo = route.params?.cusCiqNo.toString();
  const frameSrc = ref('');
  import { useTabs } from '/@/hooks/web/useTabs';
  const { setTitle } = useTabs();
  setTitle('详情：' + cusCiqNo);
  if (ieFlag == 'E') {
    frameSrc.value = 'https://swf.djitd.com/sw/export?cusCiqNo=' + cusCiqNo;
  } else {
    frameSrc.value = 'https://swf.djitd.com/sw/import?cusCiqNo=' + cusCiqNo;
  }
</script>

<template>
  <div id="btn"></div>
  <div id="btn1"></div>
  <div id="btn"></div>
  {{ appStore.getAppSize }}
  <DxRadioRroup :items="priorities" :value="priorities[1]" />
</template>

<script setup>
  import { Ez } from '/@/utils/devexpress';
  import { onMounted } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useAppStore } from '/@/store/modules/app';
  import { useMessage } from '/@/hooks/web/useMessage';
  import DxRadioRroup from 'devextreme-vue/radio-group';
  const { createMessage, createErrorModal } = useMessage();
  const priorities = ['Low', 'Normal', 'Urgent', 'High'];
  createMessage.error('11');
  createErrorModal('1');

  const appStore = useAppStore();
  const globSetting = useGlobSetting();
  console.log(import.meta.env);
  console.log(globSetting);
  onMounted(() => {
    Ez.Button.Normal('#btn', '', '测试', function () {
      alert(1);
    });
    Ez.Button.Submit('#btn1', '提交');
  });
</script>

<style></style>

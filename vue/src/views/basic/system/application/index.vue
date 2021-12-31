<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="12">
      <SystemManage @selectSys="onSelectSys" />
    </a-col>
    <a-col :span="12">
      <TenantList :applicationId="sysId" />
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import SystemManage from './components/SystemManage.vue';
  import TenantList from './components/TenantList.vue';
  import { ref } from 'vue';

  // 选中系统获取租户列表
  const sysId = ref('');
  function onSelectSys(data) {
    console.log(data);
    sysId.value = data.value.id;
  }
</script>

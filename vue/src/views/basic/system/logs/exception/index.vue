<template>
  <PageWrapper>
    <EzTable
      :data-source="dataSource"
      :show-more="false"
      :allow-adding="false"
      :allow-deleting="false"
      :allow-updating="false"
      :toolbar="[
        {
          name: 'btn',
          type: 'primary',
          title: '清除所有日志',
          click: clearLog,
          auth: '123'
        }
      ]"
    >
      <DxColumn data-field="name" caption="名称" />
      <DxColumn data-field="className" caption="类名" />
      <DxColumn data-field="methodName" caption="方法名" />
      <DxColumn data-field="exceptionMsg" caption="异常信息" />
      <DxColumn data-field="exceptionSource" caption="异常源" />
      <DxColumn data-field="stackTrace" caption="堆栈信息" width="300" />
      <DxColumn
        data-field="exceptionTime"
        caption="异常时间"
        data-type="datetime"
        format="yyyy-MM-dd HH:mm:ss"
      />
      <DxColumn data-field="params" caption="参数" width="300" />
    </EzTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'ExpectionLog'
  });
</script>
<script lang="ts" setup>
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { Ez } from '/@/utils/devexpress';
  let dataSource = ref();
  const url = `/api/log/exception`;
  dataSource.value = Ez.CreateStore({
    key: 'id',
    loadUrl: `${url}/list`
  });
  // 清除用户日志
  async function clearLog(e) {
    const res = await defHttp.post({ url: `${url}/clear` }, { isToastMsg: true });
    if (res) e.refresh();
  }
</script>

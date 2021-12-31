<template>
  <PageWrapper>
    <EzTable
      :data-source="dataSource"
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
      <DxColumn data-field="stackId" caption="追踪id" />
      <DxColumn data-field="businessId" caption="业务编号" />
      <DxColumn data-field="formName" caption="表单名" />
      <DxColumn data-field="tableName" caption="表名" />
      <DxColumn data-field="csTableName" caption="类表名" />
      <DxColumn data-field="columnName" caption="列名" />
      <DxColumn data-field="columnNameCs" caption="属性列名" />
      <DxColumn data-field="newValue" caption="新值" />
      <DxColumn data-field="oldValue" caption="旧值" />
      <DxColumn data-field="operate" caption="操作方式" />
      <DxColumn
        data-field="opTime"
        caption="操作时间"
        data-type="date"
        format="yyyy-MM-dd HH:mm:ss"
      />
    </EzTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'AuditLogs'
  });
</script>
<script lang="ts" setup>
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { Ez } from '/@/utils/devexpress';
  let dataSource = ref();
  const url = `/api/log/audit`;
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

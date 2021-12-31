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
      <DxColumn data-field="curdType" caption="Curd类型" />
      <DxColumn data-field="tableName" caption="操作表" />
      <DxColumn data-field="entityType" caption="实体类" />
      <DxColumn data-field="sql" caption="sql语句" />
      <DxColumn data-field="sqlParams" caption="sql参数" />
      <DxColumn data-field="elapsedMilliseconds" caption="执行时间" />
      <DxColumn data-field="success" caption="操作成功">
        <DxLookup :data-source="successType" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="executeResult" caption="执行结果" />
      <DxColumn data-field="sqlException" caption="异常信息" />
    </EzTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SqlLog'
  });
</script>
<script lang="ts" setup>
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { Ez } from '/@/utils/devexpress';
  let dataSource = ref();
  const successType = [
    { text: '是', value: 1 },
    { text: '否', value: 0 }
  ];
  const url = `/api/log/sql`;
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

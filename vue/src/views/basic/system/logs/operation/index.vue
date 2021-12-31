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
      <DxColumn data-field="name" caption="名称" />
      <DxColumn data-field="success" caption="操作成功">
        <DxLookup :data-source="successType" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="message" caption="具体消息" />
      <DxColumn data-field="ip" caption="IP" />
      <DxColumn data-field="location" caption="地址" />
      <DxColumn data-field="browser" caption="浏览器" />
      <DxColumn data-field="os" caption="操作系统" />
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
    name: 'OperationLog'
  });
</script>
<script lang="ts" setup>
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { Ez } from '/@/utils/devexpress';
  let dataSource = ref();
  const url = `/api/log/operation`;
  dataSource.value = Ez.CreateStore({
    key: 'id',
    loadUrl: `${url}/list`
  });
  const successType = [
    { text: '是', value: 1 },
    { text: '否', value: 0 }
  ];
  // 清除用户日志
  async function clearLog(e) {
    const res = await defHttp.post({ url: `${url}/clear` }, { isToastMsg: true });
    if (res) e.refresh();
  }
</script>

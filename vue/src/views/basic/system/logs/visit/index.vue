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
      <DxColumn data-field="visType" caption="访问类型">
        <DxLookup :data-source="visType" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="success" caption="是否成功">
        <DxLookup :data-source="successType" value-expr="value" display-expr="text"
      /></DxColumn>
      <DxColumn data-field="message" caption="具体消息" />
      <DxColumn data-field="ip" caption="IP" />
      <DxColumn data-field="browser" caption="浏览器" />

      <DxColumn
        data-field="visTime"
        caption="访问时间"
        data-type="datetime"
        format="yyyy-MM-dd HH:mm:ss"
      />
    </EzTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'VisitLog'
  });
</script>
<script lang="ts" setup>
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { Ez } from '/@/utils/devexpress';
  const successType = [
    { text: '是', value: 1 },
    { text: '否', value: 0 }
  ];
  let dataSource = ref();
  const visType = ref({});
  const url = `/api/log/visit`;
  dataSource.value = Ez.CreateStore({
    key: 'id',
    loadUrl: `${url}/list`
  });
  loadVisType();
  async function loadVisType() {
    const res = await Ez.GetEnumData({ enumName: 'LoginType' });
    visType.value = res.data;
  }
  // 清除用户日志
  async function clearLog(e) {
    const res = await defHttp.post({ url: `${url}/clear` }, { isToastMsg: true });
    if (res) e.refresh();
  }
</script>

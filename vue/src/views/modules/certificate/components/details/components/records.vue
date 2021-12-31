<template>
  <EzTable
    class="details-list"
    ref-name="tlRecords"
    :show-toolbar="false"
    :height="0"
    :data-source="dataSource"
    :page-size="20"
    :edit-mode="'row'"
    :toolbar="[
      {
        name: 'upload',
        type: 'Button',
        title: '上传附件',
        click: null,
        auth: '123'
      }
    ]"
    :show-more="false"
    :allow-adding="false"
    :more-items="[]"
    selection-mode="single"
    :form-mode="false"
    @ez-table="init"
  >
    <DxColumn data-field="businessNum" caption="业务编号" width="120px" />
    <DxColumn data-field="ieFlag" caption="进出口类型" width="60px" />
    <DxColumn data-field="materialId" caption="料件号" width="180px" />
    <DxColumn data-field="material" caption="料件名称" width="180px" />
    <DxColumn data-field="useType" caption="使用方式" width="80px" :allowFiltering="false" />
    <DxColumn data-field="count" caption="使用量" width="120px" :allowFiltering="false" />
    <DxColumn data-field="remark" caption="备注" :allowFiltering="false" />
    <DxColumn data-field="cbyTime" caption="使用时间" width="130px" />
    <DxColumn
      data-field="id"
      caption="操作"
      width="50px"
      :allowFiltering="false"
      :allow-editing="false"
      :cell-template="handlerTemplate"
    />
  </EzTable>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, unref } from 'vue';
  export default defineComponent({ name: 'CertRecords' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';

  const props = defineProps({
    certId: {
      type: String
    },
    clickName: {
      type: String
    },
    count: {
      type: Number
    },
    activeKey: { type: String }
  });

  const cid = '3';
  const dataSource = ref({});
  const ezTable = ref<any>({});

  function loadDataSource() {
    const url = `/api/certificate`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/records`,
      loadParams: {
        Key: props.certId || '619d08ec-0a8e-8754-0075-f10a3af8dfa0'
      },
      deleteUrl: `${url}/record-revoke`
    });
  }
  loadDataSource();

  function handlerTemplate(el, e) {
    const container = document.createElement('a');
    container.onclick = function ({}) {
      RecordRevoke(e.value);
    };
    container.innerHTML = '撤销';
    return el.appendChild(container);
  }

  function init(_ezTable) {
    ezTable.value = _ezTable;
  }
  enum Api {
    RECORD_REVOKE = '/api/certificate/record-revoke'
  }
  async function RecordRevoke(id) {
    await defHttp.post({ url: Api.RECORD_REVOKE, params: { key: id } }, { isToastMsg: true });
  }

  watchEffect(() => {
    if ((unref(props.activeKey) || '') == cid) {
      if ((unref(props.count) || 0) > 0) {
        switch (unref(props.clickName)) {
          case 'refresh':
            refreshGrid();
            break;
        }
      }
    }
  });

  function refreshGrid() {
    ezTable.value?.refresh();
  }
</script>
<style lang="less" scoped></style>

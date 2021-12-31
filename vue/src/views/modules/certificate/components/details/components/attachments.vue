<template>
  <div>
    <EzTable
      class="details-list"
      ref-name="tlAttachments"
      :show-toolbar="false"
      :height="0"
      :data-source="dataSource"
      :page-size="20"
      :edit-mode="'row'"
      :show-more="false"
      :allow-adding="false"
      :more-items="[]"
      selection-mode="single"
      :form-mode="false"
      @ez-table="init"
    >
      <DxColumn
        data-field="fileOriginName"
        caption="附件名称"
        width="180px"
        :allow-editing="false"
      />
      <DxColumn data-field="fileSuffix" caption="附件后缀" width="80px" :allowEditing="false" />
      <DxColumn data-field="cbyTime" caption="上传时间" width="120px" :allowEditing="false" />
      <DxColumn data-field="fileType" caption="附件类型" width="120px" />
      <DxColumn data-field="fileName" caption="归档名称" width="180px" />
      <DxColumn data-field="remark" caption="备注" :allowFiltering="false" />
      <DxColumn
        data-field="fileId"
        caption="操作"
        width="80px"
        :allowFiltering="false"
        :allow-editing="false"
        :cell-template="handlerTemplate"
      />
    </EzTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, unref } from 'vue';
  export default defineComponent({ name: 'CertAttachments' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { Ez } from '/@/utils/devexpress';

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
  const cid = '2';

  const dataSource = ref({});
  const ezTable = ref<any>({});

  function loadDataSource() {
    const url = `/api/certificate`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/attachments`,
      loadParams: {
        Key: props.certId || 'a'
      },
      updateUrl: `${url}/attachment-update`,
      deleteUrl: `${url}/attachment-remove`
    });
  }
  loadDataSource();

  function handlerTemplate(el, e) {
    //const container = document.createElement('span');
    // container.innerHTML = '下载|浏览';
    // el.appendChild(container);
    console.log(e);
    const container = document.createElement('div');
    const download = document.createElement('a');

    download.onclick = function ({}) {
      downloadClick(e.value, e.data);
    };
    //download.setAttribute('download', e.data.fileOriginName);
    //download.setAttribute('href', '/dev/api/certificate/attachment-download/' + e.value);
    download.innerHTML = '下载';
    container.appendChild(download);

    const span = document.createElement('span');
    span.innerHTML = ' | ';
    container.appendChild(span);

    const preview = document.createElement('a');
    preview.onclick = function ({}) {
      previewClick(e.value);
    };
    // preview.setAttribute('target', '_blank');
    // preview.setAttribute('href', '/dev/api/certificate/attachment-preview/' + e.value);
    preview.innerHTML = '浏览';
    container.appendChild(preview);

    return el.appendChild(container);
  }

  function init(_ezTable) {
    ezTable.value = _ezTable;
  }

  function downloadClick(key, data) {
    let fileName = data.fileOriginName;
    Ez.DownloadFile('/api/certificate/attachment-download/' + key, fileName);
  }

  function previewClick(key) {
    Ez.PreviewFile('/api/certificate/attachment-preview/' + key);
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

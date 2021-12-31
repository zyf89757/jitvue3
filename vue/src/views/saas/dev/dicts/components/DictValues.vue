<template>
    <EzTable
    title="字典值"
    ref-name="DictValues"
    :data-source="dataSource"
    :page-size="10"
    :edit-mode="'row'"
    :show-more="false"
    :key-expr="'id'"
    :from-mode="false"
    :parent-key-expr="'pid'"
    selection-mode="single"
    :toolbar="[
      {
        name: 'import',
        type: 'Upload',
        title: '导入',
        props: { apiUrl: importDicts, uploadParams: { key: props.fromTypeId } },
        click: null,
        auth: ''
      },
      {
        name: 'bulkimport',
        type: 'Upload',
        title: '增量导入',
        props: { apiUrl: bulkimportDicts, uploadParams: { key: props.fromTypeId } },
        click: null,
        auth: ''
      }
    ]"
  >
    <DxColumn data-field="classify" caption="分类" width="160px" />
    <DxColumn data-field="value" caption="字典值" width="130px" />
    <DxColumn data-field="code" caption="编码" width="160px" />
    <DxColumn data-field="index" caption="查询码" width="160px" />
    <DxColumn caption="" />
  </EzTable>
</template>
<script lang="ts">
  import { ref, defineComponent, watchEffect } from 'vue';

  export default defineComponent({
    name: 'DictValues'
  });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { Ez } from '/@/utils/devexpress';
  import { ImportParams } from '/@/api/interface/common';
  import { defHttp } from '/@/utils/http/axios';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  const { uploadUrl = '' } = useGlobSetting();

  const props = defineProps({
    fromTypeId: {
      default: '',
      type: String
    }
  });

  const dataSource = ref({});
  function loadDataSource() {
    const url = `/api/dict/data`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { fromTypeId: props.fromTypeId },
      insertUrl: `${url}/create-dev`,
      insertParams: { typeId: props.fromTypeId },
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  async function importDicts(
    params: ImportParams,
    onUploadProgress: (progressEvent: ProgressEvent) => void
  ) {
    if (props.fromTypeId == '') createMessage.warn('请先选择字典类型.');
    else {
      const e: any = await defHttp.uploadFile(
        {
          url: uploadUrl + '/api/dict/data/import-all',
          onUploadProgress
        },
        params
      );

      if (e.data && !e.data.success) {
        createMessage.error(e.data.message);
      } else if (e.data && e.data.success) {
        createMessage.success(e.data.message);
      }
      return e;
    }
  }
  async function bulkimportDicts(
    params: ImportParams,
    onUploadProgress: (progressEvent: ProgressEvent) => void
  ) {
    if (props.fromTypeId == '') createMessage.warn('请先选择字典类型.');
    else {
      const e: any = await defHttp.uploadFile(
        {
          url: uploadUrl + '/api/dict/data/BulkImport',
          onUploadProgress
        },
        params
      );

      if (e.data && !e.data.success) {
        createMessage.error(e.data.message);
      } else if (e.data && e.data.success) {
        createMessage.success(e.data.message);
      }
      return e;
    }
  }
  watchEffect(() => {
    loadDataSource();
  });
</script>
<style lang="less" scoped></style>

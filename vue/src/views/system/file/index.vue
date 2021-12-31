<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="文件管理"
        ref-name="OrgsManager"
        :height="380"
        :data-source="dataSource"
        :page-size="10"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="true"
        :key-expr="'id'"
        :from-mode="false"
        :parent-key-expr="'pid'"
        :selection-changed="onSelectionChanged"
        selection-mode="single"
      >
        <DxColumn data-field="fileOriginName" caption="名称" width="130px" />
        <DxColumn data-field="fileSuffix" caption="后缀" width="60px" />
        <DxColumn data-field="fileBucket" caption="仓库" width="90px" />
        <DxColumn data-field="fileLocation" caption="存储位置" width="80px">
          <DxLookup :data-source="user_types" value-expr="value" display-expr="text"
        /></DxColumn>
        <DxColumn data-field="fileObjectName" caption="标识" width="220px" />
        <DxColumn data-field="businessCode" caption="业务类型编码" width="160px" />
        <DxColumn data-field="businessName" caption="业务类型名称" width="160px" />
        <DxColumn data-field="businessId" caption="业务关联id" width="160px" />
        <DxColumn data-field="remark" caption="备注" width="100px" />
      </EzTable>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({ name: 'SystemFiles' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
  import { BasicForm, FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { ref, reactive, watchEffect } from 'vue';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { Ez } from '/@/utils/devexpress';
  import { useAppStore } from '/@/store/modules/app';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  const dataSource = ref({});
  const formMoudceid = ref();
  let loadParams = reactive({ filename: '' });
  const appSize = useAppStore().getAppSize;
  function loadDataSourceContacts() {
    const url = `/api/service/file`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  const user_types = [
    { value: '1', text: '本地' },
    { value: '2', text: '阿里云' }
  ];
  const schemas: FormSchema[] = [
    {
      field: 'fileobj',
      component: 'Input',
      label: '请输入关键字',
      defaultValue: loadParams.filename,
      colProps: {
        span: 6
      }
    }
  ];
  const [register, { getFieldsValue }] = useForm({
    labelWidth: 100,
    compact: true,
    schemas: schemas,
    actionColOptions: {
      span: 24
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: true,
    showSubmitButton: true,
    showAdvancedButton: true,
    alwaysShowLines: 1
  });
  async function handleSubmit1() {
    var objvalue = await getFieldsValue();
    loadParams.filename = objvalue.fileobj;
  }
  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      formMoudceid.value = currentSelectedRowKeys[0];
    }
  }
  watchEffect(() => {
    loadDataSourceContacts();
  });
</script>

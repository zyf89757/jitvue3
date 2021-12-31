<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="证件管理"
        ref-name="tlTable"
        :height="0"
        :data-source="dataSource"
        :page-size="20"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="false"
        :more-items="[]"
        :selection-changed="onSelectionChanged"
        selection-mode="single"
        :form-mode="true"
        :form-mode-event="onFormModeEvent"
        :allow-adding="currentCustomerId != ''"
      >
        <DxColumn
          data-field="customerName"
          caption="所属客户"
          width="100px"
          :allowFiltering="false"
        />
        <DxColumn data-field="bsCode" caption="业务编号" width="140px" />
        <DxColumn data-field="orgCode" caption="企业编号" width="140px" />
        <DxColumn data-field="certTypeName" caption="证件类型" width="100px" />
        <DxColumn data-field="code" caption="证件号码" width="120px" />
        <DxColumn
          data-field="validity"
          caption="有效期"
          alignment="center"
          width="160px"
          :allowFiltering="false"
          :allow-editing="false"
        />
        <DxColumn
          data-field="count"
          caption="次数"
          alignment="center"
          width="120px"
          :allowFiltering="false"
          :allow-editing="false"
        />
        <DxColumn data-field="remark" caption="备注" :allowFiltering="false" />
        <DxColumn
          data-field="enabled"
          data-type="boolean"
          caption="状态"
          width="50px"
          :allowFiltering="false"
          :allow-editing="false"
          :cell-template="statusTemplate"
        />
      </EzTable>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'CertificateManager' });
</script>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';

  import { useAppStore } from '/@/store/modules/app';
  import { useGo } from '/@/hooks/web/usePage';
  import { searchSchemas } from './search.data';
  const appSize = useAppStore().getAppSize;

  const [register] = useForm({
    labelWidth: 120,
    schemas: searchSchemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });

  const dataSource = ref({});
  const currentCustomerId = ref('');
  const currentCustomerName = ref('');
  const currentStatus = ref(-1);

  function loadDataSource() {
    const url = `/api/certificate`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: {
        customerId: currentCustomerId.value,
        status: currentStatus.value
      },
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      //currentMenuId.value = currentSelectedRowKeys[0];
    }
  }

  function statusTemplate(el, e) {
    const container = document.createElement('span');
    console.log(e);
    let status = e.value ? '正常' : '停用';

    container.innerHTML =
      '<b' +
      (e.value == false ? ' class="ant-typography ant-typography-danger" ' : '') +
      '>' +
      status +
      '</b>';
    return el.appendChild(container);
  }

  const go = useGo();
  function onFormModeEvent(isUpdate, e) {
    var id = e?.data?.id ? e.data.id : 0;
    id = isUpdate ? id : 0;
    console.log(currentCustomerId.value);
    if (isUpdate) {
      go('/xyos/certificate/edit/' + id + '/' + e.data.customerId || '0');
    } else {
      go('/xyos/certificate/edit/' + id + '/' + currentCustomerId.value || '0');
    }
  }

  async function handleSubmit1(values: any) {
    currentCustomerId.value = values.customer;
    currentCustomerName.value = values.fromCustomerName;
    currentStatus.value = values.status;
    loadDataSource();
  }
</script>
<style lang="less" scoped></style>

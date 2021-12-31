<template>
  <PageWrapper>
    <EzSearch>
      <BasicForm @register="register" @submit="handleSubmit" />
    </EzSearch>
    <EzTable
      ref-name="dgProductDataHistory"
      title="历史产品资料库"
      :height="0"
      :data-source="dataSource"
      :page-size="5"
      :show-more="true"
      :toolbar="[
        {
          name: 'btn',
          type: 'primary',
          title: '将查询结果全部转存到正式库',
          click: btnclkbacktask,
          auth: '123'
        }
      ]"
      selection-mode="single"
      :more-items="[
        {
          name: 'enable',
          type: 'Button',
          title: '导入新库',
          click: toEnable,
          auth: '123'
        }
      ]"
      :form-mode="true"
      :more-items-filter="onMoreItemsFilter"
      :cell-template="statusTemplate"
    >
      <DxColumn
        data-field="isUpdata"
        data-type="boolean"
        caption="是否导入到库"
        width="100px"
        :allowFiltering="false"
        :allow-editing="false"
        :cell-template="statusTemplate"
      />
      <DxColumn data-field="historyTable" caption="数据来源" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="buildTime" caption="创建日期" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="userCompanyCustomsCode" caption="经营单位编码" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="userCompanyCustomsName" caption="经营单位" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="commodityNo" caption="物料号/货号" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="hsCode" caption="商品编码/税号" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="nameCn" caption="中文品名" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="declareElement" caption="申报要素" width="220px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="declareNorm" caption="申报规范" width="220px">
        <DxRequiredRule />
      </DxColumn>
    </EzTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ProductDataHistory' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { ref } from 'vue';
  import { useAppStore } from '/@/store/modules/app';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import { searchSchemas } from '../productHistorySearch.data';

  const appSize = useAppStore().getAppSize;

  const [register] = useForm({
    labelWidth: 150,
    schemas: searchSchemas,
    actionColOptions: {
      span: 24
    },
    compact: false,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });

  const currentfromhistoryTable = ref('');
  const currentfromisUpdata = ref('');
  const currentfromuserCompanyCustomsCode = ref('');
  const currentfromuserBuildTimeStart = ref('');
  const currentfromuserBuildTimeEnd = ref('');
  const dataSource = ref({});

  function loadDataSource() {
    const url = `/api/producthistory`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: {
        historyTable: currentfromhistoryTable.value,
        isUpdata: currentfromisUpdata.value,
        userCompanyCustomsCode: currentfromuserCompanyCustomsCode.value,
        buildTimeStart: currentfromuserBuildTimeStart.value,
        buildTimeEnd: currentfromuserBuildTimeEnd.value
      }
    });
  }

  enum Api {
    Enabled = '/api/producthistory/enable'
  }

  function toEnable(_item, e) {
    defHttp.post({ url: Api.Enabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }

  function onMoreItemsFilter(items, e) {
    return (
      items.filter((it) => {
        return it.name != (e.data.enabled ? 'enable' : 'disable');
      }) || []
    );
  }

  async function handleSubmit(_values: any) {
    console.log(_values.isUpdata);
    currentfromhistoryTable.value = _values.historyTable;
    currentfromisUpdata.value = _values.isUpdata;
    currentfromuserCompanyCustomsCode.value = _values.userCompanyCustomsCode;
    currentfromuserBuildTimeStart.value = _values.DatePickerstart;
    currentfromuserBuildTimeEnd.value = _values.DatePickerend;

    loadDataSource();
  }
  function btnclkbacktask() {
    console.log(currentfromisUpdata.value);
    if (currentfromisUpdata.value == 'true') {
      return;
    }

    defHttp.post(
      {
        url: `/api/product/add-back-task-inport`,
        params: {
          HistoryTable: currentfromhistoryTable.value,
          BuildTimeStart: currentfromuserBuildTimeStart.value,
          BuildTimeEnd: currentfromuserBuildTimeEnd.value,
          UserCompanyCustomsCode: currentfromuserCompanyCustomsCode.value
        }
      },
      { isToastMsg: true }
    );
  }
  function statusTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' +
      (e.value ? '>已导入' : ' class="ant-typography ant-typography-danger">未导入') +
      '</b>';
    return el.appendChild(container);
  }
</script>

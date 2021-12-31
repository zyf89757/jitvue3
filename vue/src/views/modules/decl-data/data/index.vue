<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit" />
      </EzSearch>
      <EzTable
        title="报关数据查询"
        ref-name="dgDecData"
        :data-source="dataSource"
        :page-size="20"
        :toolbar="[
          {
            name: 'btnGetDocs',
            type: 'primary',
            title: '随附单据',
            click: getDocs,
            auth: '123'
          },
          {
            name: 'btnDownloadDeclData',
            type: 'primary',
            title: '下载数据',
            click: downloadDeclData,
            auth: '123'
          }
        ]"
        :moreItems="[]"
        :show-more="false"
        :key-expr="'cusCiqNo'"
        selection-mode="single"
        :form-mode="false"
        :selection-changed="onSelectionChanged"
        :allow-updating="false"
        :allow-deleting="false"
        :allow-adding="false"
      >
        <DxColumn data-field="cusCiqNo" caption="统一编号" width="80px" />
        <DxColumn data-field="entryId" caption="报关单号" width="80px" />
        <DxColumn data-field="consigneeCname" caption="境内收发货人" width="80px" />
        <DxColumn data-field="rcvgdTradeScc" caption="境内收发货人18位社会信用代码" width="80px" />
        <DxColumn data-field="billNo" caption="提运单号" width="80px" />
        <DxColumn data-field="ieDate" caption="进出口日期" width="80px" />
        <DxColumn data-field="supvModeCddeName" caption="监管方式" width="80px" />
        <DxColumn data-field="contrNo" caption="合同协议号" width="80px" />
        <DxColumn data-field="goodsNum" caption="商品项数" width="80px" />
        <DxColumn data-field="trafName" caption="运输工具名称" width="80px" />
        <DxColumn data-field="cusDecStatusName" caption="报关状态" width="80px" />
        <DxColumn data-field="chktstFlagName" caption="是否查验" width="80px" />
        <DxColumn data-field="agentName" caption="申报单位名称" width="80px" />
        <DxColumn data-field="cusIEFlagName" caption="进出口标志" width="80px" />
        <DxColumn data-field="customMasterName" caption="申报地海关" width="80px" />
        <DxColumn data-field="ciqEntyPortCodeName" caption="入境/离境口岸" width="80px" />
        <DxColumn data-field="contaCount" caption="集装箱数" width="80px" />
        <DxColumn data-field="docsListStr" caption="随附单据" width="80px" />
      </EzTable>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'DeclDataList' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';

  import { useAppStore } from '/@/store/modules/app';
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { searchSchemas } from './declDataSearch.data';
  import { useGo } from '/@/hooks/web/usePage';

  const appSize = useAppStore().getAppSize;
  enum Api {
    DownloadDeclDATA = 'api/decl/data/download/excel'
  }

  const [register] = useForm({
    labelWidth: 150,
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
  const currentDeclDataKey = ref({});
  const currentDeclDataName = ref({});
  const dclTrnRelFlag = ref('');
  const etpsCategoryName = ref('');
  const ciqIEFlag = ref('');
  const entryId = ref('');
  const cusCiqNo = ref('');
  const cnsnTradeCode = ref('');
  const billNo = ref('');
  const customMaster = ref('');
  const updateTimeStart = ref('');
  const updateTimeEnd = ref('');
  const go = useGo();

  function loadDataSource() {
    const url = `/api/decl/data`;
    dataSource.value = Ez.CreateStore({
      key: 'cusCiqNo',
      loadParams: {
        dclTrnRelFlag: dclTrnRelFlag.value,
        etpsCategoryName: etpsCategoryName.value,
        ciqIEFlag: ciqIEFlag.value,
        entryId: entryId.value,
        cusCiqNo: cusCiqNo.value,
        cnsnTradeCode: cnsnTradeCode.value,
        billNo: billNo.value,
        customMaster: customMaster.value,
        updateTimeStart: updateTimeStart.value,
        updateTimeEnd: updateTimeEnd.value
      },
      loadUrl: `${url}/list`
    });
  }

  async function handleSubmit(values: any) {
    dclTrnRelFlag.value = values.dclTrnRelFlag;
    etpsCategoryName.value = values.etpsCategoryName;
    ciqIEFlag.value = values.CiqIEFlag;
    entryId.value = values.entryId;
    cusCiqNo.value = values.cusCiqNo;
    cnsnTradeCode.value = values.cnsnTradeCode;
    billNo.value = values.billNo;
    customMaster.value = values.customMaster;
    updateTimeStart.value = values.updateTimeStart;
    updateTimeEnd.value = values.updateTimeEnd;
    loadDataSource();
  }

  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys, selectedRowsData }) {
    if (currentSelectedRowKeys.length > 0) {
      currentDeclDataKey.value = currentSelectedRowKeys[0];
      currentDeclDataName.value = selectedRowsData[0].name;
    }
  }

  function getDocs() {
    go('/decl/browser/docs/' + currentDeclDataKey.value);
  }

  function downloadDeclData() {
    Ez.DownloadFile(Api.DownloadDeclDATA + '?cusCiqNo=' + currentDeclDataKey.value);
  }
</script>
<style lang="less" scoped></style>

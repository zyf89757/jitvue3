<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="数据仓库"
        ref-name="tlTable"
        :height="0"
        :data-source="dataSource"
        :page-size="20"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="false"
        :selection-changed="onSelectionChanged"
        :on-ready="onReady"
        selection-mode="single"
        :form-mode="false"
        :allow-adding="false"
        :allow-deleting="false"
        :allow-updating="false"
      >
        <DxColumn
          data-field="cusCiqNo"
          caption="统一编号"
          width="140px"
          :fixed="true"
          :fixed-position="'left'"
        />
        <DxColumn data-field="cusIEFlag" caption="进出口标识" width="80px" alignment="center" />
        <DxColumn data-field="dclrNo" caption="报关员编号" width="100px" />
        <DxColumn data-field="declPersonName" caption="申报人" width="140px" />
        <DxColumn data-field="createUser" caption="创建人" width="120px" />
        <DxColumn data-field="indbTime" caption="入库时间" width="100px" alignment="center" />
        <DxColumn data-field="updateTime" caption="更新时间" width="140px" alignment="center" />
        <DxColumn data-field="cusDecStatus" caption="状态代码" width="60px" alignment="center" />
        <DxColumn
          data-field="cusDecStatusName"
          caption="通关状态"
          width="80px"
          alignment="center"
        />
        <DxColumn data-field="hasDetails" caption="有明细" width="50px" />
        <DxColumn data-field="hasRet" caption="有回执" width="50px" />
        <DxColumn data-field="totalDocCount" caption="单据总数" width="60px" />
        <DxColumn data-field="docCount" caption="同步数" width="60px" />
        <DxColumn
          data-field="isSameDocCount"
          caption="单证一致"
          width="60px"
          alignment="center"
          :cell-template="SameTemplate"
        />
        <DxColumn caption="" />
        <DxColumn
          data-field="fileId"
          :fixed="true"
          :fixed-position="'right'"
          caption="操作"
          width="80px"
          alignment="center"
          :allowFiltering="false"
          :allow-editing="false"
          :cell-template="handlerTemplate"
        />
      </EzTable>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'DecData' });
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
    labelWidth: 130,
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
  const OwnerCode = ref('0');
  const Status = ref('');
  const Range = ref('');
  const CusCiqNo = ref('');
  const EntryId = ref('');
  const BillNo = ref('');
  const Batch = ref('');
  const Unit = ref('0');
  const CusCode = ref('');
  const UnitName = ref('');
  const DDate = ref('');
  const PDate = ref('');
  const dt = ref();

  function loadDataSource() {
    const url = `/api/data/dec`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: {
        ownerCode: OwnerCode.value,
        status: Status.value,
        range: Range.value,
        cusCiqNo: CusCiqNo.value,
        entryId: EntryId.value,
        billNo: BillNo.value,
        batch: Batch.value,
        unit: Unit.value,
        cusCode: CusCode.value,
        unitName: UnitName.value,
        dDate: DDate.value,
        pDate: PDate.value
      }
    });
  }

  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      //currentMenuId.value = currentSelectedRowKeys[0];
    }
  }

  function onReady(e) {
    dt.value = e;
  }

  const go = useGo();

  async function handleSubmit1(values: any) {
    OwnerCode.value = values.ownerCode;
    Status.value = values.status;
    Range.value = values.range;
    CusCiqNo.value = values.cusCiqNo;
    EntryId.value = values.entryId;
    BillNo.value = values.billNo;
    Batch.value = values.batch;

    Unit.value = values.unit;
    CusCode.value = values.cusCode;
    UnitName.value = values.unitName;
    DDate.value = values.dDate;
    PDate.value = values.pDate;
    loadDataSource();
    //dt.value.component.refresh();
  }

  function handlerTemplate(el, e) {
    const container = document.createElement('div');
    const preview = document.createElement('a');
    preview.onclick = function ({}) {
      previewClick(e.data.cusIEFlag, e.data.cusCiqNo);
    };

    preview.innerHTML = '详情';
    container.appendChild(preview);

    const span = document.createElement('span');
    span.innerHTML = ' | ';
    container.appendChild(span);

    const download = document.createElement('a');
    download.onclick = function ({}) {
      downloadClick(e.data.cusCiqNo);
    };

    download.innerHTML = '下载';
    container.appendChild(download);

    return el.appendChild(container);
  }

  function SameTemplate(el, e) {
    const container = document.createElement('div');
    const span = document.createElement('span');

    span.innerHTML =
      e.data.totalDocCount == e.data.docCount ? (e.data.totalDocCount > 0 ? '是' : '否') : '否';
    container.appendChild(span);
    return el.appendChild(container);
  }

  function downloadClick(key) {
    let fileName = 'doc-' + key + '.zip';
    Ez.DownloadFile('/api/data/dec/download/docs?Key=' + key, fileName);
  }

  function previewClick(cusIEFlag, cusCiqNo) {
    go('/xyos/datas/sw/' + cusIEFlag + '/' + cusCiqNo);
  }
</script>
<style lang="less" scoped></style>

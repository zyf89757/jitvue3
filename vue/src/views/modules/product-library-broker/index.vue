<template>
  <PageWrapper>
    <EzSearch>
      <BasicForm @register="registerproduct" @submit="handleSubmitproduct" />
    </EzSearch>
    <EzTable
      ref-name="dgProductData"
      title="产品资料库"
      :height="0"
      :data-source="dataSource"
      :page-size="20"
      :show-more="true"
      :toolbar="[]"
      :edit-mode="'row'"
      selection-mode="single"
      :allow-deleting="true"
      :form-mode="true"
      :more-items-filter="onMoreItemsFilter"
      :form-mode-event="onFormModeEvent"
      :cell-template="statusTemplate"
      :more-items="[
        {
          name: 'enable',
          type: 'Button',
          title: '启用',
          click: toEnable,
          auth: '123'
        },
        {
          name: 'disable',
          type: 'Button',
          title: '禁用',
          click: toDisable,
          auth: '123'
        }
      ]"
    >
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
      <DxColumn data-field="ciqCode" caption="Ciq编码" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="declareNorm" caption="申报规范" width="220px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="declareElement" caption="申报要素">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn
        data-field="sortNum"
        caption="排序"
        width="58px"
        :allowFiltering="false"
        sortOrder="desc"
      />
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
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ProductInfoData' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import { useAppStore } from '/@/store/modules/app';
  import { useGo } from '/@/hooks/web/usePage';
  import { searchpdSchemas } from './productSerch.data';
  const go = useGo();
  const appSize = useAppStore().getAppSize;

  const [registerproduct] = useForm({
    labelWidth: 120,
    schemas: searchpdSchemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true
  });
  const currentfromproductid = ref('');
  const dataSource = ref({});
  const currentfromcommodityNo = ref('');
  const currentfromisEnable = ref('');
  const currentfromuserCompanyCustomsCode = ref('');
  const currentfromhsCode = ref('');

  function loadDataSource() {
    const url = `/api/product`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: {
        commodityNo: currentfromcommodityNo.value,
        isEnable: currentfromisEnable.value == null ? true : currentfromisEnable.value,
        userCompanyCustomsCode: currentfromuserCompanyCustomsCode.value,
        hsCode: currentfromhsCode.value
      },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  async function handleSubmitproduct(_values: any) {
    currentfromcommodityNo.value = _values.commodityNo;
    currentfromisEnable.value = _values.isEnable;
    currentfromuserCompanyCustomsCode.value = _values.userCompanyCustomsCode;
    currentfromhsCode.value = _values.hsCode;

    loadDataSource();
  }
  loadDataSource();
  // 加载抽屉表单
  async function onFormModeEvent(_isUpdate, e) {
    console.log(_isUpdate);
    console.log(e?.data.id.toString());
    currentfromproductid.value = e?.data.id.toString();
    go(`/sys/orgs/addproduct/` + currentfromproductid.value);
  }

  enum Api {
    Enabled = '/api/product/enable',
    Disabled = '/api/product/disable'
  }
  function toEnable(_item, e) {
    defHttp.post({ url: Api.Enabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }

  function toDisable(_item, e) {
    defHttp.post({ url: Api.Disabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }
  function onMoreItemsFilter(items, e) {
    return (
      items.filter((it) => {
        return it.name != (e.data.enabled ? 'enable' : 'disable');
      }) || []
    );
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
</script>

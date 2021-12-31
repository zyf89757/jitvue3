<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="组织管理"
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
        :more-items-filter="onMoreItemsFilter"
        :selection-changed="onSelectionChanged"
        :init-new-row="onInitNewRow"
        selection-mode="single"
      >
        <DxColumn
          data-field="sName"
          caption="组织简称"
          width="90px"
          :fixed="true"
          :fixed-position="'left'"
        />
        <DxColumn data-field="code" caption="组织编码" width="130px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="fullName" caption="组织名称" width="160px" />
        <DxColumn data-field="typeCode" caption="企业类型" width="90px">
          <DxLookup :data-source="user_types" value-expr="value" display-expr="text" />
        </DxColumn>
        <DxColumn data-field="currentCustomsCode" caption="海关编码" width="90px">
          <DxStringLengthRule :min="10" :max="10" />
        </DxColumn>
        <DxColumn data-field="currentCustomsCiqNum" caption="检验检疫编码" width="90px">
          <DxStringLengthRule :min="10" :max="10" />
        </DxColumn>
        <DxColumn
          data-field="expiryDate"
          caption="有效期"
          format="yyyy-MM-dd"
          data-type="date"
          :allowFiltering="false"
          width="80px"
        />
        <DxColumn
          data-field="expiryDateEnabled"
          caption="启用有效期"
          :allowFiltering="false"
          width="80px"
        />
        <DxColumn data-field="country" caption="国家" width="80px" :allowFiltering="false" />
        <DxColumn data-field="city" caption="城市" width="80px" :allowFiltering="false" />
        <DxColumn data-field="address" caption="组织地址" width="180px" :allowFiltering="false" />
        <DxColumn data-field="tax" caption="传真" width="80px" :allowFiltering="false" />
        <DxColumn data-field="oldCustomsCode" caption="海关编码(旧)" width="100px">
          <DxStringLengthRule :max="10" />
        </DxColumn>
        <DxColumn data-field="oldCustomsCiqNum" caption="检验检疫编码(旧)" width="100px">
          <DxStringLengthRule :max="10" />
        </DxColumn>
        <DxColumn data-field="enName" caption="组织英文名称" width="180px" />
        <DxColumn data-field="enAddress" caption="组织英文地址" :allowFiltering="false" />
        <DxColumn
          data-field="sortNum"
          caption="排序"
          width="58px"
          :allowFiltering="false"
          sortOrder="asc"
        />
        <DxColumn
          data-field="enabled"
          data-type="boolean"
          caption="状态"
          width="50px"
          :allowFiltering="false"
          :allow-editing="false"
          :fixed="true"
          :fixed-position="'right'"
          :cell-template="statusTemplate"
        />
      </EzTable>
      <ContactTable :from-Org-Id="fromOrgId" />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'OrgsManager' });
</script>
<script lang="ts" setup>
  import ContactTable from './components/Contacts.vue';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule, DxStringLengthRule, DxLookup } from 'devextreme-vue/data-grid';
  import { BasicForm, FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { ref, reactive, watchEffect } from 'vue';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import { useAppStore } from '/@/store/modules/app';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  const user_types = [
    { value: '0', text: '服务商' },
    { value: '1', text: '货主' },
    { value: '2', text: '货代' },
    { value: '3', text: '报关行' },
    { value: '4', text: '运输商' },
    { value: '5', text: '单一窗口客户' }
  ];
  const dataSource = ref({});
  const fromOrgId = ref('');
  let loadParams = reactive({ code: '' });
  const appSize = useAppStore().getAppSize;
  function loadDataSourceContacts() {
    const url = `/api/org/manager`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  const schemas: FormSchema[] = [
    {
      field: 'orgs',
      component: 'Input',
      label: '请输入关键字:',
      defaultValue: loadParams.code,
      colProps: {
        span: 8
      }
    }
  ];
  const [register, { getFieldsValue }] = useForm({
    labelWidth: 125,
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
    loadParams.code = objvalue.orgs;
  }
  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      fromOrgId.value = currentSelectedRowKeys[0];
    }
  }

  function onInitNewRow(e) {
    e.data.enabled = true;
    e.data.sortNum = 100;
    e.data.expiryDateEnabled = true;
  }

  enum Api {
    Enabled = '/api/org/manager/enable',
    Disabled = '/api/org/manager/disable'
  }

  function toEnable(item, e) {
    defHttp.post({ url: Api.Enabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }

  function toDisable(item, e) {
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
    container.innerHTML =
      '<b' + (e.value ? '>启用' : ' class="ant-typography ant-typography-danger">禁用') + '</b>';
    return el.appendChild(container);
  }
  watchEffect(() => {
    loadDataSourceContacts();
  });
</script>

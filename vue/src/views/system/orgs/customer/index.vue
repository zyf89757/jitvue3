<template>
  <div>
    <PageWrapper>
      <!-- 加载查询tab -->
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <!-- 加载表单 -->
      <EzTable
        title="客户管理"
        ref-name="dgOrgCustomer"
        :data-source="dataSource"
        :page-size="20"
        :height="380"
        :toolbar="[]"
        :show-more="true"
        :key-expr="'id'"
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
        selection-mode="single"
        :form-mode="true"
        :form-mode-event="onFormModeEvent"
      >
        <DxColumn
          data-field="sName"
          caption="组织简称"
          width="90px"
          :fixed="true"
          :fixed-position="'left'"
        />
        <DxColumn data-field="code" caption="企业编码" width="100px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="fullName" caption="全称" />
        <DxColumn data-field="fromOrgId" caption="所属组织" width="180px">
          <DxRequiredRule />
          <DxLookup :data-source="getOrgs" display-expr="text" value-expr="value" />
        </DxColumn>
        <DxColumn data-field="fromDepartmentId" caption="所属部门" width="180px">
          <DxRequiredRule />
          <DxLookup :data-source="getDepts" display-expr="text" value-expr="value" />
        </DxColumn>
        <DxColumn data-field="currentCustomsCode" caption="海关十位编码" width="80px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="typeName" caption="企业类型" width="80px" />
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
        <DxColumn
          data-field="sortNum"
          caption="排序"
          width="58px"
          :allowFiltering="false"
          sortOrder="desc"
        >
          <DxRequiredRule />
        </DxColumn>
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
      <ContactTable :from-Org-Id="fromOrgId" />
    </PageWrapper>
    <!-- 注册抽屉 -->
    <CustomerDetail
      @register="registerDrawer"
      :on-submit-success="onSubmitSuccess"
      :Ord-Id="currentOrdId"
      :Depte-Id="currentDepteId"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  // 导出页面菜单配置
  export default defineComponent({ name: 'OrgCustomer' });
</script>
<script lang="ts" setup>
  import ContactTable from '/@/views/system/orgs/orgs/components/Contacts.vue';
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  // 加载表单
  import { useDrawer } from '/@/components/Drawer';
  import CustomerDetail from './CustomerDetail.vue';
  // 应用查询page
  import { useAppStore } from '/@/store/modules/app';
  import { searchSchemas } from './Search.data';
  // 初始化表单功能
  const appSize = useAppStore().getAppSize;

  const dataSource = ref({});
  const currentApplicationId = ref('');
  const fromOrgId = ref('');
  // 声明查询变量
  const currentOrdId = ref('');
  const currentDepteId = ref('');

  //初始化查询tab
  const [register] = useForm({
    labelWidth: 100,
    schemas: searchSchemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });
  //表单注册
  const [registerDrawer, { openDrawer }] = useDrawer();

  function onSubmitSuccess() {
    loadDataSource();
  }
  //加载表单数据带参
  function loadDataSource() {
    const url = `/api/orgs/customer`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: {
        formOrgId: currentOrdId.value,
        formDepartmentId: currentDepteId.value
      },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();
  // 表单的选中事件
  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      currentApplicationId.value = currentSelectedRowKeys[0];
      fromOrgId.value = currentSelectedRowKeys[0];
    }
  }

  //声明额外的api接口
  enum Api {
    Enabled = '/api/orgs/customer/enable',
    Disabled = '/api/orgs/customer/disable'
  }
  // 表单配置的函数事件
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

  // 查询功能，赋值
  async function handleSubmit1(values: any) {
    currentOrdId.value = values.org;
    currentDepteId.value = values.dept;
    loadDataSource();
  }
  // 加载抽屉表单
  function onFormModeEvent(isUpdate, e) {
    openDrawer(true, {
      record: e?.data,
      isUpdate: isUpdate
    });
  }
  // 新增组织的部门和所属
  function getOrgs() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/org/manager/current/orgs`
      })
    };
  }
  function getDepts() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/Department/get-all-department-by-orgkey`
      })
    };
  }
</script>
<style lang="less" scoped></style>

<template>
  <div>
    <PageWrapper>
      <!-- 加载查询tab -->
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <!-- 加载表单 -->
      <EzTable
        title="资料库管理"
        ref-name="dgBasicData"
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
        :allow-adding="currentCustomerId != ''"
      >
        <DxColumn
          data-field="materialNo"
          caption="物料号"
          width="90px"
          :fixed="true"
          :fixed-position="'left'"
        />
        <DxColumn data-field="erpNameCn" caption="物料描述" width="100px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="nameCn" caption="中文名称" />
        <DxColumn data-field="hsCode" caption="HSCode" />
        <DxColumn data-field="declareElement" caption="申报要素" />
        <DxColumn data-field="ciqCode" caption="CIQ" />
        <DxColumn data-field="declareUnit" caption="申报单位" />
        <DxColumn
          data-field="enabled"
          data-type="boolean"
          caption="状态"
          width="50px"
          :allowFiltering="false"
          :allow-editing="false"
          :cell-template="statusTemplate"
        />
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
      </EzTable>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  // 导出页面菜单配置
  export default defineComponent({ name: 'BasicData' });
</script>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/data-grid';
  import { useGo } from '/@/hooks/web/usePage';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  // 加载表单
  import { useDrawer } from '/@/components/Drawer';
  // /@/views/system/orgs/orgs/contacts/index.vue
  // 应用查询page
  import { useAppStore } from '/@/store/modules/app';
  import { searchSchemas } from '/@/views/system/orgs/customer/Search.data';
  // 初始化表单功能
  const appSize = useAppStore().getAppSize;

  const dataSource = ref({});
  const currentApplicationId = ref('');
  const fromOrgId = ref('');
  // 声明查询变量
  const currentOrdId = ref('');
  const currentDepteId = ref('');
  const currentCustomerId = ref('');
  const currentStatus = ref(-1);
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
    const url = `/api/basicdata/data`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/getlist`,
      loadParams: {
        customerId: currentCustomerId.value,
        status: currentStatus.value
      },
      insertUrl: `${url}/add/dev`,
      deleteUrl: `${url}/delete`
    });
  }
  //编辑跳转
  //这是跳转的页面
  const go = useGo();
  function onFormModeEvent(isUpdate, e) {
    var id = e?.data?.id ? e.data.id : 0;
    id = isUpdate ? id : 0;
    console.log(currentCustomerId.value);
    if (isUpdate) {
      go('/basic/manager/edit/' + id);
    } else {
      go('/basic/manager/edit/' + id);
    }
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
    Enabled = '/api/basicdata/data/enable',
    Disabled = '/api/basicdata/data/disable'
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
    currentCustomerId.value = values.customer;
    currentOrdId.value = values.org;
    currentDepteId.value = values.dept;
    loadDataSource();
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

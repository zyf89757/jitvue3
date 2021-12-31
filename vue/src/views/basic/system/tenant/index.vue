<template>
  <PageWrapper>
    <EzSearch>
      <BasicForm @register="register" @submit="handleSubmit" />
    </EzSearch>
    <EzTable
      title="租户管理"
      :data-source="dataSource"
      edit-mode="row"
      :selection-changed="onSelectionChanged"
      selection-mode="single"
      :form-mode="true"
      :form-mode-event="onFormModeEvent"
      :toolbar="[
        {
          name: 'btn1',
          type: 'default',
          color: 'danger',
          title: '即将过期租户',
          click: buttonEvent,
          tag: 'expiry',
          auth: '123'
        },
        {
          name: 'btn2',
          title: '提醒',
          type: 'default',
          click: buttonEvent,
          auth: '123',
          color: 'warning',
          tag: 'warning'
        },
        {
          name: 'btn3',
          title: '调整积分',
          click: buttonEvent,
          auth: '123',
          type: 'primary',
          tag: 'score'
        },
        {
          name: 'btn4',
          title: '更改数据库链接',
          click: buttonEvent,
          auth: '123',
          type: 'primary',
          tag: 'link'
        },
        {
          name: 'btn5',
          title: '变更管理员',
          click: buttonEvent,
          auth: '123',
          type: 'primary',
          tag: 'admin'
        }
      ]"
      :more-items="[
        {
          name: 'enable',
          type: 'Button',
          title: '上线',
          click: moreItemEvent,
          tag: 'enable',
          auth: '123'
        },
        {
          name: 'disable',
          type: 'Button',
          title: '下线',
          tag: 'disable',
          click: moreItemEvent,
          auth: '123'
        }
      ]"
      :more-items-filter="onMoreItemsFilter"
    >
      <DxColumn
        data-field="code"
        caption="编码"
        width="80"
        :fixed="true"
        :fixed-position="'left'"
      />
      <DxColumn
        data-field="name"
        caption="租户名称"
        width="200"
        :fixed="true"
        :fixed-position="'left'"
      />
      <DxColumn data-field="tenantAid" caption="识别码" width="90" />
      <DxColumn data-field="tenantType" caption="类型" width="80">
        <DxLookup :data-source="tenant_types" value-expr="value" display-expr="label" />
      </DxColumn>
      <DxColumn data-field="businessType" caption="业务类型" width="80">
        <DxLookup :data-source="busniess_types" value-expr="value" display-expr="label" />
      </DxColumn>
      <DxColumn data-field="superUserName" caption="超级管理员" width="100" />
      <DxColumn
        data-field="expiryDate"
        caption="有效期"
        data-type="date"
        format="yyyy-MM-dd"
        width="80"
        :allowFiltering="false"
      />
      <DxColumn
        data-field="expiryDateEnabled"
        caption="启用"
        data-type="boolean"
        width="50"
        :allowFiltering="false"
      />
      <DxColumn
        data-field="enabledCustomLogo"
        caption="自定义Logo"
        data-type="boolean"
        width="80"
        :allowFiltering="false"
      />
      <DxColumn data-field="levelScore" caption="积分" width="80" />
      <DxColumn
        data-field="cbyTime"
        caption="创建时间"
        data-type="date"
        width="80"
        :allowFiltering="false"
      />
      <DxColumn data-field="remark" caption="备注" :allowFiltering="false" />
      <DxColumn
        data-field="enabled"
        caption="上线"
        data-type="boolean"
        width="40"
        :allowFiltering="false"
        :fixed="true"
        :fixed-position="'right'"
      />
    </EzTable>
    <TenantDetail
      @register="registerDrawer"
      :on-submit-success="onSubmitSuccess"
      :on-submit-error="onSubmitError"
    />
    <ScoreModal @register="registerModal" @success="handelSuccess" />
    <ConnectStringModal @register="registerConStrModal" @success="handelSuccess" />
    <AdminForm
      @register="registerAdminModal"
      @success="handelSuccess"
      @user-data="currentSelectData"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'TenantManger'
  });
</script>
<script lang="ts" setup>
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { useAppStore } from '/@/store/modules/app';
  import { ref, reactive } from 'vue';
  import { useDrawer } from '/@/components/Drawer';
  import { Ez } from '/@/utils/devexpress';
  import { BasicForm, FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import TenantDetail from './components/TenantDetail.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import ScoreModal from './components/ScoreForm.vue';
  import ConnectStringModal from './components/ConnectionForm.vue';
  import AdminForm from './components/AdminForm.vue';
  import { enabledTenant, disableTenant } from '../../../../api/system/tenant-manager';

  const tenant_types = [
      { value: 1, label: '系统' },
      { value: 3, label: '正式' },
      { value: 2, label: '测试' },
      { value: 4, label: '体验' },
      { value: 0, label: '全部' }
    ],
    busniess_types = [
      { value: 'S', label: '服务商' },
      { value: 'O', label: '货主' },
      { value: 'B', label: '报关行' }
    ],
    dataSource = ref(),
    loadParams = reactive({
      tenantType: 0,
      searchValue: '',
      searchOverdue: false
    });
  const { createMessage } = useMessage();
  const [registerDrawer, { openDrawer }] = useDrawer();
  // 当前选中的数据
  let currentSelectData = reactive({
    id: '',
    superUserId: '',
    levelScore: '',
    connectionString: '',
    superUserName: ''
  });
  const appSize = useAppStore().getAppSize;
  const schemas: FormSchema[] = [
    {
      field: 'searchValue',
      component: 'Input',
      label: '租户编码/租户名',
      defaultValue: loadParams.searchValue,
      colProps: {
        span: 8
      }
    },
    {
      field: 'tenantType',
      component: 'Select',
      label: '类型',
      colProps: {
        span: 8
      },
      defaultValue: loadParams.tenantType,
      componentProps: {
        options: tenant_types
      }
    }
  ];
  const [register, { validate }] = useForm({
    labelWidth: 120,
    schemas: schemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 2
  });
  const [registerModal, { openModal: openModal }] = useModal();
  const [registerConStrModal, { openModal: openConstrModal }] = useModal();
  const [registerAdminModal, { openModal: openAdminModal }] = useModal();

  function loadDataSource() {
    const url = `/api/tenant`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      deleteUrl: `${url}/delete`
    });
  }
  loadDataSource();
  async function handleSubmit() {
    const values = await validate();
    console.log(values);
    loadParams.tenantType = values.tenantType;
    loadParams.searchValue = values.searchValue;
    loadParams.searchOverdue = false;
    loadDataSource();
  }

  function onSubmitSuccess() {
    loadDataSource();
  }
  function onSubmitError() {
    loadDataSource();
  }
  function onSelectionChanged({ component, currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      currentSelectData = reactive(component.getSelectedRowsData()[0]);
    } else {
      currentSelectData = reactive({
        id: '',
        levelScore: '',
        connectionString: '',
        superUserName: '',
        superUserId: ''
      });
    }
  }
  function onFormModeEvent(isUpdate, e) {
    var formData = e?.data;

    openDrawer(true, {
      record: formData,
      isUpdate: isUpdate
    });
  }
  function buttonEvent(e: any, item) {
    currentSelectData = reactive(e.getSelectedRowsData()[0]);
    const tag = item.tag;
    if (!currentSelectData?.id && tag != 'expiry') {
      return createMessage.error('请先选择租户！');
    }
    switch (tag) {
      case 'expiry':
        loadParams.searchOverdue = true;
        loadDataSource();
        break;
      case 'warning':
        createMessage.warn('待开发！');
        break;
      case 'link':
        // 更新数据库连接字符串
        openConstrModal(true, {
          connectionString: currentSelectData.connectionString,
          key: currentSelectData.id
        });
        break;
      case 'score':
        openModal(true, {
          score: currentSelectData.levelScore,
          key: currentSelectData.id
        });
        break;
      case 'admin':
        openAdminModal(true, {
          tenantId: currentSelectData.id,
          name: currentSelectData.superUserName,
          id: currentSelectData.superUserId
        });
        break;

      default:
        break;
    }
  }

  async function moreItemEvent(item, e) {
    const tag = item.tag;
    switch (tag) {
      case 'enable':
        const res1 = await enabledTenant({ key: e.key });
        if (res1) {
          e.component.refresh();
        }
        break;
      case 'disable':
        const res2 = await disableTenant({ key: e.key });
        if (res2) {
          e.component.refresh();
        }
        break;
      default:
        break;
    }
    //   case 'enabled':
    // const res = await enabledTenant({ key: currentSelectData.id });
    console.log(item, e);
  }
  function handelSuccess() {
    loadDataSource();
  }
  function onMoreItemsFilter(items, e) {
    return (
      items.filter((it) => {
        return it.name != (e.data.enabled ? 'enable' : 'disable');
      }) || []
    );
  }
</script>

<style scoped>
  .dx-item .line {
    height: 1px;
    background: #ddd;
  }
</style>

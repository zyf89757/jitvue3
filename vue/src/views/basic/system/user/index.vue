<template>
  <PageWrapper>
    <EzSearch v-if="isProvider">
      <BasicForm @register="register" @submit="handleSubmit" />
    </EzSearch>
    <div class="flex">
      <EzTable
        :data-source="dataSource"
        title="用户管理"
        editMode="row"
        :form-mode="true"
        :form-mode-event="onFormModeEvent"
        selection-mode="single"
        :selection-changed="onSelectionChanged"
        :class="isProvider ? '' : 'w-3/5'"
      >
        <!-- <DxColumn data-field="fkTenantId" caption="企业" v-if="isProvider">
          <DxRequiredRule />
          <DxLookup value-expr="id" display-expr="name" :data-source="tenantsData" />
        </DxColumn> -->
        <DxColumn data-field="account" caption="用户名"> <DxRequiredRule /></DxColumn>
        <DxColumn data-field="name" caption="姓名" />
        <DxColumn data-field="userType" caption="用户类型">
          <DxLookup :data-source="user_types" value-expr="value" display-expr="text" />
        </DxColumn>
        <DxColumn data-field="phoneNum" caption="手机号" :cell-template="phoneTemplate">
          <DxRequiredRule
        /></DxColumn>
        <DxColumn data-field="email" caption="邮箱" :cell-template="emailTemplate">
          <DxRequiredRule
        /></DxColumn>

        <DxColumn
          data-field="expiryDate"
          caption="用户有效期"
          :cell-template="expiryDateTemplate"
          data-type="date"
          format="yyyy-MM-dd HH:mm:ss"
        />

        <DxColumn
          data-field="passwordExpiryDate"
          caption="密码有效期"
          :cell-template="passwordDateTemplate"
          data-type="date"
          format="yyyy-MM-dd HH:mm:ss"
        />

        <DxColumn data-field="enabled" caption="是否启用" data-type="boolean" width="100" />
        <DxColumn
          data-field="phoneNumVerified"
          caption="手机号是否验证"
          data-type="boolean"
          :visible="false"
        />
        <DxColumn
          data-field="emailVerified"
          caption="邮箱是否验证"
          data-type="boolean"
          :visible="false"
        />
        <DxColumn
          data-field="expiryDateEnabled"
          caption="是否启用用户有效期"
          data-type="boolean"
          :visible="false"
        />
        <DxColumn
          data-field="passwordExpiryDateEnabled"
          caption="是否启用密码有效期"
          data-type="boolean"
          :visible="false"
        />
        <DxColumn data-field="password" caption="密码" :visible="false">
          <DxRequiredRule
        /></DxColumn>
      </EzTable>
      <UserBindEmployee class="w-2/5" :user-data="currentSelectData" v-if="!isProvider" />
    </div>
    <UserDetail
      @register="registerDrawer"
      :tenant-id="loadParams.tenantId"
      :on-submit-success="onSubmitSuccess"
      :on-submit-error="onSubmitError"
    />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'UserManger'
  });
</script>

<script lang="ts" setup>
  import { DxColumn, DxLookup, DxRequiredRule } from 'devextreme-vue/data-grid';
  import { ref, reactive, computed, unref } from 'vue';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { useDrawer } from '/@/components/Drawer';
  import { BasicForm, FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { useAppStore } from '/@/store/modules/app';
  import { useUserStore } from '/@/store/modules/user';
  import { Ez } from '/@/utils/devexpress';
  import UserDetail from './components/UserDetail.vue';
  import UserBindEmployee from './components/UserBindEmployee.vue';

  const user_types = [
    { value: '1', text: '超级管理员' },
    { value: '2', text: '管理员' },
    { value: '3', text: '普通用户' }
  ];
  const appSize = useAppStore().getAppSize;
  const userStore = useUserStore();
  const userInfo = computed(() => userStore.getUserInfo);
  const dataSource = ref();
  let currentSelectData = ref({});
  const isProvider = unref(userInfo).isProvider;
  // if (!isProvider) {
  //   loadParams.tenantId = unref(userInfo).tenantId;
  // }
  let loadParams = reactive({
    tenantId: isProvider ? '' : unref(userInfo).tenantId,
    searchValue: ''
  });
  const schemas: FormSchema[] = [
    {
      field: 'tenantId',
      component: 'ApiSelect',
      label: '租户',
      colProps: {
        span: 6
      },
      rules: [{ required: true }],
      componentProps: {
        api: Ez.TenantsData,
        immediate: false,
        resultField: 'data',
        labelField: 'name',
        valueField: 'id',
        onChange: (e) => {
          loadParams.tenantId = e;
        }
      }
    },
    {
      field: 'searchValue',
      component: 'Input',
      label: '用户名/账号',
      defaultValue: loadParams.searchValue,
      colProps: {
        span: 6
      }
    }
  ];
  loadDataSource();
  function loadDataSource() {
    const url = `/api/tenant/user`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      insertUrl: `${url}/create-dev`,

      updateUrl: `${url}/update-dev`,
      updateParams: { applicationId: 'ss222' },
      deleteUrl: `${url}/delete`
    });
  }
  function onSelectionChanged({ component, currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      currentSelectData.value = component.getSelectedRowsData()[0];
    } else {
      currentSelectData.value = {};
    }
  }
  const [register, { validate }] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });

  const [registerDrawer, { openDrawer }] = useDrawer();

  async function handleSubmit() {
    const values = await validate();
    loadParams.tenantId = values.tenantId;
    loadParams.searchValue = values.searchValue;
    loadDataSource();
  }

  function formatGuid(value) {
    return Ez.FormatGuid(value);
  }

  function onFormModeEvent(isUpdate, e) {
    var formData = e?.data;

    openDrawer(true, {
      record: formData,
      isUpdate: isUpdate
    });
  }
  function onSubmitSuccess() {
    loadDataSource();
  }
  function onSubmitError() {
    loadDataSource();
  }
  function phoneTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      formatGuid(e.text) +
      '<b' +
      (e.data.phoneVerified
        ? '>（已验证）'
        : ' class="ant-typography ant-typography-danger">（未验证）') +
      '</b>';
    return el.appendChild(container);
  }

  function emailTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      formatGuid(e.text) +
      '<b' +
      (e.data.emailVerified
        ? '>（已验证）'
        : ' class="ant-typography ant-typography-danger">（未验证）') +
      '</b>';
    return el.appendChild(container);
  }

  function expiryDateTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      formatGuid(e.text) +
      '<b' +
      (e.data.expiryDateEnabled
        ? '>（已启用）'
        : ' class="ant-typography ant-typography-danger">（未启用）') +
      '</b>';
    return el.appendChild(container);
  }

  function passwordDateTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      formatGuid(e.text) +
      '<b' +
      (e.data.passwordExpiryDateEnabled
        ? '>（已启用）'
        : ' class="ant-typography ant-typography-danger">（未启用）') +
      '</b>';
    return el.appendChild(container);
  }
</script>

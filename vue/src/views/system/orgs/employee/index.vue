<template>
  <PageWrapper contentClass="flex">
    <!-- 部门树组件 -->
    <DeptTree class="w-4/20" @select="handleSelect" />
    <EzTable
      class="w-12/20"
      title="员工管理"
      ref-name="dgEmployee"
      :data-source="dataSource"
      :page-size="20"
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
      :init-new-row="onInitNewRow"
    >
      <DxColumn data-field="code" caption="工号" width="100px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="name" caption="员工" width="120px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="phoneNum" caption="手机号" width="120px" />
      <DxColumn data-field="email" caption="邮箱" :allowFiltering="false" />
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
    <employeeRole class="w-4/20" :employee-id="employeeId" />
    <EmployeeDetail
      @register="registerDrawer"
      :on-submit-success="onSubmitSuccess"
      :org-id="orgId"
      :dept-id="deptId"
      :group-id="groupId"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'Employee' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import employeeRole from './components/employeeRole.vue';

  import { ref, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import EmployeeDetail from './employeeDetail.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useAppStore } from '/@/store/modules/app';
  // 引用部门组件
  import DeptTree from './components/orgtree.vue';

  const appSize = useAppStore().getAppSize;

  const dataSource = ref({});
  const employeeId = ref('');
  const orgId = ref('');
  const deptId = ref('');
  const groupId = ref('');

  function loadDataSource() {
    const url = `/api/employee`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      // 额外的查询功能字段
      loadParams: {
        orgId: `${orgId.value}`,
        deptId: `${deptId.value}`,
        groupId: `${groupId.value}`
      },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      employeeId.value = currentSelectedRowKeys[0];
    }
  }

  function onInitNewRow(e) {
    e.data.enabled = true;
    e.data.isSeparated = false;
    e.data.sortNum = 100;
  }

  enum Api {
    Enabled = '/api/employee/enable',
    Disabled = '/api/employee/disable'
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
  const [registerDrawer, { openDrawer }] = useDrawer();

  function onFormModeEvent(isUpdate, e) {
    // if (e?.data) {
    //   console.log(e);
    //   e.data.fieldTime = [];
    //   e.data.fieldTime.push(e.data.beginDate);
    //   e.data.fieldTime.push(e.data.endDate);
    // }
    openDrawer(true, {
      record: e?.data,
      isUpdate: isUpdate
    });
  }
  function onSubmitSuccess() {
    loadDataSource();
  }

  // 部门组件筛选事件
  async function handleSelect(Key = '') {
    var keys = Key.split('|');
    orgId.value = '';
    deptId.value = '';
    groupId.value = '';
    for (var i = 0; i < keys.length; i++) {
      if (i == 0) {
        orgId.value = keys[i];
      }
      if (i == 1) {
        deptId.value = keys[i];
      }
      if (i == 2) {
        groupId.value = keys[i];
      }
    }
    loadDataSource();
  }
  watchEffect(() => {
    loadDataSource();
  });
</script>
<style lang="less" scoped></style>

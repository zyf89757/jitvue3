<template>
  <PageWrapper contentClass="flex">
    <EzTable
      title="审批流程管理"
      ref-name="dgflow"
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
      selection-mode="single"
      :form-mode="true"
      :form-mode-event="onFormModeEvent"
      :init-new-row="onInitNewRow"
    >
      <DxColumn data-field="name" caption="流程名称" width="120px" />
      <DxColumn data-field="flowType" caption="流程分类" width="100px" />
      <DxColumn data-field="checkRole" caption="查看角色" width="120px">
        <DxLookup :data-source="Roles" display-expr="text" value-expr="value" />
      </DxColumn>
      <DxColumn data-field="system" caption="所属系统">
        <DxLookup :data-source="sys" display-expr="text" value-expr="value" />
      </DxColumn>
      <DxColumn data-field="modular" caption="所属模块">
        <DxLookup :data-source="modular" display-expr="text" value-expr="value" />
      </DxColumn>
      <DxColumn data-field="sortNum" caption="排序" width="58px" sortOrder="desc">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn
        data-field="enabled"
        data-type="boolean"
        caption="状态"
        width="50px"
        :allow-editing="false"
        :cell-template="statusTemplate"
      />
    </EzTable>
    <FlowDetail
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
  export default defineComponent({ name: 'Flow' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/data-grid';

  import { ref, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import FlowDetail from './components/flowDetail.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useAppStore } from '/@/store/modules/app';

  const appSize = useAppStore().getAppSize;

  const dataSource = ref({});
  const employeeId = ref('');
  const orgId = ref('');
  const deptId = ref('');
  const groupId = ref('');

  function loadDataSource() {
    const url = `/api/flow`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/getlist`,
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

  function onInitNewRow(e) {
    e.data.enabled = true;
    e.data.sortNum = 100;
  }

  enum Api {
    Enabled = '/api/flow/enable',
    Disabled = '/api/flow/disable'
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

  function getRoles() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/RoleBase/get-all-role`
      })
    };
  }
  function getsys() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/menu/get-applications`
      })
    };
  }

  function getmodular() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/menu/get-all-menus`
      })
    };
  }

  const Roles = getRoles();
  const sys = getsys();
  const modular = getmodular();
  watchEffect(() => {
    loadDataSource();
  });
</script>
<style lang="less" scoped></style>

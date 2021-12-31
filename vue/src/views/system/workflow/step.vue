<template>
  <PageWrapper>
    <!-- 加载查询tab -->
    <EzSearch>
      <BasicForm @register="register" @submit="handleSubmit1" />
    </EzSearch>
    <EzTable
      title="审批流程步骤管理"
      ref-name="dgflow"
      :data-source="dataSource"
      :page-size="20"
      :toolbar="[]"
      :show-more="true"
      :key-expr="'id'"
      :parent-key-expr="'pid'"
      :more-items="[]"
      :more-items-filter="onMoreItemsFilter"
      :selection-changed="onSelectionChanged"
      selection-mode="single"
      :form-mode="true"
      :form-mode-event="onFormModeEvent"
      :init-new-row="onInitNewRow"
    >
      <DxColumn data-field="stepName" caption="步骤名称" width="120px" />
      <DxColumn data-field="approveMethod" caption="审批模式" width="100px">
        <DxLookup :data-source="methods" display-expr="text" value-expr="value"
      /></DxColumn>
      <DxColumn data-field="previousStep" caption="上一步骤" width="100px">
        <DxLookup :data-source="steps" display-expr="text" value-expr="value"
      /></DxColumn>
      <DxColumn data-field="rejectStep" caption="驳回步骤" width="100px">
        <DxLookup :data-source="steps" display-expr="text" value-expr="value"
      /></DxColumn>
      <DxColumn data-field="checkRole" caption="查看角色" width="120px">
        <DxLookup :data-source="Roles" display-expr="text" value-expr="value" />
      </DxColumn>
      <DxColumn data-field="operationrole" caption="审批角色" width="120px">
        <DxLookup :data-source="Roles" display-expr="text" value-expr="value" />
      </DxColumn>
      <DxColumn data-field="businessCondition" caption="业务状态" />
      <DxColumn data-field="sortNum" caption="排序" width="58px" sortOrder="asc" />
    </EzTable>
    <StepDetail @register="registerDrawer" :on-submit-success="onSubmitSuccess" :flow-id="flowid" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'Step' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/data-grid';
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { ref, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import StepDetail from './components/stepDetail.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useAppStore } from '/@/store/modules/app';
  import { searchSchemas } from './components/seacher';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  const appSize = useAppStore().getAppSize;

  const dataSource = ref({});
  const flowid = ref('');

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
  // 查询功能，赋值
  async function handleSubmit1(values: any) {
    flowid.value = values.flowId;
    loadDataSource();
  }
  function loadDataSource() {
    const url = `/api/flowstep`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/getlist`,
      // 额外的查询功能字段
      loadParams: {
        flowid: `${flowid.value}`
      },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      // employeeId.value = currentSelectedRowKeys[0];
    }
  }

  function onInitNewRow(e) {
    e.data.enabled = true;
    e.data.isSeparated = false;
    e.data.sortNum = 100;
  }

  enum Api {
    Enabled = '/api/flowstep/enable',
    Disabled = '/api/flowstep/disable'
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
  function getRoles() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/RoleBase/get-all-role`
      })
    };
  }
  function getStep() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/flowstep/get-all-steps`
      })
    };
  }
  function getmethod() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/flowstep/get-all-method`
      })
    };
  }
  const methods = getmethod();
  const steps = getStep();
  const Roles = getRoles();
  watchEffect(() => {
    loadDataSource();
  });
</script>
<style lang="less" scoped></style>

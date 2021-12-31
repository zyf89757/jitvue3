<template>
  <PageWrapper>
    <!-- 加载查询tab -->
    <EzSearch>
      <BasicForm @register="register" @submit="handleSubmit1" />
    </EzSearch>
    <EzTable
      title="审批管理"
      ref-name="dgworkflow"
      :data-source="dataSource"
      :page-size="20"
      :toolbar="[]"
      :show-more="true"
      :key-expr="'id'"
      :parent-key-expr="'pid'"
      :more-items="[]"
      :selection-changed="onSelectionChanged"
      selection-mode="single"
      :form-mode="true"
      :form-mode-event="onFormModeEvent"
      :init-new-row="onInitNewRow"
      :allow-adding="false"
    >
      <DxColumn data-field="businessCode" caption="业务编码" width="120px" />
      <DxColumn data-field="flowName" caption="流程名称" width="120px" />
      <DxColumn data-field="stepName" caption="步骤名称" width="120px" />
      <DxColumn data-field="completeCondition" caption="审批状态" width="100px">
        <DxLookup :data-source="condition" display-expr="text" value-expr="value"
      /></DxColumn>
      <!-- 额外的字段 -->
      <template v-for="(item, i) in collist" :key="i">
        <DxColumn :data-field="item.field" :caption="item.caption" />
      </template>
    </EzTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'WorkFlow' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/data-grid';
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { ref, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import StepDetail from './components/stepDetail.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useAppStore } from '/@/store/modules/app';
  import { searchFlowSchemas } from './components/seacher';
  import { useGo } from '/@/hooks/web/usePage';
  import { GetWorkFlowFirst } from '/@/api/system/workflow';
  import { Item } from 'ant-design-vue/lib/menu';
  const appSize = useAppStore().getAppSize;

  const dataSource = ref({});
  const system = ref('');
  const modular = ref('');
  const flowid = ref('');
  const searchType = ref('0');

  const collist = ref([{ field: 'extraData', caption: '业务表字段自定义' }]);

  //初始化查询tab
  const [register] = useForm({
    labelWidth: 100,
    schemas: searchFlowSchemas,
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
    system.value = values.system == undefined ? '' : values.system;
    modular.value = values.modular == undefined ? '' : values.modular;
    flowid.value = values.flowId == undefined ? '' : values.flowId;
    searchType.value = values.searchType == undefined ? '' : values.searchType;
    loadDataSource();
  }

  async function loadDataSource() {
    debugger;
    const url = `/api/workflow`;
    collist.value.length = 0;
    if (flowid.value.length > 0) {
      debugger;
      let returndata = await GetWorkFlowFirst({ id: flowid.value });
      const names = ref([]);
      names.value = returndata.data[0].extraName.split('|');
      names.value.forEach((item, i) => {
        if (i == 0) {
          collist.value[i] = { field: 'extraData', caption: `${item}` };
        } else {
          collist.value[i] = { field: `extraData${i}`, caption: `${item}` };
        }
      });
    }

    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/getlist`,
      // 额外的查询功能字段
      loadParams: {
        system: `${system.value}`,
        modular: `${modular.value}`,
        flowid: `${flowid.value}`,
        searchType: `${searchType.value}`
      },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      // .value = currentSelectedRowKeys[0];
    }
  }

  function onInitNewRow(e) {
    e.data.enabled = true;
    e.data.isSeparated = false;
  }

  function statusTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' + (e.value ? '>启用' : ' class="ant-typography ant-typography-danger">禁用') + '</b>';
    return el.appendChild(container);
  }
  const [registerDrawer, { openDrawer }] = useDrawer();
  const go = useGo();
  //页面跳转
  function onFormModeEvent(isUpdate, e) {
    var id = e?.data?.id ? e.data.id : 0;
    go('/system/approve/edit/' + id + '/' + e.data.stepId + '/' + searchType.value);
  }
  function onSubmitSuccess() {
    loadDataSource();
  }

  function getcondition() {
    return {
      store: Ez.CreateStore({
        loadUrl: `/api/workflow/get-all-condition`
      })
    };
  }
  const condition = getcondition();
  watchEffect(() => {
    loadDataSource();
  });
</script>
<style lang="less" scoped></style>

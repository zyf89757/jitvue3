<template
  ><div>
    <ModuceForm :formMoudceid="formMoudceid" />
    <PageWrapper>
      <EzSearch class="headSerch">
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        class="ezzTable"
        title="组模型管理"
        ref-name="sysmodule"
        :height="380"
        :data-source="dataSource"
        :page-size="10"
        :edit-mode="'row'"
        :toolbar="[]"
        :selection-changed="onSelectionChanged"
        :show-more="false"
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
        selection-mode="single"
      >
        <DxColumn data-field="moduleName" caption="模型名称" width="130px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="groupName" caption="组名称" width="90px" />
        <DxColumn data-field="groupType" caption="组类型" width="160px" />
        <DxColumn data-field="remark" caption="说明" width="160px" />
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
    </PageWrapper>
    <RightDepoForm :fromgroupid="fromgroupid" @addSturs="addSturs" />
    <!-- <moduceForm /> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'DeTail',
    components: { BasicForm, EzTable, ModuceForm, RightDepoForm }
  });
</script>

<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import { watchEffect, ref, reactive, onActivated, onDeactivated } from 'vue';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import RightDepoForm from './Depolay.vue';
  import { Ez } from '/@/utils/devexpress';
  import { searchSchemas } from './Deta';
  import { useAppStore } from '/@/store/modules/app';
  import { defHttp } from '/@/utils/http/axios';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import ModuceForm from './moduceAdd.vue';
  const dataSource = ref({});
  const formMoudceid = ref();
  const afterMoid = ref();
  const fromgroupid = ref();
  const appSize = useAppStore().getAppSize;
  let loadParams = reactive({ groupType: '', moduleName: '', fromsysid: formMoudceid.value });
  function loadDataSourceContacts() {
    const url = `/api/module/group`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      insertUrl: `${url}/create-dev`,
      insertParams: { fromsysid: formMoudceid.value },
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  //初始化查询tab
  const [register, { getFieldsValue }] = useForm({
    labelWidth: 100,
    compact: true,
    schemas: searchSchemas,
    actionColOptions: {
      span: 24
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: true,
    showSubmitButton: true,
    showAdvancedButton: true,
    alwaysShowLines: 1
  });
  enum Api {
    Enabled = '/api/module/group/enable',
    Disabled = '/api/module/group/disable'
  }
  function toEnable(item, e) {
    defHttp.post({ url: Api.Enabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }
  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      fromgroupid.value = currentSelectedRowKeys[0];
      console.log(fromgroupid.value, '存');
      sessionStorage.setItem('groupkey', fromgroupid.value);
    }
  }
  function toDisable(item, e) {
    defHttp.post({ url: Api.Disabled, params: { Key: e.key } }, { isPopupMsg: true });
    e.component.refresh();
  }
  async function handleSubmit1() {
    var objvalue = await getFieldsValue();
    console.log(objvalue);
    loadParams.groupType = objvalue.moduleType;
    loadParams.moduleName = objvalue.sonModulName;
    loadParams.fromsysid = null;
    loadDataSourceContacts();
  }
  function onMoreItemsFilter(items, e) {
    return (
      items.filter((it) => {
        return it.name != (e.data.enabled ? 'enable' : 'disable');
      }) || []
    );
  }
  // function addSturs(addStaue) {
  //   if (addStaue == 1) {
  //     console.log(addStaue, '状态成功');
  //     loadDataSourceContacts();
  //     return (StausLoad.value = addStaue);
  //   }
  //   StausLoad.value = null;
  // }
  function statusTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' + (e.value ? '>启用' : ' class="ant-typography ant-typography-danger">禁用') + '</b>';
    return el.appendChild(container);
  }
  onActivated(() => {
    formMoudceid.value = sessionStorage.getItem('Formkey');
    console.log(formMoudceid.value, 'kkiud');
    loadParams.fromsysid = formMoudceid.value;
    loadDataSourceContacts();
  });
  onDeactivated(() => {
    afterMoid.value = sessionStorage.removeItem('Formkey');
    loadParams.fromsysid = afterMoid.value;
    formMoudceid.value = null;
  });
  watchEffect(() => {
    loadDataSourceContacts();
  });
</script>
<style>
  .ezzTable {
    width: 70%;
  }
  .headSerch {
    width: 70%;
  }
  /* .btnPo {
    float: right;
  } */
</style>

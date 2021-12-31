<template>
  <PageWrapper contentClass="flex">
    <!-- 部门树组件 -->
    <DeptTree class="w-4/20" @select="handleSelect" />
    <EzTable
      ref-name="SysEmpBind"
      title="小组管理"
      class="w-12/20"
      :height="0"
      :data-source="dataSource"
      :page-size="10"
      :edit-mode="'row'"
      :show-more="false"
      :toolbar="[]"
      :moreItems="[]"
      :init-new-row="onInitNewRow"
      :selection-changed="onSelectionChanged"
    >
      <DxColumn data-field="code" caption="小组编码" width="100px">
        <DxRequiredRule />
        <DxStringLengthRule :max="15" />
      </DxColumn>
      <DxColumn data-field="name" caption="小组名称" width="120px">
        <DxRequiredRule />
        <DxStringLengthRule :max="30" />
      </DxColumn>
      <DxColumn data-field="enName" caption="小组英文名称" />
      <DxColumn
        data-field="sortNum"
        caption="排序"
        width="68px"
        :allowFiltering="false"
        sortOrder="desc"
      />
    </EzTable>
    <BasicTree
      class="w-4/20"
      title="员工列表"
      :treeData="emptree"
      ref="treeRef"
      search
      toolbar
      :checkable="true"
      :checkedKeys="bindtreedata"
      @check="handleCheck"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'SysEmpBind' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule, DxStringLengthRule } from 'devextreme-vue/data-grid';
  import { ref, watch } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { TreeItem } from '/@/components/Tree/index';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { getEmployeeTree, getBindEmployeeTree, BindEmployee, RemoveEmployee } from './data';
  import { BasicTree, TreeActionType } from '/@/components/Tree/index';
  // 引用部门组件
  import DeptTree from './components/Orgtree.vue';
  const emptree = ref<TreeItem[]>([]);
  const dataSource = ref({});
  const orgId = ref('');
  const deptId = ref('');
  const groupId = ref('');
  const lastemployeeid = ref('');
  const bindtreedata = ref();
  const treeRef = ref<Nullable<TreeActionType>>(null);
  function loadDataSource() {
    const url = `/api/group`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { fromDptKey: deptId.value || '' },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  function onInitNewRow(e) {
    e.data.sortNum = 100;
    e.data.fromDptId = deptId.value;
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
        console.log(orgId.value);
      }
      if (i == 1) {
        deptId.value = keys[i];
        console.log(deptId.value);
      }
      if (i == 2) {
        groupId.value = keys[i];
        console.log(groupId.value);
      }
    }
    loadDataSource();
  }
  async function handleCheck(checkedKeys, e) {
    lastemployeeid.value = e.node.eventKey;
    var dataed = bindtreedata.value;
    if (dataed.includes(lastemployeeid.value)) {
      checkdata(false, groupId.value);
      bindtreedata.value = checkedKeys;
    } else {
      checkdata(true, groupId.value);
      bindtreedata.value = checkedKeys;
    }
  }
  function checkdata(isSave: boolean, groupIds: string) {
    if (isSave == true && groupId.value != '') {
      BindEmployee({
        GroupId: groupIds,
        EmployeeId: lastemployeeid.value
      });
    }
    if (isSave == false && groupId.value != '') {
      RemoveEmployee({
        GroupId: groupIds,
        EmployeeId: lastemployeeid.value
      });
    }
  }
  async function allOrgListApi() {
    var obj = await getEmployeeTree();
    emptree.value = obj.data;
    console.log(emptree.value, '11');
  }
  allOrgListApi();
  async function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      groupId.value = currentSelectedRowKeys[0];
      var bindata = await getBindEmployeeTree(groupId.value);
      bindtreedata.value = bindata.data;
    }
  }
  loadDataSource();
</script>
<style lang="less" scoped></style>

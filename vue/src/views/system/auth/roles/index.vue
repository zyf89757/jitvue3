<template>
  <div>
    <PageWrapper content-class="flex">
      <EzTable
        class="w-2/3"
        title="角色管理"
        ref-name="tlRole"
        :height="0"
        :data-source="dataSource"
        :page-size="20"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="false"
        :more-items="[]"
        :selection-changed="onSelectionChanged"
        selection-mode="single"
        :init-new-row="onInitNewRow"
        :form-mode="false"
      >
        <DxColumn data-field="code" caption="角色编码" width="80px">
          <DxRequiredRule />
          <DxStringLengthRule :max="30" />
        </DxColumn>
        <DxColumn data-field="name" caption="角色名称" width="120px">
          <DxRequiredRule />
          <DxStringLengthRule :max="30" />
        </DxColumn>
        <DxColumn data-field="sortNum" caption="排序" width="60px" :allowFiltering="false" />
        <DxColumn data-field="description" caption="描述" :allowFiltering="false" />
        <DxColumn
          data-field="enabled"
          data-type="boolean"
          caption="状态"
          width="56px"
          :allowFiltering="false"
          :cell-template="statusTemplate"
        />
      </EzTable>
      <BasicTree
        title="绑定菜单&emsp;&emsp;&emsp;&emsp;&emsp;"
        class="w-1/3"
        :height="0"
        toolbar
        search
        checkable
        strictly
        defaultExpandAll
        :tree-data="menuTreeData"
        v-model:checked-keys="menuChecked"
        :on-checked-all="checked"
        :on-unchecked-all="checked"
      />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'Role' });
  import { BasicTree } from '/@/components/Tree/index';
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule, DxStringLengthRule } from 'devextreme-vue/data-grid';
  import { ref, watch } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { getMenuList, getRoleMenus, saveMenu, removeMenu } from './data';

  const dataSource = ref({});
  const currentRoleId = ref('');
  const menuTreeData = ref([]);
  const menuChecked = ref([]);
  const lastRoleId = ref('');

  (async function () {
    const res = await getMenuList();
    menuTreeData.value = res.data;
  })();

  function loadDataSource() {
    const url = `/api/role`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
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

  async function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      currentRoleId.value = currentSelectedRowKeys[0];
      const result = await getRoleMenus(currentRoleId.value);
      menuChecked.value = result.data;
    }
  }

  function statusTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' + (e.value ? '>启用' : ' class="ant-typography ant-typography-danger">禁用') + '</b>';
    return el.appendChild(container);
  }

  function checked(s: (string | number)[]) {
    let isSave = s.length > 0;
    changeMenus(isSave, s);
  }

  function changeMenus(isSave: boolean, menuIds: any[]) {
    if (isSave == true && currentRoleId.value != '') {
      saveMenu({
        roleId: currentRoleId.value,
        menuId: menuIds
      });
    }
    if (isSave == false && currentRoleId.value != '') {
      removeMenu({
        roleId: currentRoleId.value,
        menuId: menuIds
      });
    }
  }

  watch(menuChecked, (newValue, oldValue) => {
    var oldSet = new Set(oldValue.checked);
    var newSet = new Set(newValue.checked);
    let save = new Set([...newSet].filter((x) => !oldSet.has(x)));
    let remove = new Set([...oldSet].filter((x) => !newSet.has(x)));
    if (currentRoleId.value == lastRoleId.value) {
      if (save.size > 0) {
        changeMenus(true, [...save]);
      }
      if (remove.size > 0) {
        changeMenus(false, [...remove]);
      }
    } else {
      lastRoleId.value = currentRoleId.value;
    }
  });
</script>
<style lang="less" scoped></style>

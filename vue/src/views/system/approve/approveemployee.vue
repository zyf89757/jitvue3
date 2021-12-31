<template>
  <PageWrapper contentClass="flex">
    <!-- 部门树组件 -->
    <DeptTree class="w-4/20" @select="handleSelect" />
    <EzTable
      class="w-12/20"
      title="审批员工角色管理"
      ref-name="dgEmployee"
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
      :init-new-row="onInitNewRow"
      :allow-adding="false"
      :allow-updating="false"
      :allow-deleting="false"
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
      />
    </EzTable>
    <employeeRole class="w-4/20" :employee-id="employeeId" />
  </PageWrapper>
</template>
<script lang="ts">
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import employeeRole from './components/employeeRole.vue';

  import { ref, watchEffect, defineComponent } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  import { useAppStore } from '/@/store/modules/app';
  // 引用部门组件
  import DeptTree from './components/orgtree.vue';
  import { object } from 'vue-types';

  // const appSize = useAppStore().getAppSize;

  // const dataSource = ref({});
  // const employeeId = ref('');
  // const orgId = ref('');
  // const deptId = ref('');
  // const groupId = ref('');

  // function loadDataSource() {
  //   const url = `/api/employee`;
  //   dataSource.value = Ez.CreateStore({
  //     key: 'id',
  //     loadUrl: `${url}/list`,
  //     // 额外的查询功能字段
  //     loadParams: {
  //       orgId: `${orgId.value}`,
  //       deptId: `${deptId.value}`,
  //       groupId: `${groupId.value}`
  //     },
  //     insertUrl: `${url}/create-dev`,
  //     updateUrl: `${url}/update-dev`,
  //     deleteUrl: `${url}/delete`
  //   });
  // }

  // loadDataSource();

  // function onSelectionChanged({ currentSelectedRowKeys }) {
  //   if (currentSelectedRowKeys.length > 0) {
  //     employeeId.value = currentSelectedRowKeys[0];
  //   }
  // }

  // function onInitNewRow(e) {
  //   e.data.enabled = true;
  //   e.data.isSeparated = false;
  //   e.data.sortNum = 100;
  // }

  // function onFormModeEvent(isUpdate, e) {}

  // // 部门组件筛选事件
  // async function handleSelect(Key = '') {
  //   var keys = Key.split('|');
  //   orgId.value = '';
  //   deptId.value = '';
  //   groupId.value = '';
  //   for (var i = 0; i < keys.length; i++) {
  //     if (i == 0) {
  //       orgId.value = keys[i];
  //     }
  //     if (i == 1) {
  //       deptId.value = keys[i];
  //     }
  //     if (i == 2) {
  //       groupId.value = keys[i];
  //     }
  //   }
  //   loadDataSource();
  // }
  // watchEffect(() => {
  //   loadDataSource();
  // });

  export default defineComponent({
    name: 'ApproveEmployee',
    components: {
      DxRequiredRule,
      DxColumn,
      EzTable,
      PageWrapper,
      DeptTree,
      employeeRole
    },
    props: {
      data: {
        type: Object,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: { basicdataid: '123' }
      },
      onSubmitSuccess: {
        type: Function
      },
      onSubmitError: {
        type: Function
      }
    },
    setup() {
      const url = `/api/employee`;
      const employeeId = ref('');
      const orgId = ref('');
      const deptId = ref('');
      const groupId = ref('');
      const dataSource = ref({});
      function onInitNewRow(e) {
        e.data.enabled = true;
        e.data.sortNum = 100;
      }
      function onSelectionChanged({ currentSelectedRowKeys }) {
        if (currentSelectedRowKeys.length > 0) {
          employeeId.value = currentSelectedRowKeys[0];
        }
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
        dataSource.value = Ez.CreateStore({
          key: 'id',
          loadUrl: `${url}/list`,
          // 额外的查询功能字段
          loadParams: {
            orgId: `${orgId.value}`,
            deptId: `${deptId.value}`
          }
        });
      }
      dataSource.value = Ez.CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        // 额外的查询功能字段
        loadParams: {
          orgId: `${orgId.value}`,
          deptId: `${deptId.value}`
        }
      });

      watchEffect(() => {
        dataSource.value;
      });
      return {
        dataSource: dataSource,
        appSize: useAppStore().getAppSize,
        onInitNewRow: onInitNewRow,
        onSelectionChanged: onSelectionChanged,
        handleSelect: handleSelect,
        employeeId
      };
    }
  });
</script>
<style lang="less" scoped></style>

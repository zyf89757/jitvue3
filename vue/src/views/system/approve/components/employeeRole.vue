<template>
  <EzTable
    ref-name="dgEmployeeRole"
    title="角色"
    :data-source="dataSource"
    :page-size="20"
    :edit-mode="'row'"
    :toolbar="[]"
    :show-more="false"
    :more-items="[]"
    :from-mode="false"
    :allow-adding="props.employeeId != ''"
    :allow-export="false"
    :allow-column-chooser="false"
  >
    <DxColumn data-field="roleId" caption="角色名" width="180px">
      <DxRequiredRule />
      <DxLookup :data-source="Roles" display-expr="text" value-expr="value" />
    </DxColumn>
  </EzTable>
</template>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/data-grid';
  import { ref, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';

  const props = defineProps({
    employeeId: {
      default: '',
      type: String
    }
  });

  const dataSource = ref({});

  function loaddataSource() {
    const url = `/api/employee`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/approverole`,
      loadParams: {
        key: props.employeeId
      },
      insertUrl: `${url}/addapproverole`,
      insertParams: { employeeId: props.employeeId },
      updateUrl: `${url}/updateapproverole`,
      deleteUrl: `${url}/deleteapproverole`
    });
  }

  function getRoles() {
    return {
      store: Ez.CreateStore({
        // key: 'EmployeeId',
        loadUrl: `/api/RoleBase/get-all-role`
      })
    };
  }

  const Roles = getRoles();

  watchEffect(() => {
    loaddataSource();
  });
</script>

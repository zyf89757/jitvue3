<template>
  <div>
    <EzTable
      ref-name=""
      title="绑定员工管理"
      :height="0"
      :data-source="dataSource"
      :page-size="10"
      :edit-mode="'row'"
      :show-more="true"
      :toolbar="[]"
      :allow-adding="false"
      :more-items="[
        {
          name: 'enable',
          type: 'Button',
          title: '上线',
          click: moreItemEvent,
          tag: 'enable',
          auth: '123'
        },
        {
          name: 'disable',
          type: 'Button',
          title: '下线',
          tag: 'disable',
          click: moreItemEvent,
          auth: '123'
        }
      ]"
      :more-items-filter="onMoreItemsFilter"
    >
      <DxColumn data-field="bindEmployeeName" caption="员工名" :allow-editing="false" />
      <DxColumn
        data-field="expiryDate"
        caption="有效期"
        data-type="date"
        :allow-filtering="false"
      />
      <DxColumn data-field="originTenantName" caption="租户来源" :allow-editing="false" />
      <DxColumn
        data-field="enabled"
        caption="启用"
        width="80"
        :allow-editing="false"
        data-type="boolean"
      />
    </EzTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'UserBindRole' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref, watchEffect, reactive } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { enabledBinddEmployee, disabledBindEmployee } from '/@/api/system/user-manager';

  const props = defineProps({
    userData: {
      default: null,
      type: Object
    }
  });

  console.log(props.userData);
  let loadParams = reactive({ tenantId: props.userData.fkTenantId, userId: props.userData.id });
  const dataSource = ref({});

  function loadDataSource() {
    const url = `/api/tenant/user/entrus/employee`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}`,
      loadParams: { ...loadParams },
      updateUrl: '/api/tenant/user/update-bind-employee'
    });
  }
  async function moreItemEvent(item, e) {
    const tag = item.tag;
    switch (tag) {
      case 'enable':
        const res1 = await enabledBinddEmployee({ key: e.key });
        if (res1) {
          e.component.refresh();
        }
        break;
      case 'disable':
        const res2 = await disabledBindEmployee({ key: e.key });
        if (res2) {
          e.component.refresh();
        }
        break;
      default:
        break;
    }
    //   case 'enabled':
    // const res = await enabledTenant({ key: currentSelectData.id });
    console.log(item, e);
  }
  function onMoreItemsFilter(items, e) {
    return (
      items.filter((it) => {
        return it.name != (e.data.enabled ? 'enable' : 'disable');
      }) || []
    );
  }
  watchEffect(() => {
    loadParams = reactive({ tenantId: props.userData.fkTenantId, userId: props.userData.id });
    loadDataSource();
  });
</script>

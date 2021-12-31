<template>
  <div>
    <EzTable
      title="联系人"
      ref-name="OrgsContacts"
      :height="300"
      :data-source="dataSourceContacts"
      :page-size="10"
      :edit-mode="'row'"
      :toolbar="[]"
      :show-more="true"
      :key-expr="'id'"
      :from-mode="false"
      :parent-key-expr="'pid'"
      :allow-adding="props.fromOrgId != ''"
      :more-items="[
        {
          name: 'enable',
          type: 'Button',
          title: '接受通知',
          click: toEnable,
          auth: '123'
        },
        {
          name: 'disable',
          type: 'Button',
          title: '取消通知',
          click: toDisable,
          auth: '123'
        }
      ]"
      :more-items-filter="onMoreItemsFilter"
      selection-mode="single"
    >
      <DxColumn data-field="name" caption="联系人" width="100px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="position" caption="职位" width="100px" />
      <DxColumn data-field="gender" caption="性别" width="50px">
        <DxLookup :data-source="user_types" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="phoneNum" caption="手机号" width="100px" />
      <DxColumn data-field="email" caption="邮箱" width="150px" />
      <DxColumn data-field="postcode" caption="邮编" width="80px" :allowFiltering="false" />
      <DxColumn data-field="address" caption="地址" :allowFiltering="false" />
      <DxColumn
        width="60px"
        data-field="receiveMessage"
        data-type="boolean"
        caption="接受通知"
        :allowFiltering="false"
        :allow-editing="false"
        :fixed="true"
        :fixed-position="'right'"
        :cell-template="statusTemplate"
      />
    </EzTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'OrgsContacts' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/data-grid';
  import { ref, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';

  const user_types = [
    { value: '0', text: '女' },
    { value: '1', text: '男' }
  ];

  const props = defineProps({
    fromOrgId: {
      default: '',
      type: String
    }
  });
  const dataSourceContacts = ref({});
  function loadDataSourceContacts() {
    const url = `/api/org/contacts`;
    dataSourceContacts.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { fromOrgId: props.fromOrgId },
      insertUrl: `${url}/create-dev`,
      insertParams: { fromOrgId: props.fromOrgId },
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  enum Api {
    Enabled = '/api/org/contacts/enable',
    Disabled = '/api/org/contacts/disable'
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
        return it.name != (e.data.receiveMessage ? 'enable' : 'disable');
      }) || []
    );
  }

  function statusTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' + (e.value ? '>接受' : ' class="ant-typography ant-typography-danger">禁止') + '</b>';
    return el.appendChild(container);
  }

  watchEffect(() => {
    loadDataSourceContacts();
  });
</script>

<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTreeList
        title="菜单管理"
        ref-name="tlMenus"
        :data-source="dataSource"
        :page-size="100"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="false"
        :key-expr="'id'"
        :parent-key-expr="'pid'"
        :selection-changed="onSelectionChanged"
        selection-mode="single"
        :form-mode="true"
        :form-mode-event="onFormModeEvent"
      >
        <DxColumn
          caption=" "
          width="50px"
          :allowFiltering="false"
          :allowSorting="false"
          :allowResizing="false"
          :allowEditing="false"
        />
        <DxColumn data-field="name" caption="菜单名称" width="180px" />
        <DxColumn data-field="type" caption="菜单类型" width="180px" :allowFiltering="true">
          <DxLookup :data-source="menuTypes" value-expr="value" display-expr="text" />
        </DxColumn>
        <DxColumn
          data-field="icon"
          caption="图标"
          width="60px"
          :allowFiltering="false"
          :cell-template="iconTemplate"
        />
        <DxColumn data-field="component" caption="组件" :allowFiltering="false" />
        <DxColumn data-field="router" caption="路由地址" :allowFiltering="false" />
        <DxColumn data-field="redirect" caption="重定向" :allowFiltering="false" />
        <DxColumn
          data-field="sortNum"
          caption="排序"
          width="58px"
          :allowFiltering="false"
          sortOrder="asc"
        />
      </EzTreeList>
    </PageWrapper>
    <MenuDetails
      @register="registerDrawer"
      :on-submit-success="onSubmitSuccess"
      :application-id="currentApplicationId"
      :menu-id="currentMenuId"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'SysMenus' });
</script>
<script lang="ts" setup>
  import { menuTypes } from '/@/enums/saas/baseType';
  import { BasicForm, FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';
  //import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { EzTreeList } from '/@/components/EzControls/EzTreeList';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDetails from './components/MenuDetails.vue';
  import { appListApi } from '/@/api/saas/app/menuManage';
  import Icon from '/@/components/Icon/index';

  import { useAppStore } from '/@/store/modules/app';
  const appSize = useAppStore().getAppSize;

  const getSchamas = (): FormSchema[] => {
    return [
      {
        field: 'field',
        component: 'ApiSelect',
        label: '所属应用',
        rules: [{ required: true }],
        componentProps: {
          api: appListApi,
          resultField: 'data',
          labelField: 'text',
          valueField: 'value',
          immediate: true,
          onChange: (e) => {
            currentApplicationId.value = e;
            currentMenuId.value = '';
          }
        },
        colProps: {
          span: 8
        }
      }
    ];
  };

  const [register] = useForm({
    labelWidth: 120,
    schemas: getSchamas(),
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });

  const dataSource = ref({});
  const currentApplicationId = ref('');
  const currentMenuId = ref('');

  const [registerDrawer, { openDrawer }]: any = useDrawer();

  function loadDataSource() {
    const url = `/api/menu`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { appId: currentApplicationId.value },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();

  function onSelectionChanged({ currentSelectedRowKeys }) {
    if (currentSelectedRowKeys.length > 0) {
      currentMenuId.value = currentSelectedRowKeys[0];
    } else {
      currentMenuId.value = '';
    }
  }

  function onSubmitSuccess() {
    loadDataSource();
  }

  function onFormModeEvent(isUpdate, e) {
    if (e?.data) {
      e.data.openType = e?.data.openType.toString();
      e.data.type = e.data.type.toString();
    }
    openDrawer(true, {
      record: e?.data,
      isUpdate: isUpdate
    });
  }

  async function handleSubmit1() {
    loadDataSource();
  }

  function iconTemplate(el, e) {
    Ez.RenderComponent(el, Icon, { icon: e.value, size: 14 });
  }
</script>
<style lang="less" scoped></style>

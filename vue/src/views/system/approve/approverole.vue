<template>
  <div>
    <PageWrapper content-class="flex">
      <EzTable
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
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule, DxStringLengthRule } from 'devextreme-vue/data-grid';
  import { ref, defineComponent } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { useAppStore } from '/@/store/modules/app';

  // const appSize = useAppStore().getAppSize;

  // const dataSource = ref({});

  // function loadDataSource() {
  //   const url = `/api/role`;
  //   dataSource.value = Ez.CreateStore({
  //     key: 'id',
  //     loadUrl: `${url}/list`,
  //     insertUrl: `${url}/create-dev`,
  //     updateUrl: `${url}/update-dev`,
  //     deleteUrl: `${url}/delete`
  //   });
  // }

  // loadDataSource();

  // function onInitNewRow(e) {
  //   e.data.enabled = true;
  //   e.data.sortNum = 100;
  // }

  // async function onSelectionChanged({ currentSelectedRowKeys }) {
  //   if (currentSelectedRowKeys.length > 0) {
  //   }
  // }

  // function statusTemplate(el, e) {
  //   const container = document.createElement('span');
  //   container.innerHTML =
  //     '<b' + (e.value ? '>启用' : ' class="ant-typography ant-typography-danger">禁用') + '</b>';
  //   return el.appendChild(container);
  // }

  export default defineComponent({
    name: 'Approverole',
    components: {
      DxRequiredRule,
      DxColumn,
      DxStringLengthRule,
      EzTable,
      PageWrapper
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
    setup(props, { emit }) {
      const url = `/api/rolebase`;
      function onInitNewRow(e) {
        e.data.enabled = true;
        e.data.sortNum = 100;
      }
      function onSelectionChanged(e) {
        if (e.length > 0) {
        }
      }

      function statusTemplate(el, e) {
        const container = document.createElement('span');
        container.innerHTML =
          '<b' +
          (e.value ? '>启用' : ' class="ant-typography ant-typography-danger">禁用') +
          '</b>';
        return el.appendChild(container);
      }
      return {
        dataSource: Ez.CreateStore({
          key: 'id',
          loadUrl: `${url}/list`,
          insertUrl: `${url}/create-dev`,
          updateUrl: `${url}/update-dev`,
          deleteUrl: `${url}/delete`
        }),
        appSize: useAppStore().getAppSize,
        onInitNewRow: onInitNewRow,
        onSelectionChanged: onSelectionChanged,
        statusTemplate: statusTemplate
      };
    }
  });
</script>
<style lang="less" scoped></style>

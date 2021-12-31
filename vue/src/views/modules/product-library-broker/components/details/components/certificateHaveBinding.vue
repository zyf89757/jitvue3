<template>
  <div>
    <PageWrapper>
      <EzTable
        title="已经绑定的证件"
        ref-name="tlTable"
        :height="0"
        :data-source="dataSource"
        :page-size="20"
        :edit-mode="'row'"
        :toolbar="[]"
        :show-more="false"
        :allow-adding="false"
        selection-mode="single"
        :form-mode="true"
      >
        <DxColumn
          data-field="customerName"
          caption="所属客户"
          width="100px"
          :allowFiltering="false"
        />
        <DxColumn data-field="bsCode" caption="业务编号" width="120px" />
        <DxColumn data-field="orgCode" caption="企业编号" width="100px" />
        <DxColumn data-field="certType" caption="证件类型" width="100px" />
        <DxColumn data-field="code" caption="证件号码" width="120px" />
      </EzTable>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'HaveBingCertificate' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { useRoute } from 'vue-router';

  const dataSource = ref({});
  const route = useRoute();
  const productID = route.params?.id.toString();

  function loadDataSource() {
    const url = `/api/certificate`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/certificates-bind-key`,
      loadParams: { Key: productID.toString() },
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();
</script>
<style lang="less" scoped></style>

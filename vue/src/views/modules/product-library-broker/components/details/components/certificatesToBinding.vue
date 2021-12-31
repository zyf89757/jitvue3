<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="需要绑定的证件"
        ref-name="tlTable"
        :height="0"
        :show-more="true"
        :data-source="dataSource"
        :page-size="20"
        :edit-mode="'row'"
        :toolbar="[]"
        :allow-adding="false"
        :more-items="[
          {
            name: 'disable',
            type: 'Button',
            title: '绑定',
            click: toBinding,
            auth: '123'
          }
        ]"
        :more-items-filter="onMoreItemsFilter"
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
  export default defineComponent({ name: 'ToBingcertificate' });
</script>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';

  import { useAppStore } from '/@/store/modules/app';
  import { searchSchemas } from '../certificatesToBindingSearch.data';
  import { defHttp } from '/@/utils/http/axios';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const index = route.params?.id.toString();

  const props = defineProps({
    currentProductKey: {
      default: '',
      type: String
    },
    currentCommodityNo: {
      default: '',
      type: String
    },
    currentNameCn: {
      default: '',
      type: String
    }
  });

  const appSize = useAppStore().getAppSize;

  const [register] = useForm({
    labelWidth: 120,
    schemas: searchSchemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });

  const dataSource = ref({});
  const currentCustomerName = ref('');
  const currentcertTypeName = ref('');
  const currentStatus = ref(0);

  function loadDataSource() {
    const url = `/api/certificate`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: {
        customerId: currentCustomerName.value,
        status: currentStatus.value
      },
      deleteUrl: `${url}/delete`
    });
  }

  loadDataSource();

  function onMoreItemsFilter(items, e) {
    return (
      items.filter((it) => {
        return it.name != (e.data.enabled ? 'enable' : 'disable');
      }) || []
    );
  }

  async function toBinding(_item, e) {
    const e1 = await defHttp.post(
      {
        url: '/api/certificate/createbind',
        params: {
          CertificateId: e.data.id,
          BindKey: index.toString(),
          MaterialId: props.currentCommodityNo.toString(),
          Material: props.currentNameCn
        }
      },
      { isPopupMsg: true }
    );
    console.log(e1);
    e.component.refresh();
  }

  async function handleSubmit1(values: any) {
    currentCustomerName.value = values.fromCustomerName;
    currentcertTypeName.value = values.certTypeName;
    currentStatus.value = values.status;
    loadDataSource();
  }
</script>
<style lang="less" scoped></style>

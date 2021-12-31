<template>
  <PageWrapper title="产品信息">
    <a-card title="物料管理" :bordered="false" class="!mt-5">
      <BasicForm
        @register="register"
        @submit="handleSubmit"
        :submitButtonOptions="{ text: '确认' }"
      />
    </a-card>
    <div class="flex">
      <HaveBinding class="w-1/2" :current-productKey="currentProductKey" />
      <Binding
        class="w-1/2"
        :current-productKey="currentProductKey"
        :current-commodityNo="currentCommodityNo"
        :current-nameCn="currentNameCn"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ProductInfoList' });
</script>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { PageWrapper } from '/@/components/Page';
  import { productsUpdate, getProductsAddition, AdditionProducts } from '../../../api/product';
  import { additionSchemas } from '../productInformation.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';

  import Binding from './certificatesToBinding.vue';
  import HaveBinding from './certificateHaveBinding.vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const { setTitle } = useTabs();

  const { createMessage } = useMessage();
  const appSize = useAppStore().getAppSize;
  const currentProductKey = ref('');
  const currentCommodityNo = ref('');
  const currentNameCn = ref('');
  const route = useRoute();
  const productId = route.params?.id.toString();
  const isNew = ref(route.params?.id == 'undefined' || route.params?.id == ':id');

  const [register, { validate, setFieldsValue }] = useForm({
    schemas: additionSchemas,
    actionColOptions: {
      span: 24
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: true,
    showSubmitButton: true,
    autoSetPlaceHolder: true
  });

  async function loadData() {
    if (isNew.value) {
      setTitle('新增产品资料详情信息');
    } else {
      setTitle(`编辑产品资料详情信息` + productId);
      console.log('isNew.value');
      console.log(isNew.value);
      let result = await getProductsAddition(productId);
      console.log(result.data);
      if (result != null && result.code == 200) setFieldsValue(result.data);
      currentCommodityNo.value = result.data.commodityNo;
      currentNameCn.value = result.data.nameCn;
    }
  }
  setTimeout(function () {
    loadData();
  }, 500);
  async function handleSubmit() {
    try {
      const values = await validate();
      let result;
      if (isNew.value) {
        result = await AdditionProducts(values);
      } else {
        result = await productsUpdate(productId, values);
      }
      console.log(result);
      if (result != null && result.success) createMessage.success('修改成功！');
      else createMessage.error(result.message);
    } finally {
    }
  }
</script>
<style lang="less" scoped></style>

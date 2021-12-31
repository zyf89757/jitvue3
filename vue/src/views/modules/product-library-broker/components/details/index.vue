<template>
  <div>
    <DetailsWrapper
      title="编辑"
      :toolbar-left="leftBtns"
      :toolbar-right="rightBtns"
      :tab-list="tabList"
      tab-active-key="1"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({ name: 'ProductInfoTab' });
</script>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { ButtonProps } from '/@/api/interface/common';
  import { DetailsWrapper } from '/@/components/EzControls/EzPage';
  import { ProductList, CertAttachments, ProductHistory } from './components/index';
  import { uploadAttachmentProduct, importDicts } from '../../api/product';

  const route = useRoute();
  const proID = route.params?.id.toString();

  var clickName = ref('');
  var count = ref(0);
  var activeKey = ref('');
  var istobacktask = ref('');

  const leftBtns = [
    {
      name: 'reset',
      type: 'Button',
      title: '重置',
      enabled: ['1'],
      click: onClickButton,
      auth: '123'
    },
    {
      name: 'refresh',
      type: 'Button',
      title: '刷新',
      visibled: ['2', '3'],
      click: onClickButton,
      auth: ''
    },
    {
      name: 'upload',
      type: 'Upload',
      title: '上传附件',
      enabled: ['2'],
      props: { apiUrl: uploadAttachmentProduct, uploadParams: { productId: proID } },
      visibled: ['2'],
      click: null,
      auth: ''
    },
    {
      name: 'upload',
      type: 'Upload',
      title: '导入Excel',
      enabled: ['1'],
      props: { apiUrl: importDicts, uploadParams: { productId: proID } },
      visibled: ['1'],
      click: null,
      auth: ''
    }
  ];

  let rightBtns = ref([
    {
      name: 'save',
      type: 'primary',
      title: '保存',
      enabled: ['1'],
      click: onClickButton,
      auth: '​'
    }
  ]);

  const tabList = [
    {
      key: '1',
      title: '物料信息',
      component: ProductList,
      props: { activeKey, clickName, count }
    },
    {
      key: '2',
      title: '技术资料（附件）',
      component: CertAttachments,
      props: { activeKey, clickName, count }
    },
    {
      key: '3',
      title: '历史资料导入',
      component: ProductHistory,
      props: { activeKey, clickName, count, istobacktask }
    }
  ];

  function onClickButton(btn: ButtonProps, key: string) {
    clickName.value = btn.name;
    count.value = ++count.value;
    console.log(key);
    activeKey.value = key;
  }
</script>

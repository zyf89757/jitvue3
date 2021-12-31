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
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'CertificateEdit' });
</script>
<script lang="ts" setup>
  import { DetailsWrapper } from '/@/components/EzControls/EzPage';
  import { CertInfo, CertAttachments, CertRecords } from './components/index';
  import { ButtonProps } from '/@/api/interface/common';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { uploadAttachment } from '/@/api/sys/upload';
  const route = useRoute();
  const cfId = route.params?.id.toString();
  const disabled = ref(cfId == '0' ? true : false);

  let leftBtns = [
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
      props: { apiUrl: uploadAttachment, uploadParams: { certificateId: cfId } },
      visibled: ['2'],
      click: null,
      auth: ''
    }
  ];
  var clickName = ref('');
  var count = ref(0);
  var activeKey = ref('');

  let rightBtns = ref([
    {
      name: 'save',
      type: 'primary',
      title: '保存',
      enabled: ['1'],
      click: onClickButton,
      auth: '​api:certificate​:create'
    }
  ]);
  const tabList = [
    {
      key: '1',
      title: '信息',
      component: CertInfo,
      props: { activeKey, clickName, count }
    },
    {
      key: '2',
      title: '附件',
      disabled: disabled.value,
      component: CertAttachments,
      props: { activeKey, clickName, count, certId: cfId }
    },
    {
      key: '3',
      title: '记录',
      disabled: disabled.value,
      component: CertRecords,
      props: { activeKey, clickName, count, certId: cfId }
    }
  ];

  function onClickButton(btn: ButtonProps, key: string) {
    clickName.value = btn.name;
    count.value = ++count.value;
    console.log(key);
    activeKey.value = key;
  }
</script>

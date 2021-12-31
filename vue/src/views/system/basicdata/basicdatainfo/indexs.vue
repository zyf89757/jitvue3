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
  export default defineComponent({ name: 'BasicEdit' });
</script>
<script lang="ts" setup>
  import { DetailsWrapper } from '/@/components/EzControls/EzPage';
  import { withInstall } from '/@/utils';

  import Info from './detailinfo/detail.vue';
  import Attachments from './detailinfo/attachment.vue';
  import Records from './detailinfo/picture.vue';

  import { ButtonProps } from '/@/api/interface/common';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { BasicTypeAttachmentAsync } from '/@/api/sys/upload';
  const route = useRoute();
  const Id = route.params?.id.toString();
  const disabled = ref(Id != ':id' ? false : true);
  const basInfo = withInstall(Info);
  const basAttachments = withInstall(Attachments);
  const basRecords = withInstall(Records);

  let leftBtns = [
    {
      name: 'reset',
      type: 'Button',
      title: '重置',
      enabled: ['1'],
      visibled: ['1'],
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
      props: {
        apiUrl: BasicTypeAttachmentAsync,
        uploadParams: { basicdataid: Id, type: 'BasicAttachment' }
      },
      visibled: ['2'],
      click: null,
      auth: ''
    },
    {
      name: 'uploadimg',
      type: 'Upload',
      title: '上传图片',
      enabled: ['3'],
      props: {
        apiUrl: BasicTypeAttachmentAsync,
        uploadParams: { basicdataid: Id, type: 'BasicPicture' }
      },
      visibled: ['3'],
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
      title: '物料详细',
      component: basInfo,
      props: { activeKey, clickName, count, Id: Id, IsUpdate: Id != ':id' ? true : false }
    },
    {
      key: '2',
      title: '物料附件',
      disabled: disabled.value,
      component: basAttachments,
      props: { activeKey, clickName, count, Id: Id, code: 'BasicAttachment' }
    },
    {
      key: '3',
      title: '物料图片',
      disabled: disabled.value,
      component: basRecords,
      props: { activeKey, clickName, count, Id: Id, code: 'BasicPicture' }
    }
  ];

  function onClickButton(btn: ButtonProps, key: string) {
    clickName.value = btn.name;
    count.value = ++count.value;
    console.log(key);
    activeKey.value = key;
  }
</script>

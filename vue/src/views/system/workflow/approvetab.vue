<template>
  <div>
    <DetailsWrapper
      title="审批"
      :toolbar-left="leftBtns"
      :toolbar-right="rightBtns"
      :tab-list="tabList"
      tab-active-key="1"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ApproveEdit' });
</script>
<script lang="ts" setup>
  import { DetailsWrapper } from '/@/components/EzControls/EzPage';
  import { withInstall } from '/@/utils';
  import WorkflowDetail from './components/workflowDetail.vue';
  import WorkflowHistory from './components/WorkflowHistory.vue';

  import { ButtonProps } from '/@/api/interface/common';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { uploadAttachment } from '/@/api/sys/upload';
  const route = useRoute();
  const workFlowID = ref(route.params?.id.toString());
  let searchType = ref(route.params?.searchtype.toString());
  const flowDetail = withInstall(WorkflowDetail);
  const workflowHistory = withInstall(WorkflowHistory);
  const isvisibled = ref(searchType.value == '1' ? '1' : '999');
  var count = ref(0);
  let leftBtns = [
    {
      name: 'reject',
      type: 'Button',
      title: '驳回',
      enabled: [isvisibled.value],
      click: onClickButton,
      visibled: ['1'],
      auth: '123'
    }
  ];
  var clickName = ref('');

  let rightBtns = ref([
    {
      name: 'save',
      type: 'primary',
      title: '通过',
      enabled: [isvisibled.value],
      click: onClickButton,
      visibled: ['1'],
      auth: '​api:certificate​:create'
    }
  ]);
  const tabList = [
    {
      key: '1',
      title: '审批信息',
      component: flowDetail,
      props: { clickName, workFlowID: workFlowID.value, count }
    },
    {
      key: '2',
      title: '审批进度',
      component: workflowHistory,
      props: { clickName, workFlowID: workFlowID.value, count }
    }
  ];

  function onClickButton(btn: ButtonProps, key: string) {
    clickName.value = btn.name;
    count.value = ++count.value;
  }
</script>

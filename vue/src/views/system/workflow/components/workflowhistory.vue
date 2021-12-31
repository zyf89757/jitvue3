<template>
  <BasicTable @register="registerTimeTable" />
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { refundTimeTableSchema } from './workflowDetail';
  import { ExcuteFlow, RejectFlow, GetWorkFlow, GetFlowStep } from '/@/api/system/workflow';
  import { useRoute } from 'vue-router';
  export default defineComponent({
    name: 'WorkflowHistory',
    components: { BasicTable, BasicForm },
    props: {
      workFlowID: {
        type: String
      },
      clickName: {
        type: String
      },
      count: {
        type: Number
      },
      onSubmitSuccess: {
        type: Function
      },
      onSubmitError: {
        type: Function
      }
    },
    setup(props, { emit }) {
      const route = ref(useRoute());
      const refundTimeTableData = ref([]);
      const [registerTimeTable] = useTable({
        title: '审批进度',
        columns: refundTimeTableSchema,
        pagination: false,
        dataSource: refundTimeTableData,
        showIndexColumn: false,
        scroll: { y: 300 }
      });
      //初始化form，table
      const init = async () => {
        let tabledata = await GetFlowStep({ id: route.value.params?.id.toString() });
        refundTimeTableData.value = tabledata.data;
      };
      onMounted(() => {
        debugger;
        init();
      });
      return {
        registerTimeTable
      };
    }
  });
</script>
<style lang="less" scoped></style>

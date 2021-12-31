<template>
  <Description
    size="middle"
    title="审批信息"
    :bordered="false"
    :column="3"
    :data="refundData"
    :schema="refundSchema"
  />
  <BasicForm
    v-if="isvisibled"
    @register="register"
    @submit="handleSubmit"
    @reset="reject"
    :reset-button-options="{ text: '驳回' }"
    :submit-button-options="{ text: '通过' }"
  />
  <!-- <BasicTable @register="registerTimeTable" /> -->
  <p class="w-12/12" style="padding-left: 0.8rem">审批内容</p>
  <a-divider />
  <div class="w-12/12" v-if="!isframe">{{ approveContent }}</div>
  <FramePage class="w-12/12" v-if="isframe" :frameSrc="approveContent" />
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted, watchEffect } from 'vue';
  import { Description } from '/@/components/Description/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  // import { BasicTable, useTable } from '/@/components/Table';
  import { refundSchema, formSchema } from './workflowDetail';
  import { useAppStore } from '/@/store/modules/app';
  import { isFunction } from '/@/utils/is';
  import { ExcuteFlow, RejectFlow, GetWorkFlow } from '/@/api/system/workflow';
  import { useRoute } from 'vue-router';
  import { Divider } from 'ant-design-vue';
  import FramePage from '/@/views/sys/iframe/index.vue';

  export default defineComponent({
    name: 'WorkflowDetail',
    components: { Description, BasicForm, FramePage, [Divider.name]: Divider },
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
      const refundData = ref([]);
      const appSize = useAppStore().getAppSize;
      const isframe = ref(false);
      const approveContent = ref('');
      const isvisibled = ref(true);

      const [register, { validate, resetFields, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: formSchema,
        actionColOptions: {
          span: 24
        },
        size: appSize.toString() == 'small' ? 'small' : 'default',
        showResetButton: false,
        showSubmitButton: false,
        autoSetPlaceHolder: true
      });
      async function handleSubmit() {
        const values = await validate();
        console.log(values);
        const fun = ExcuteFlow;
        let result = await fun(values);
        if (result) {
          if (isFunction(props.onSubmitSuccess)) {
            props.onSubmitSuccess();
          }
        } else {
          if (isFunction(props.onSubmitError)) props.onSubmitError();
        }
      }
      async function reject() {
        const values = await validate();
        console.log(values);
        // TODO custom api
        const fun = RejectFlow;
        let result = await fun(values);
        if (result) {
          if (isFunction(props.onSubmitSuccess)) {
            props.onSubmitSuccess();
          }
        } else {
          if (isFunction(props.onSubmitError)) props.onSubmitError();
        }
      }
      //初始化form，table
      const init = async () => {
        let searchType = ref(route.value.params?.searchtype.toString());
        isvisibled.value = searchType.value == '1' ? true : false;
        let returndata = await GetWorkFlow({ id: route.value.params?.id.toString() });
        debugger;
        console.log(returndata);
        approveContent.value = returndata.data.approveContent;
        if (returndata.data.approveContent.toString().indexOf('http') == -1) {
          isframe.value = true;
        }
        const names = ref([]);
        names.value = returndata.data.extraName.split('|');
        let index = refundSchema.length;
        names.value.forEach((item, i) => {
          if (i == 0) {
            refundSchema.values[index + i] = { field: 'extraData', label: `${item}` };
          } else {
            refundSchema.values[index + i] = { field: `extraData${i}`, label: `${item}` };
          }
        });
        refundData.value = returndata.data;
        returndata.data.workFlowID = returndata.data.id;
        setFieldsValue({ ...returndata.data });
      };
      watchEffect(() => {
        if (unref(props.count) || 0 > 0) {
          debugger;
          switch (unref(props.clickName)) {
            case 'save':
              handleSubmit();
              break;
            case 'reject':
              reject();
              break;
          }
        }
      });

      onMounted(() => {
        debugger;
        init();
      });
      return {
        refundSchema,
        refundData,
        handleSubmit,
        register,
        reject,
        isframe: isframe,
        approveContent,
        isvisibled
      };
    }
  });
</script>
<style lang="less" scoped></style>

<template>
  <div>
    <BasicForm :labelWidth="150" @register="register" @submit="handleSubmit">
      <template #remoteSearch="{ model, field }">
        <ApiSelect
          :api="options"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          resultField="list"
          labelField="hscode"
          valueField="hscode"
          :params="searchParams"
          @search="onSearch"
          @change="onChange(model)"
          @keyup.enter="loadBasic(model)"
        />
        <!-- resultField="value" -->
      </template>
    </BasicForm>
    <OpenList @register="registerOpen" @handelOk="handelOk" />
    <OpenDetail @register="registerOpenDetail" @handelDetailOk="handelDetailOk" />
    <OpenCheck @register="registerOpenCheck" @handelCheckOk="handelCheckOk" />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref, ref, watchEffect, onMounted } from 'vue';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { Select } from 'ant-design-vue';
  import { useDebounceFn } from '@vueuse/core';
  import { useAppStore } from '/@/store/modules/app';
  import { useModal } from '/@/components/Modal';
  import { sysBasicAdd, sysBasicUpdate, options, customerApis } from '../../api/basicdata';
  import { formSchema } from './detail';
  import { isFunction } from '/@/utils/is';
  import OpenList from './openlist.vue';
  import OpenDetail from './openDetail.vue';
  import OpenCheck from './openCheck.vue';
  import { useGo } from '/@/hooks/web/usePage';
  export default defineComponent({
    name: 'Info',
    components: { BasicForm, ApiSelect, ASelect: Select, OpenList, OpenDetail, OpenCheck }, //
    props: {
      // eslint-disable-next-line vue/prop-name-casing
      Id: {
        type: String
      },
      IsUpdate: {
        type: Boolean
      },
      clickName: {
        type: String
      },
      count: {
        type: Number
      },
      activeKey: { type: String },
      onSubmitSuccess: {
        type: Function
      },
      onSubmitError: {
        type: Function
      }
    },
    setup(props, { emit }) {
      //ref 子组件调用方法
      const keyword = ref<string>('');
      const hscode = ref('');
      const appSize = useAppStore().getAppSize;
      const isUpdate = ref(true);
      const go = useGo();
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });
      const [registerOpen, { openModal: onOpen, closeModal }] = useModal();
      const [registerOpenDetail, { openModal: onOpenDetail, closeModal: closeDetailModal }] =
        useModal();
      const [registerOpenCheck, { openModal: onOpenCheck, closeModal: closeCheckModal }] =
        useModal();

      function onSearch(value: string) {
        debugger;
        keyword.value = value;
      }
      //列表弹出关闭 打开详细页面
      const handelOk = (recivedata) => {
        debugger;
        closeModal();
        onOpenDetail(true, { data: recivedata[0] });
      };
      //申报明细
      const handelDetailOk = async (recivedata) => {
        debugger;
        console.log(recivedata);
        setFieldsValue({
          declareElement: recivedata //data.data.gname
        });
        closeDetailModal();
        //打开检疫
        // onOpenCheck(true, {
        //   data: 'content',
        //   info: 'Info'
        // });
      };
      //检验检疫
      const handelCheckOk = (recivedata) => {
        console.log(recivedata);
        closeCheckModal();
      };

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
        try {
          const values = await validate();
          isUpdate.value = props.IsUpdate;
          // TODO custom api
          const fun = unref(isUpdate) ? sysBasicUpdate : sysBasicAdd;
          if (unref(isUpdate)) {
            let result = await fun(values);
            if (result) {
              if (isFunction(props.onSubmitSuccess)) {
                props.onSubmitSuccess();
              }
            } else {
              if (isFunction(props.onSubmitError)) props.onSubmitError();
            }
          } else {
            let result = await fun(values);
            if ((result.code = 200)) {
              go('/basic/manager/edit/' + result.data);
            } else {
              if (isFunction(props.onSubmitError)) props.onSubmitError();
            }
          }
        } finally {
        }
      }
      //加载弹出层功能
      function loadBasic(formModel) {
        debugger;
        onOpen(true, {
          data: hscode.value
        });
      }

      watchEffect(() => {
        if (unref(props.count) || 0 > 0) {
          switch (unref(props.clickName)) {
            case 'save':
              handleSubmit();
              break;
            case 'reset':
              resetFields();
              break;
          }
        }
      });
      //下拉查询加载功能
      function onChange(formModel) {
        debugger;
        console.log(formModel);
        hscode.value = formModel.hsCode;
      }
      //初始化form，table
      const init = async () => {
        if (props.IsUpdate) {
          console.log('id' + props.Id);
          let returndata = await customerApis(props.Id);
          debugger;
          setFieldsValue({ ...returndata.data });
        }
      };
      onMounted(() => {
        debugger;
        init();
      });
      return {
        register,
        loadBasic,
        options,
        onSearch: useDebounceFn(onSearch, 300),
        onChange: onChange,
        searchParams,
        handleReset: () => {
          keyword.value = '';
        },
        registerOpen,
        registerOpenDetail,
        registerOpenCheck,
        handelOk,
        handelDetailOk,
        handelCheckOk,
        handleSubmit: handleSubmit
      };
    }
  });
</script>
<style lang="less" scoped></style>

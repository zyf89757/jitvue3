<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="更改管理员"
    @visible-change="handleVisibleChange"
    @ok="handelOk"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { getCurrentUser, updateAdmin } from '/@/api/demo/account';
  import { useMessage } from '/@/hooks/web/useMessage';
  //import { useUserStore } from '/@/store/modules/user';

  const { createMessage } = useMessage();

  //const userStore = useUserStore();

  const getSchamas = (): FormSchema[] => {
    return [
      {
        field: 'UserId',
        component: 'ApiSelect',
        label: '用户：',
        componentProps: {
          api: getCurrentUser,
          resultField: 'data',
          labelField: 'text',
          valueField: 'value',
          immediate: true,
        },
        colProps: {
          span: 20,
        },
        required: true,
      },
      {
        field: 'Password',
        component: 'InputPassword',
        label: '密码：',
        colProps: {
          span: 20,
        },
        required: true,
      },
    ];
  };

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const modelRef = ref({});
      const [registerForm, { validate }] = useForm({
        labelWidth: 120,
        schemas: getSchamas(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      // 确定并关闭
      async function handelOk() {
        //alert(JSON.stringify(getFieldsValue()));
        const params = await validate();
        let result = await updateAdmin(params);
        if (result != null && result.success) {
          createMessage.success('更改成功！');
          closeModal();
          emit('success');
        } else createMessage.error(result.message);
      }

      function onDataReceive(data) {
        modelRef.value = { UserId: data.data, Password: data.info };
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return { register, registerForm, model: modelRef, handleVisibleChange, handelOk };
    },
  });
</script>

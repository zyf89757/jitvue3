<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="更改数据库链接"
    @ok="handelOk"
    :width="700"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ConnectionStringForm' });
</script>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { updateTenantConnect } from '../../../../../api/system/tenant-manager';
  import { useMessage } from '/@/hooks/web/useMessage';
  //import { useUserStore } from '/@/store/modules/user';

  const { createMessage } = useMessage();

  //const userStore = useUserStore();

  const getSchamas = (): FormSchema[] => {
    return [
      {
        field: 'connectionString',
        component: 'InputTextArea',
        label: '连接字符串',
        colProps: {
          span: 20
        },
        componentProps: {
          autoSize: {
            minRows: 4,
            maxRows: 6,
            disabled: true
          }
        },
        required: true
      },
      {
        field: 'key',
        component: 'Input',
        label: '隐藏主键',
        show: false,
        colProps: {
          span: 20
        },
        required: true
      }
    ];
  };

  const emit = defineEmits(['success', 'register']);
  const modelRef = ref({});
  const [registerForm, { validate }] = useForm({
    labelWidth: 120,
    schemas: getSchamas(),
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24
    }
  });

  const [register, { closeModal }] = useModalInner((data) => {
    console.log(data);
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    modelRef.value = { ...data };
  }

  // 确定并关闭
  async function handelOk() {
    //alert(JSON.stringify(getFieldsValue()));
    const params = await validate();
    let result = await updateTenantConnect(params);
    if (result && result.success) {
      createMessage.success('更改成功！');
      closeModal();
      emit('success', true);
    } else createMessage.error(result.message);
  }
</script>

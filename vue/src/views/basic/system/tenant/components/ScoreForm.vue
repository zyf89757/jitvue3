<template>
  <BasicModal v-bind="$attrs" @register="register" title="更改积分" @ok="handelOk">
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ScoreForm' });
</script>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { updateTenantScore } from '/@/api/system/tenant-manager';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const getSchamas = (): FormSchema[] => {
    return [
      {
        field: 'score',
        component: 'InputNumber',
        label: '积分：',
        colProps: {
          span: 24
        },
        componentProps: {
          max: 999999999,
          maxlength: 9
        },
        required: true
      },
      {
        field: 'key',
        component: 'Input',
        label: '隐藏主键',
        show: false,
        colProps: {
          span: 24
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
    const params = await validate();
    let result = await updateTenantScore(params);
    if (result && result.success) {
      createMessage.success('更改成功！');
      closeModal();
      emit('success', true);
    } else createMessage.error(result.message);
  }
</script>

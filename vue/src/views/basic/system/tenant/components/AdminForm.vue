<template>
  <BasicModal v-bind="$attrs" @register="register" title="更改管理员" @ok="handelOk">
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
  import { updateTenantAdmin, getTenantUser } from '/@/api/system/tenant-manager';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  // const props = defineProps({
  //   userData: {
  //     type: Object,
  //     default: null
  //   }
  // });

  const getSchamas = (): FormSchema[] => {
    return [
      {
        field: 'id',
        component: 'ApiSelect',
        label: '用户：',
        componentProps: ({ formModel }) => {
          return {
            api: getTenantUser,
            params: modelRef.value.tenantId,
            resultField: 'data',
            labelField: 'name',
            valueField: 'id',
            immediate: true,
            onChange: (e, target) => {
              formModel.id = e;
              formModel.name = target.label;
            }
          };
        },
        colProps: {
          span: 20
        },
        required: true
      },
      {
        field: 'name',
        component: 'Input',
        label: '租户管理员名称',
        show: false,
        colProps: {
          span: 24
        },
        required: true
      },
      {
        field: 'tenantId',
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
  const modelRef = ref({ tenantId: '', id: '', name: '' });
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
    let result = await updateTenantAdmin(params);
    if (result && result.success) {
      createMessage.success('更改成功！');
      closeModal();
      emit('success', true);
    } else createMessage.error(result.message);
  }

  // function handleVisibleChange(v) {
  //   v && props.userData && nextTick(() => onDataReceive(props.userData));
  // }
</script>

<template>
  <div>
    <PageWrapper>
      <Card title="基本信息" :bordered="false" class="p-0">
        <a-row :gutter="24">
          <a-col :span="15">
            <BasicForm
              @register="register"
              @submit="send"
              :submitButtonOptions="{ text: '更改管理员' }"
            />
          </a-col>
          <a-col :span="2" />
          <a-col :span="7">
            <div class="change-avatar">
              <CropperAvatar
                :uploadApi="uploadApi"
                v-model:value="avatar"
                :showBtn="false"
                btnText="更换LOGO"
                :btnProps="{ preIcon: 'ant-design:upload-outlined' }"
                @change="updateAvatar"
                width="140"
              />
            </div>
          </a-col>
        </a-row>
      </Card>
      <Modal @register="registerModal" @success="loadData" />
      <BusinessForm />
    </PageWrapper>
  </div>
</template>

<script lang="ts">
  import BusinessForm from './components/index.vue';
  import { Button, Row, Col } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';
  import { useModal } from '/@/components/Modal';
  import Modal from './Modal.vue';
  import { ref } from 'vue';
  import { baseSetschemas } from './addition';
  import { useAppStore } from '/@/store/modules/app';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/sys/upload';
  import { getSysTenant, changeTenantLogo } from '/@/api/demo/account';

  export default defineComponent({
    name: 'TenantInfo',
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
      Modal,
      BusinessForm
    },
    setup() {
      const tenantLogo = ref('');

      const userStore = useUserStore();
      const userInfo = userStore.getUserInfo;

      const appSize = useAppStore().getAppSize;

      const [register, { validate, setFieldsValue }] = useForm({
        labelWidth: 200,
        schemas: baseSetschemas,
        actionColOptions: {
          span: 24
        },
        size: appSize.toString() == 'small' ? 'small' : 'default',
        showResetButton: false,
        showSubmitButton: true,
        disabled: true
      });

      loadData();

      async function loadData() {
        var result = await getSysTenant(userInfo.tenantId);
        if (result != null && result.success) {
          tenantLogo.value = result.data.logoUrl;
          setFieldsValue(result.data);
        }
      }

      async function updateAvatar(src: string) {
        await validate();
        const params = { tenantId: userInfo.tenantId, base64Data: src };
        await changeTenantLogo(params);
      }

      const [registerModal, { openModal: openModal }] = useModal();

      function send() {
        openModal(true, {
          data: '',
          info: ''
        });
      }

      return {
        avatar: tenantLogo,
        register,
        uploadApi: uploadApi as any,
        updateAvatar,
        send,
        registerModal,
        loadData
      };
    }
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>

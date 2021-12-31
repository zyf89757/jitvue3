<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="onShow" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`" v-if="1 > 2">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
  <Verify
    @success="handelVerifySuccess"
    mode="pop"
    captchaType="clickWord"
    :imgSize="{ width: '400px', height: '200px' }"
    ref="verify"
  />
</template>
<script lang="ts" setup>
  import { reactive, ref, toRaw, unref, computed } from 'vue';
  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import Verify from '/@/components/VerifyPro/Verify.vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  //import { onKeyStroke } from '@vueuse/core';
  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();
  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);
  const verifyData = ref(null);
  const formData = reactive({
    // account: 'superAdmin',
    // password: '123456'
    account: '',
    password: ''
  });
  const { validForm } = useFormValid(formRef);
  //onKeyStroke('Enter', handleLogin);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  const verify = ref(); //验证码组件实例

  // 展示验证码
  async function onShow() {
    const data = await validForm();
    if (!data) return;
    handleLogin();
    // verify.value.show();
  }

  // const handleSuccess = (res) => {
  //   console.log('sucess');
  // };
  function handelVerifySuccess(data) {
    verifyData.value = data.captchaVerification;
    handleLogin();
    console.log(data);
  }
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login(
        toRaw({
          password: data.password,
          account: data.account,
          verify: unref(verifyData),
          mode: 'none' //不要默认的错误提示
        })
      );
      if (userInfo) {
        // setLoginState(LoginStateEnum.SELECT_TENANT);
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.userName}`,
          duration: 3
        });
      }
    } catch (error: any) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (function () {
          let resMsg = '';
          if (error.constructor === Object) {
            Object.keys(error).forEach(function (key) {
              error[key].forEach(function (item) {
                resMsg += item + '<br/>';
              });
            });
          } else {
            if (error?.code == 'ECONNABORTED') {
              return t('sys.api.timeoutMessage');
            } else {
              return error;
            }
          }
          return resMsg;
        })(),
        // content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body
      });
    } finally {
      loading.value = false;
    }
  }
</script>

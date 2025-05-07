<template>
  <form class="space-y-8" @submit.prevent="handleSubmit">
    <FloatLabel>
      <InputText
        id="reg-username"
        v-model="formData.username"
        class="w-full"
        :invalid="!!formErrors.username"
        autocomplete="username"
      />
      <label for="reg-username">用户名 <span class="text-red-500">*</span></label>
    </FloatLabel>
    <small v-if="formErrors.username" class="p-error block -mt-5 mb-3">{{ formErrors.username }}</small>

    <FloatLabel>
      <InputText
        id="reg-email"
        v-model="formData.email"
        type="email"
        class="w-full"
        :invalid="!!formErrors.email"
        autocomplete="email"
      />
      <label for="reg-email">邮箱 (可选)</label>
    </FloatLabel>
    <small v-if="formErrors.email" class="p-error block -mt-5 mb-3">{{ formErrors.email }}</small>

    <FloatLabel>
      <Password
        id="reg-password"
        v-model="formData.password"
        inputClass="w-full"
        :feedback="true"
      toggleMask
      :invalid="!!formErrors.password"
      autocomplete="new-password"
      />
      <label for="reg-password">设置密码 <span class="text-red-500">*</span></label>
    </FloatLabel>
    <small v-if="formErrors.password" class="p-error block -mt-5 mb-3">{{ formErrors.password }}</small>

    <FloatLabel>
      <Password
        id="reg-confirmPassword"
        v-model="formData.confirmPassword"
        inputClass="w-full"
        :feedback="false"
        toggleMask
        :invalid="!!formErrors.confirmPassword"
        autocomplete="new-password"
      />
      <label for="reg-confirmPassword">确认密码 <span class="text-red-500">*</span></label>
    </FloatLabel>
    <small v-if="formErrors.confirmPassword" class="p-error block -mt-5 mb-3">{{ formErrors.confirmPassword }}</small>

    <div class="flex items-start">
      <Checkbox v-model="formData.agreedToTerms" inputId="terms" :binary="true" :invalid="!!formErrors.agreedToTerms" />
      <label for="terms" class="ml-2 text-sm text-gray-700">我已阅读并同意
        <a href="/terms" target="_blank" class="text-blue-600 hover:text-blue-500">服务条款</a>
        和
        <a href="/privacy" target="_blank" class="text-blue-600 hover:text-blue-500">隐私政策</a>
      </label>
    </div>
    <small v-if="formErrors.agreedToTerms" class="p-error block">{{ formErrors.agreedToTerms }}</small>

    <div class="mt-8"> <!-- 增加一点上边距 -->
      <Button
        type="submit"
        label="注 册"
        class="w-full"
        :loading="isLoading"
        :disabled="isLoading"
        pt:root:class="justify-center"
      />
    </div>
    <small v-if="formErrors.general" class="p-error block text-center">{{ formErrors.general }}</small>
  </form>
</template>


<script setup>
  import { ref, reactive } from 'vue';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import FloatLabel from 'primevue/floatlabel';
  import Checkbox from 'primevue/checkbox';

  const props = defineProps({
    isLoading: {
      type: Boolean,
      default: false,
    }
  });

  const emit = defineEmits(['submit-register']);

  const formData = reactive({
    username: '',
    email: '',
    // phone: '', // 手机号
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
    // captcha: '', // 图形验证码
    // phoneVerifyCode: '', // 手机验证码
  });

  const formErrors = reactive({
    username: '',
    email: '',
    // phone: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: '',
    // captcha: '',
    // phoneVerifyCode: '',
    general: '',
  });

  // --- TODO 验证码相关状态 ---
  // const captchaImageUrl = ref('/api/getCaptcha');
  // const refreshCaptcha = () => {
  //   captchaImageUrl.value = `/api/getCaptcha?t=${new Date().getTime()}`;
  // };
  // const isSendingCode = ref(false);
  // const countdown = ref(0);
  // let countdownTimer = null;

  // const sendPhoneCode = async () => {
  //   if (isSendingCode.value || countdown.value > 0) return;
  //   // TODO: 校验手机号格式
  //   // TODO: 调用发送手机验证码API (可能需要图形验证码)
  //   // isSendingCode.value = true;
  //   // try {
  //   //   await sendVerifyCodeApi({ phone: formData.phone, type: 'sms', captcha: formData.captcha });
  //   //   countdown.value = 60;
  //   //   countdownTimer = setInterval(() => {
  //   //     countdown.value--;
  //   //     if (countdown.value <= 0) clearInterval(countdownTimer);
  //   //   }, 1000);
  //   // } catch (error) {
  //   //   formErrors.general = error.message || '发送验证码失败';
  //   // } finally {
  //   //   isSendingCode.value = false;
  //   // }
  //   console.log('Send phone verification code to:', formData.phone);
  // };

  const validateForm = () => {
    // 清空错误
    Object.keys(formErrors).forEach(key => formErrors[key] = '');
    let isValid = true;

    if (!formData.username.trim() || formData.username.length < 3 || formData.username.length > 50) { // 根据OpenAPI调整maxLength
      formErrors.username = '用户名长度应为3-50个字符';
      isValid = false;
    }
    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      formErrors.email = '请输入有效的邮箱地址';
      isValid = false;
    }
    // if (formData.phone.trim() && !/^\d{11}$/.test(formData.phone)) { // 简单手机号校验
    //   formErrors.phone = '请输入有效的手机号码';
    //   isValid = false;
    // }
    if (formData.password.length < 6) { // 根据实际密码策略调整
      formErrors.password = '密码长度至少为6位';
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = '两次输入的密码不一致';
      isValid = false;
    }
    if (!formData.agreedToTerms) {
      formErrors.agreedToTerms = '请阅读并同意服务条款和隐私政策';
      isValid = false;
    }
    // if (needsCaptcha && !formData.captcha.trim()) {
    //   formErrors.captcha = '请输入图形验证码';
    //   isValid = false;
    // }
    // if (needsPhoneVerification && !formData.phoneVerifyCode.trim()) {
    //   formErrors.phoneVerifyCode = '请输入手机验证码';
    //   isValid = false;
    // }
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    console.log('Register form submitted:', { ...formData });

    // Apifox 里边的注册接口需要 username 和 password
    // email 和 phone 是可选的
    const payload = {
      username: formData.username,
      password: formData.password,
    };
    if (formData.email.trim()) {
      payload.email = formData.email.trim();
    }
    // if (formData.phone.trim()) { // 如果添加了手机号字段
    //   payload.phone = formData.phone.trim();
    // }
    // TODO: 实际提交逻辑，调用 userStore.register(payload)

    emit('submit-register', payload);
  };

  // TODO 对接点
  // 1. props.isLoading: 由 RegisterPage.vue 控制。
  // 2. emit('submit-register'): RegisterPage.vue 监听，调用 userStore.register(payload)。
  // 3. formErrors: 当 userStore.register action 抛出错误时，RegisterPage.vue 更新。
  // 4. 验证码逻辑:
  //    - 如果需要图形验证码 (OpenAPI `/getCaptcha`)，需要实现 `captchaImageUrl` 和 `refreshCaptcha`。
  //    - 如果需要手机/邮箱验证码 (OpenAPI `/sendVerifyCode`)，需要实现 `sendPhoneCode` (或 `sendEmailCode`) 逻辑，
  //      包括倒计时、发送状态等，并可能需要先输入图形验证码。
  //    - 注册接口 (`/register`) 本身不直接接收验证码，验证码通常用于获取手机/邮箱验证码的环节，或在后端进行校验。
  //      你需要和后端确认注册流程中验证码的具体使用方式。
</script>

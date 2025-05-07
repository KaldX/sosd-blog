<template>
  <form class="space-y-8" @submit.prevent="handleSubmit"> <!-- 增加 space-y -->
    <!-- 用户名 -->
    <FloatLabel>
      <InputText
        id="username"
        v-model="formData.username"
        class="w-full"
        :invalid="!!formErrors.username"
        autocomplete="username"
      />
      <label for="username">用户名 <span v-if="true" class="text-red-500">*</span></label>
    </FloatLabel>
    <small v-if="formErrors.username" class="p-error block -mt-5 mb-3">{{ formErrors.username }}</small>

    <!-- 密码 -->
    <FloatLabel>
      <Password
        id="password"
        v-model="formData.password"
        class="w-full"
        inputClass="w-full"
        :feedback="false"
        toggleMask
        :invalid="!!formErrors.password"
        autocomplete="current-password"
      >
      <template #header><h6>选择一个密码</h6></template> <!-- HEADER -->
      <template #footer> <!-- FOOTER -->
        <Divider />
        <p class="mt-2">建议</p>
        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
          <li>至少一个小写字母</li>
          <li>至少一个大写字母</li>
          <li>至少一个数字</li>
          <li>最少8个字符</li>
        </ul>
      </template>
      </Password>
      <label for="password">密码 <span v-if="true" class="text-red-500">*</span></label>
    </FloatLabel>
    <small v-if="formErrors.password" class="p-error block -mt-5 mb-3">{{ formErrors.password }}</small>

    <div class="flex items-center justify-between text-sm">
      <div>
        <Checkbox v-model="rememberMe" inputId="remember-me" :binary="true" />
        <label for="remember-me" class="ml-2 text-gray-700"> 记住我 </label>
      </div>
      <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
        忘记密码?
      </a>
    </div>

    <div>
      <Button
        type="submit"
        label="登 录"
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
  import Divider from 'primevue/divider';

  const props = defineProps({
    isLoading: { // 由父组件控制加载状态
      type: Boolean,
      default: false,
    }
  });

  const emit = defineEmits(['submit-login']);

  const formData = reactive({
    username: '',
    password: '',
  });

  const formErrors = reactive({ // 用于显示API返回的或前端校验的错误
    username: '',
    password: '',
    general: '', // 通用错误，比如 用户名或密码错误
  });

  const validateForm = () => {
    // 清空之前的错误
    formErrors.username = '';
    formErrors.password = '';
    formErrors.general = '';
    let isValid = true;
    if (!formData.username.trim()) {
      formErrors.username = '用户名为必填项';
      isValid = false;
    }
    if (!formData.password) {
      formErrors.password = '密码为必填项';
      isValid = false;
    }
    // 更多前端校验可以加在这里，例如用户名长度等，但主要依赖后端校验
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    console.log('Login form submitted:', { ...formData });
    // TODO: 实际提交逻辑会在这里，并处理API错误，更新 formErrors.general
    // 例如:
    // try {
    //   emit('submit-login', { ...formData }); // 将表单数据传递给父组件
    // } catch (error) { // 这个catch通常在父组件的handleLogin中
    //   formErrors.general = error.message || '登录失败，请重试';
    // }
    emit('submit-login', { ...formData }); // 将表单数据传递给父组件
  };

  // TODO 对接点
  // 1. props.isLoading: 由 LoginPage.vue 控制，基于 userStore.isLoading 状态。
  // 2. emit('submit-login'): LoginPage.vue 监听此事件，调用 userStore.login(formData)。
  // 3. formErrors: 当 userStore.login action 抛出错误时，LoginPage.vue 需要捕获并更新此处的 formErrors.general
  //    或者，如果API返回特定字段的错误，也可以更新 formErrors.username 或 formErrors.password。
  //    一种常见的做法是，父组件(LoginPage)在捕获到错误后，将错误信息通过props传递给LoginForm，或者LoginForm直接从store中读取错误状态。
  //    目前的设计是父组件控制isLoading，错误信息也应由父组件处理后（如果需要）再反馈给表单组件，或者表单组件直接显示一个通用的错误信息。
</script>

<template>
  <AuthLayout
    title="创建您的SOSD账户"
    subtitle="已经有账户了?"
    linkText="立即登录"
    linkTo="/auth/login"
  >
    <RegisterForm :is-loading="isLoading" @submit-register="handleRegister" />
  </AuthLayout>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AuthLayout from '@/components/layout/AuthLayout.vue';
  import RegisterForm from '@/components/user/RegisterForm.vue';
  // import { useUserStore } from '@/store/modules/user';

  const router = useRouter();
  // const userStore = useUserStore();
  const isLoading = ref(false);

  const handleRegister = async (formData) => {
    console.log('Register Page received form data:', formData);
    isLoading.value = true;
    // TODO: 调用 userStore.register(formData)
    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = Math.random() > 0.3;
    if (success) {
      console.log('Registration successful (mock)');
      // 提示用户注册成功，并引导登录
      alert('注册成功！请前往登录。 (模拟)');
      router.push('/login');
    } else {
      console.error('Registration failed (mock)');
      alert('注册失败，可能用户名已存在或服务器错误。 (模拟)');
    }
    isLoading.value = false;
  };
</script>

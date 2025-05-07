<template>
  <AuthLayout
    title="登录您的账户"
    subtitle="还没有账户?"
    linkText="立即注册"
    linkTo="/auth/register"
  >
    <LoginForm :is-loading="isLoading" @submit-login="handleLogin" />
    <!-- 社交登录按钮 -->
    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500"> 或使用以下方式登录 </span>
        </div>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-3">
        <!-- 还没写 -->
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AuthLayout from '@/components/layout/AuthLayout.vue';
  import LoginForm from '@/components/user/LoginForm.vue';

  // import { useUserStore } from '@/store/modules/user';

  const router = useRouter();
  // const userStore = useUserStore();
  const isLoading = ref(false); // 传递给LoginForm

  const handleLogin = async (formData) => {
    console.log('Login Page received form data:', formData);
    isLoading.value = true;
    // TODO: 调用 userStore.login(formData)
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = Math.random() > 0.3; // 模拟成功或失败
    if (success) {
      console.log('Login successful (mock)');
      // userStore.setToken('mock-token'); // 模拟设置token
      // userStore.setCurrentUser({ id: 1, username: formData.username }); // 模拟设置用户
      router.push(router.currentRoute.value.query.redirect || '/'); // 跳转到首页或重定向地址
    } else {
      console.error('Login failed (mock)');
      // 这里应该更新LoginForm内部的formErrors.general
      // 可能需要从store获取错误信息？
      alert('用户名或密码错误 (模拟)'); // 简单提示
    }
    isLoading.value = false;
  };
</script>

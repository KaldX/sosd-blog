<template>
  <div class="w-full max-w-md space-y-8">
    <div>
      <div class="flex justify-center">
        <app-logo :show-text="false" size="large" />
        <!-- 如果想显示文字可以用这个 不过上面的好看一点 -->
        <!-- <app-logo :show-text="true" text-class="text-2xl" size="default" /> -->
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ title }}
      </h2>

      <p v-if="subtitle" class="mt-2 text-center text-sm text-gray-600">
        {{ subtitle }}
        <router-link v-if="linkText && linkTo" :to="linkTo" class="font-medium text-blue-600 hover:text-blue-500">
          {{ linkText }}
        </router-link>
      </p>
    </div>
    <div
      class="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10 transform transition-all duration-500 ease-in-out hover:shadow-2xl"
      :key="animationKey"
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500, ease: 'easeOut' } }"
    >
      <slot></slot> <!-- 表单内容将通过slot传入 -->
    </div>
    <p class="mt-8 text-center text-xs text-gray-500">
      &copy; {{ new Date().getFullYear() }} SOSD Blog. All rights reserved.
    </p>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import AppLogo from '@/components/common/AppLogo.vue';

  defineProps({
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    linkText: {
      type: String,
      default: '',
    },
    linkTo: {
      type: String,
      default: '',
    },
  });

  // 用于在路由切换时重新触发进入动画
  const route = useRoute();
  const animationKey = ref(route.path);
  watch(() => route.path, (newPath) => {
    animationKey.value = newPath;
  });
</script>

<template>
  <footer class="bg-gray-100 border-t border-gray-200 mt-auto">
    <div class="container mx-auto px-4 py-8 text-center text-sm text-gray-500">
      <div class="mb-2">
        <router-link to="/about" class="hover:text-blue-600 mx-2">关于我们</router-link>
        <span class="text-gray-300">|</span>
        <router-link to="/contact" class="hover:text-blue-600 mx-2">联系方式</router-link>
        <span class="text-gray-300">|</span>
        <router-link to="/terms" class="hover:text-blue-600 mx-2">服务条款</router-link>
        <span class="text-gray-300">|</span>
        <a href="https://github.com/" target="_blank" class="hover:text-blue-600 mx-2">GitHub</a>
      </div>
      <p>&copy; {{ currentYear }} SOSD Blog. All rights reserved.</p>
      <p class="text-xs mt-1">
        Powered by Vue.js & Tailwind CSS. Designed with ❤️ by us.
      </p>
    </div>
  </footer>
</template>

<script setup>
  import { computed } from 'vue';

  const currentYear = computed(() => new Date().getFullYear());

  // --- 未做 ---
  // /about, /contact, /terms 等路由存在或有相应处理。
</script>

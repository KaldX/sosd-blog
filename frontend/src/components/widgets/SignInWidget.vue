<template>
  <HomeSidebarWidget title="晚上好!">  <!--  之后会根据时间切换-->
    <div class="flex items-center justify-between">
      <p class="text-xs text-gray-500">点亮在社区的每一天</p>
      <button
        @click="handleSignIn"
        class="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded font-medium"
        :disabled="isSignedToday"
      >
        {{ isSignedToday ? '今日已签' : '去签到' }}
      </button>
    </div>
  </HomeSidebarWidget>
</template>

<script setup>
  import { ref } from 'vue';
  import HomeSidebarWidget from '@/components/layout/HomeSidebarWidget.vue';

  // --- 模拟数据和状态 ---
  // TODO: 这些状态应从 userStore 或专门的签到store获取
  const isSignedToday = ref(false); // 模拟未签到

  // --- 事件处理占位 ---
  const handleSignIn = () => {
    if (isSignedToday.value) return;
    console.log('Handle sign in');
    // TODO: 调用签到API，并更新 isSignedToday 状态
    isSignedToday.value = true; // 模拟签到成功
  };
</script>

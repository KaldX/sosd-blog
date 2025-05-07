<template>
  <HomeSidebarWidget title="精彩活动">
    <a href="#" target="_blank" class="block rounded-lg overflow-hidden group">
      <img
        src="https://sosd.fzu.edu.cn/static/image/2025schoolcomp.05990d5e.png"
        alt="活动推广"
        class="w-full h-auto object-cover group-hover:opacity-90 transition-opacity"
      />
      <!-- 如果是轮播，这里会有轮播控件和多张图片 -->
    </a>
    <p class="text-xs text-gray-500 mt-2 text-center">
      参与最新活动，赢取丰厚奖品！
    </p>
  </HomeSidebarWidget>
</template>

<script setup>
  import HomeSidebarWidget from '@/components/layout/HomeSidebarWidget.vue';

  // --- 这块暂时不需要对接 作为一个占位组件 ---
  // 1. 活动数据 (图片链接, 跳转链接) 可能从全局配置或专门的活动store获取。
  // 2. 如果需要轮播，可以集成 Swiper.js 或其他Vue轮播库。
</script>

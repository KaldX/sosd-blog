<template>
  <HomeSidebarWidget title="文章榜">
    <div class="flex items-center justify-between mb-3">
      <div class="text-xs text-gray-500">热门内容</div>
      <button @click="refreshRanking" class="text-xs text-gray-400 hover:text-blue-600 flex items-center">
        <ArrowPathIcon class="h-3.5 w-3.5 mr-1" aria-hidden="true" />
        换一换
      </button>
    </div>
    <ul class="space-y-3">
      <li v-for="(article, index) in rankedArticles" :key="article.id" class="flex items-center text-sm">
        <span
          :class="[
            'flex-shrink-0',
            'w-5 h-5',
            'flex items-center justify-center',
            'rounded-sm',
            'text-white',
            'text-xs',
            'font-semibold',
            'mr-3',
            getRankClass(index + 1)
          ]"
        >
          {{ index + 1 }}
        </span>
        <router-link :to="`/article/${article.id}`" class="text-gray-700 hover:text-blue-600 hover:underline line-clamp-1 flex-grow min-w-0">
          {{ article.title }}
        </router-link>
        <span v-if="article.isHot" class="ml-1.5 text-red-500 text-xs flex-shrink-0">🔥</span>
      </li>
    </ul>
    <div v-if="rankedArticles.length > 0 && rankedArticles.length >= 5" class="mt-4 text-center">
      <router-link to="/ranking/articles" class="text-xs text-blue-600 hover:underline">
        查看完整榜单 >
      </router-link>
    </div>
  </HomeSidebarWidget>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import HomeSidebarWidget from '@/components/layout/HomeSidebarWidget.vue';
  import { ArrowPathIcon } from '@heroicons/vue/24/outline';

  // --- 模拟数据 ---
  const rankedArticles = ref([]);

  const mockRankedArticlesData = [
    { id: 'rank-101', title: '尤雨溪宣布: Vue 生态正式引入新成员，带来革命性变化', isHot: true },
    { id: 'rank-102', title: '优雅, 太优雅了, NestJS 和 TypeScript 的完美结合，提升开发效率', isHot: true },
    { id: 'rank-103', title: '四月小结: 我是如何开始拥有睡后收入的，经验分享', isHot: false },
    { id: 'rank-104', title: '前端也要懂点k8s - 容器化部署入门 (上篇)', isHot: false },
    { id: 'rank-105', title: 'XXL-TOOL v1.4.0 发布 | Java分布式任务调度新特性解读', isHot: false },
    { id: 'rank-106', title: '深入理解CSS中的Grid布局与Flexbox的实际应用案例', isHot: false },
  ];

  const fetchRankedArticles = () => {
    console.log('Fetching ranked articles');
    // TODO: 调用API获取榜单数据，并更新 rankedArticles.value （不过目前没看到有这个功能，就当占位符吧）
    // 模拟随机取5条
    rankedArticles.value = [...mockRankedArticlesData].sort(() => 0.5 - Math.random()).slice(0, 5);
  };

  onMounted(() => {
    fetchRankedArticles();
  });

  const refreshRanking = () => {
    fetchRankedArticles();
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'bg-red-500';
    if (rank === 2) return 'bg-orange-500';
    if (rank === 3) return 'bg-yellow-500';
    return 'bg-gray-400'; // 保持灰色给其他排名
  };

  // --- 未来或许有的对接点 现在可以不用管这个组件 ---
  // 1. rankedArticles: 从 articleStore 或专门的 rankingStore 获取。
  // 2. fetchRankedArticles: 实现真实的API调用。
</script>

<style scoped>
  /* 特定于此组件的非Tailwind样式 */
  /* text-xxs 之前在这里定义过，暂时不是很需要启用这个样式 */
  /* .text-xxs {
    font-size: 0.65rem;
    line-height: 0.9rem;
  } */
</style>

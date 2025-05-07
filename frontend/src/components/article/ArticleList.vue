<template>
  <div>
    <div v-if="isLoading" class="space-y-4">
      <!-- 骨架屏 -->
      <ArticleCardSkeleton v-for="n in skeletonCount" :key="`skeleton-${n}`" />
    </div>
    <div v-else-if="!articles || articles.length === 0" class="text-center py-12">
      <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">暂无文章</h3>
      <p class="mt-1 text-sm text-gray-500">
        尝试更换筛选条件或稍后再试。
      </p>
      <!-- 可以添加一个 去写文章 的按钮 -->

    </div>
    <div v-else class="space-y-4">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        @tag-click="handleTagClickInList"
        @like-article="handleLikeArticleInList"
      />
    </div>

    <div v-if="!isLoading && articles && articles.length > 0 && showLoadMoreButton" class="mt-6 text-center">
      <button
        @click="emitLoadMore"
        :disabled="isLoadingMore"
        class="bg-white hover:bg-gray-50 text-blue-600 font-medium py-2.5 px-6 border border-gray-200 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoadingMore ? '加载中...' : '加载更多' }}
      </button>
    </div>
  </div>
</template>

<script setup>
  import ArticleCard from './ArticleCard.vue';
  import ArticleCardSkeleton from './ArticleCardSkeleton.vue';
  import { DocumentTextIcon } from '@heroicons/vue/24/outline';
  // import { useRouter } from 'vue-router';

  const props = defineProps({
    articles: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isLoadingMore: { // “加载更多”按钮的加载状态
      type: Boolean,
      default: false,
    },
    showLoadMoreButton: {
      type: Boolean,
      default: false,
    },
    skeletonCount: { // 骨架屏数量
      type: Number,
      default: 3,
    }
  });

  const emit = defineEmits(['load-more', 'tag-click', 'like-article']);

  // const router = useRouter();

  const emitLoadMore = () => {
    emit('load-more');
  };

  const handleTagClickInList = (tagIdOrName) => {
    emit('tag-click', tagIdOrName);
  };

  const handleLikeArticleInList = (payload) => {
    emit('like-article', payload);
  };

  // const navigateToCreateArticle = () => {
  //   router.push('/editor/new');
  // }

  // TODO 对接处
  // 1. props.articles: 从 articleStore.articles getter 获取。
  // 2. props.isLoading: 从 articleStore.isLoadingList getter 获取。
  // 3. props.isLoadingMore: 当触发加载更多时，articleStore中应有对应状态。
  // 4. props.showLoadMoreButton: 根据 articleStore.hasMoreArticles getter 判断。
  // 5. 'load-more' 事件: HomePage.vue 监听此事件，并调用 articleStore 的加载更多 action。
  // 6. 'tag-click' 和 'like-article' 事件: HomePage.vue 监听并传递给相应的 store action。
</script>

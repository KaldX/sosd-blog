<template>
  <div class="flex flex-col lg:flex-row gap-6">
    <!-- 左侧分类导航栏 -->
    <aside class="w-full lg:w-1/5 xl:w-1/6 order-1 lg:order-none">
      <div class="bg-white p-4 rounded-lg shadow sticky top-20"> <!-- sticky top-20 (header is h-16 + py-4 from main) -->
        <h2 class="text-lg font-semibold text-gray-800 mb-3">分类导航</h2>
        <nav>
          <ul>
            <li v-for="category in categories" :key="category.id">
              <button
                @click="selectCategory(category.id)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md text-sm font-medium mb-1 flex items-center space-x-2',
                  selectedCategoryId === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                ]"
              >
                <span>{{ category.name }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- 中间主内容区 -->
    <section class="w-full lg:flex-grow order-3 lg:order-none">
      <!-- 顶部筛选Tab (推荐/最新) -->
      <div class="bg-white mb-4 rounded-lg shadow overflow-hidden">
        <TabGroup>
          <TabList class="flex border-b border-gray-200">
            <Tab
              v-for="tab in articleFilterTabs"
              :key="tab.id"
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  'px-4 py-3 text-sm font-medium focus:outline-none',
                  selected
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent',
                ]"
                @click="selectArticleFilter(tab.id)"
              >
                {{ tab.name }}
              </button>
            </Tab>
          </TabList>
        </TabGroup>
      </div>

      <!-- 文章列表区域 -->
      <div>
        <ArticleList
          :articles="mockArticles"
          :is-loading="isLoadingArticles"
          :is-loading-more="isLoadingMoreForButton"
          :show-load-more-button="hasMoreArticles && mockArticles.length > 0"
          @load-more="handleLoadMoreArticles"
          @tag-click="handleTagClickFromList"
          @like-article="handleLikeArticleFromList"
        />
      </div>
    </section>

    <!-- 右侧小部件栏 -->
    <aside class="w-full lg:w-1/4 xl:w-1/5 order-2 lg:order-none space-y-6">
      <div class="sticky top-20"> <!-- sticky top-20 -->
        <SignInWidget />
        <ArticleRankingWidget class="mt-6" />
        <PromotionWidget class="mt-6" />
        <!-- 可以添加更多小部件 -->
      </div>
    </aside>
  </div>
</template>

<script setup>

  import { ref, computed, onMounted } from 'vue';
  import { TabGroup, TabList, Tab } from '@headlessui/vue';
  import ArticleList from '@/components/article/ArticleList.vue';
  import SignInWidget from '@/components/widgets/SignInWidget.vue';
  import ArticleRankingWidget from '@/components/widgets/ArticleRankingWidget.vue';
  import PromotionWidget from '@/components/widgets/PromotionWidget.vue';

  // --- 一些数据 ---
  const categories = ref([
    { id: 'all', name: '综合', icon: null },
    { id: 'frontend', name: '前端', icon: null },
    { id: 'backend', name: '后端', icon: null },
    { id: 'ai', name: '人工智能', icon: null },
    { id: 'devops', name: '开发工具', icon: null },
    // 根据实际分类调整
  ]);
  const selectedCategoryId = ref('all');

  const articleFilterTabs = ref([
    { id: 'recommended', name: '推荐' },
    { id: 'latest', name: '最新' },
    // { id: 'hot', name: '热榜' }, // 根据后端接口能力添加
  ]);
  const selectedArticleFilterId = ref('recommended');

  const mockArticles = ref([]);
  const isLoadingArticles = ref(false);
  const isLoadingMoreForButton = ref(false); // 用于控制加载更多按钮的loading状态
  const currentPage = ref(1);
  const hasMoreArticles = ref(true); // 假设初始有更多文章

  const generateMockArticle = (id) => ({
    id: id,
    title: `这是文章标题 ${id} - SOSD博客`,
    summary: `这里是文章的摘要内容，简要介绍文章的核心观点和吸引读者的地方。这是第 ${id} 篇分享，包含了很多有价值的信息和实践经验。`,
    author: { id: `user${id % 5}`, name: `作者${id % 5 || 5}` },
    publishDate: `2025-04-${String(28 - (id % 28)).padStart(2, '0')}`,
    tags: ['Vue', 'JavaScript', id % 2 === 0 ? '后端' : 'AI'],
    coverImage: id % 3 === 0 ? `https://sosd.fzu.edu.cn/static/image/gateway.e4139102.png` : null,
    stats: {
      views: Math.floor(Math.random() * 2000) + 50,
      likes: Math.floor(Math.random() * 300) + 10,
      comments: Math.floor(Math.random() * 50) + 2,
    },
  });

  const fetchMockArticles = (page = 1, category = 'all', filter = 'recommended') => {
    console.log(`Fetching articles: page=${page}, category=${category}, filter=${filter}`);
    isLoadingArticles.value = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        const newArticles = [];
        const startId = (page - 1) * 10 + 1;
        for (let i = 0; i < 10; i++) {
          newArticles.push(generateMockArticle(startId + i));
        }
        isLoadingArticles.value = false;
        resolve(newArticles);
      }, 800);
    });
  };

  onMounted(async () => {
    const initialArticles = await fetchMockArticles(
      currentPage.value,
      selectedCategoryId.value,
      selectedArticleFilterId.value
    );
    mockArticles.value = initialArticles;
    // 假设总共有30篇文章，用于模拟 hasMoreArticles
    hasMoreArticles.value = mockArticles.value.length < 30;
  });

  // --- 事件处理占位 ---
  const selectCategory = async (categoryId) => {
    console.log('Selected category:', categoryId);
    selectedCategoryId.value = categoryId;
    currentPage.value = 1; // 重置页码
    // TODO: 调用 articleStore.fetchArticles({ category: categoryId, filter: selectedArticleFilterId.value, page: 1 })
    const newArticles = await fetchMockArticles(
      currentPage.value,
      selectedCategoryId.value,
      selectedArticleFilterId.value
    );
    mockArticles.value = newArticles;
    hasMoreArticles.value = mockArticles.value.length < 30;
  };

  const selectArticleFilter = async (filterId) => {
    console.log('Selected article filter:', filterId);
    selectedArticleFilterId.value = filterId;
    currentPage.value = 1; // 重置页码
    // TODO: 调用 articleStore.fetchArticles({ category: selectedCategoryId.value, filter: filterId, page: 1 })
    const newArticles = await fetchMockArticles(
      currentPage.value,
      selectedCategoryId.value,
      selectedArticleFilterId.value
    );
    mockArticles.value = newArticles;
    hasMoreArticles.value = mockArticles.value.length < 30;
  };

  const handleLoadMoreArticles = async () => {
    if (!hasMoreArticles.value || isLoadingArticles.value || isLoadingMoreForButton.value) return;
    console.log('Load more articles from HomePage');
    currentPage.value += 1;
    isLoadingMoreForButton.value = true; // 开始加载更多
    // TODO: 调用 articleStore.fetchMoreArticles(...)
    const newArticles = await fetchMockArticles(
      currentPage.value,
      selectedCategoryId.value,
      selectedArticleFilterId.value
    );
    mockArticles.value = [...mockArticles.value, ...newArticles];
    hasMoreArticles.value = mockArticles.value.length < 30; // 假设总共30篇
    isLoadingMoreForButton.value = false; // 加载完成
  };

  const handleTagClickFromList = (tagIdOrName) => {
    console.log('Tag clicked in HomePage, received from ArticleList:', tagIdOrName);
    // TODO: 实现跳转到标签页或根据标签筛选文章
    // router.push(`/tag/${tagIdOrName}`);
  };

  const handleLikeArticleFromList = (payload) => {
    console.log('Like article in HomePage, received from ArticleList:', payload);
    // TODO: 调用 articleStore.toggleLikeArticle(payload.articleId)
    // 模拟更新本地数据，实际应由store驱动
    const article = mockArticles.value.find(a => a.id === payload.articleId);
    if (article) {
      article.isLikedByCurrentUser = payload.isLiked;
      if (payload.isLiked) {
        article.stats.likes = (article.stats.likes || 0) + 1;
      } else {
        article.stats.likes = Math.max(0, (article.stats.likes || 0) - 1);
      }
    }
  };

  // TODO 对接点
  // 1. categories: 可能从 tagStore 或全局配置获取
  // 2. selectedCategoryId, selectedArticleFilterId: 可能由 articleStore 管理或作为路由参数
  // 3. mockArticles, isLoadingArticles, currentPage, hasMoreArticles: 由 articleStore 管理
  // 4. fetchMockArticles 逻辑替换为调用 articleStore 的 action
  // 5. selectCategory, selectArticleFilter, handleLoadMoreArticles 中的 store 调用
</script>

<style scoped>
</style>

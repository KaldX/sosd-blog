<template>
  <article class="bg-white p-4 sm:p-5 rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out">
    <div class="flex flex-col">
      <!-- 文章元信息：作者、日期、分类 (可选) -->
      <div class="flex items-center text-xs text-gray-500 mb-2">
        <router-link
          v-if="article.author"
          :to="`/profile/${article.author.id}`"
          class="hover:text-blue-600 hover:underline"
        >
          {{ article.author.name }}
        </router-link>
        <span v-if="article.author && article.publishDate" class="mx-1.5">·</span>
        <span v-if="article.publishDate">{{ formattedPublishDate }}</span>
        <!-- 可以添加文章分类标签 -->
        <span
          v-if="article.category"
          class="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xxs"
        >
          {{ article.category.name }}
        </span>
      </div>

      <!-- 文章主内容区 -->
      <div class="flex gap-4">
        <!-- 左侧：标题和摘要 -->
        <div class="flex-grow">
          <h2 class="text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-600 mb-1.5 leading-tight">
            <router-link :to="`/article/${article.id}`" class="line-clamp-2">
              {{ article.title }}
            </router-link>
          </h2>
          <p v-if="article.summary" class="hidden sm:block text-gray-600 text-sm mb-3 line-clamp-2 sm:line-clamp-3">
            {{ article.summary }}
          </p>
        </div>

        <!-- 右侧：封面图 (可选) -->
        <router-link
          v-if="article.coverImage"
          :to="`/article/${article.id}`"
          class="hidden sm:block flex-shrink-0 w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 rounded overflow-hidden"
        >
          <img
            :src="article.coverImage"
            :alt="article.title"
            class="w-full h-full object-cover"
          />
        </router-link>
      </div>

      <!-- 底部：标签，互动数据 -->
      <div class="mt-auto pt-2 flex items-center justify-between text-xs text-gray-500">
        <div class="flex flex-wrap gap-x-2 gap-y-1 items-center">
          <span
            v-for="tag in article.tags"
            :key="tag.id || tag"
            class="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xxs hover:bg-gray-200 cursor-pointer"
            @click="handleTagClick(tag)"
          >
            {{ typeof tag === 'object' ? tag.name : tag }}
          </span>
        </div>

        <div class="flex items-center space-x-3 flex-shrink-0 ml-2">
          <button
            @click.stop="handleLike"
            title="点赞"
            class="flex items-center hover:text-blue-600"
            :class="{ 'text-blue-600': article.isLikedByCurrentUser }"
          >
            <HandThumbUpIcon
              :class="['h-3.5 w-3.5 mr-0.5', article.isLikedByCurrentUser ? 'text-blue-600 fill-blue-600' : '']"
              aria-hidden="true"
            />
            <span>{{ article.stats?.likes || 0 }}</span>
          </button>
          <router-link :to="`/article/${article.id}#comments`" title="评论" class="flex items-center hover:text-blue-600">
            <ChatBubbleOvalLeftEllipsisIcon class="h-3.5 w-3.5 mr-0.5" aria-hidden="true" />
            <span>{{ article.stats?.comments || 0 }}</span>
          </router-link>
          <span title="浏览量" class="flex items-center">
             <EyeIcon class="h-3.5 w-3.5 mr-0.5" aria-hidden="true" />
            <span>{{ article.stats?.views || 0 }}</span>
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { HandThumbUpIcon, ChatBubbleOvalLeftEllipsisIcon, EyeIcon } from '@heroicons/vue/24/outline';

  const props = defineProps({
    article: {
      type: Object,
      required: true,
      default: () => ({ // 提供一个默认结构，参考 apifox ，后续可以调整
        id: 'default-id',
        title: '默认文章标题',
        summary: '这是一段默认的文章摘要内容，用于展示卡片的基本样式和布局。',
        author: { id: 'author-id', name: '默认作者' },
        publishDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        category: { id: 'cat-default', name: '默认分类' },
        tags: [{id: 'tag1', name: '标签1'}, {id: 'tag2', name: '标签2'}], // 可以是字符串数组或对象数组
        coverImage: null,
        stats: {
          views: 0,
          likes: 0,
          comments: 0,
        },
        isLikedByCurrentUser: false, // 假设的字段，表示当前用户是否已点赞
      }),
    },
  });

  const emit = defineEmits(['tag-click', 'like-article']);

  const router = useRouter();

  const formattedPublishDate = computed(() => {
    if (!props.article.publishDate) return '';
    // TODO: 可以忽略：或许可以使用更友好的日期格式化，如 "x天前", "x月x日"
    // 例如使用 day.js 或 date-fns
    // 简单实现：
    const date = new Date(props.article.publishDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  });

  const handleTagClick = (tag) => {
    console.log('Tag clicked:', tag);
    emit('tag-click', typeof tag === 'object' ? tag.id : tag);
    // TODO: 可以在父组件或通过store跳转到标签对应的文章列表页
    // router.push(`/tag/${typeof tag === 'object' ? tag.name : tag}`);
  };

  const handleLike = () => {
    console.log('Like button clicked for article:', props.article.id);
    emit('like-article', { articleId: props.article.id, isLiked: !props.article.isLikedByCurrentUser });
    // TODO: 调用 articleStore.toggleLikeArticle(props.article.id)
    // 这里的 props.article.isLikedByCurrentUser 和 props.article.stats.likes 应该由store更新后响应式变化
  };

  // TODO: 对接处
  // 1. props.article: 确保传入的数据结构与 OpenAPI 文档中的文章列表项一致或兼容。
  //    - `author`: { id, name }
  //    - `publishDate`: ISO 格式日期字符串
  //    - `category`: { id, name } (可选)
  //    - `tags`: 数组，元素可以是 string (tagName) 或 { id, name }
  //    - `coverImage`: 图片URL
  //    - `stats`: { views, likes, comments }
  //    - `isLikedByCurrentUser`: boolean，需要后端接口支持或前端在点赞后维护此状态。
  // 2. `formattedPublishDate`: 考虑使用 `src/utils/formatters.js` 中的日期格式化函数。
  // 3. `handleTagClick`: 父组件监听 `tag-click` 事件，并根据tagId或tagName进行路由跳转或筛选。
  // 4. `handleLike`: 父组件监听 `like-article` 事件，并调用 `articleStore` 中的action来处理点赞/取消点赞逻辑。
  //    点赞成功后，`article.isLikedByCurrentUser` 和 `article.stats.likes` 应由Pinia更新，组件会响应式地重新渲染。
</script>

<style scoped>
  /* 很小的字 */
  .text-xxs {
    font-size: 0.65rem; /* 10.4px */
    line-height: 0.9rem;
  }
</style>

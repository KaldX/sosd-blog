<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <app-logo :show-text="true" text-class="text-xl" size="small"/>
      </div>

      <!-- 中间导航 -->
      <nav class="hidden md:flex space-x-6 items-center">
        <router-link
          to="/"
          class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          active-class="text-blue-600 bg-blue-50"
        >
          首页
        </router-link>
        <router-link to="/explore" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium" active-class="text-blue-600 bg-blue-50">
          发现
        </router-link>
        <router-link to="/tags" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium" active-class="text-blue-600 bg-blue-50">
          标签
        </router-link>

      </nav>

      <!-- 右侧操作区 -->
      <div class="flex items-center space-x-4">
        <!-- 搜索框 -->
        <div class="hidden sm:block">
          <input
            type="text"
            placeholder="探索SOSD博客"
            class="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          @click="handleWriteArticle"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium"
        >
          写文章
        </button>

        <!-- 用户状态 (根据登录状态切换) -->
        <div v-if="isLoggedIn" class="relative">
          <!-- Headless UI Menu 下拉菜单 -->
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton class="flex items-center space-x-2 focus:outline-none">
                <img
                  class="h-8 w-8 rounded-full object-cover"
                  :src="userAvatar || '@/assets/images/momo.png'"
                  alt="用户头像"
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="navigateToUserProfile"
                      :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                    >
                      个人主页
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="navigateToSettings"
                      :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                    >
                      账号设置
                    </button>
                  </MenuItem>
                </div>
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="handleLogout"
                      :class="[
                        active ? 'bg-red-500 text-white' : 'text-gray-900',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                    >
                      退出登录
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div v-else class="flex items-center space-x-2">
          <router-link
            to="/auth/login"
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            登录
          </router-link>
          <router-link
            to="/auth/register"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-md text-sm font-medium"
          >
            注册
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
  import AppLogo from '@/components/common/AppLogo.vue';

  // --- 模拟数据和状态 ---
  // TODO: 这些状态和数据将由 userStore (Pinia) 管理
  const isLoggedIn = ref(false); // 模拟未登录状态，TODO 替换为从Pinia获取
  const mockUserId = ref(123); // 模拟用户ID
  const userAvatar = ref(''); // 模拟用户头像URL


  // --- Props (此组件通常不直接接收props，而是从store获取状态) ---

  // --- Emits (此组件可能会emit一些全局事件，但更常见的是通过router或store action处理) ---

  const router = useRouter();

  // --- 事件处理占位 ---
  const handleWriteArticle = () => {
    console.log('Navigate to write article page');
    // TODO: router.push('/editor/new') 或检查登录状态
    if (isLoggedIn.value) {
      router.push('/editor/new'); // 假设的写文章页面路由
    } else {
      router.push('/login?redirect=/editor/new'); // 未登录则跳转登录
    }
  };

  const navigateToUserProfile = () => {
    console.log('Navigate to user profile');
    // TODO: router.push(`/profile/${userStore.userId}`)
    if (isLoggedIn.value && mockUserId.value) {
      router.push(`/profile/${mockUserId.value}`); // 假设的用户主页路由
    }
  };

  const navigateToSettings = () => {
    console.log('Navigate to settings');
    // TODO: 开发者B: router.push('/settings')
    if (isLoggedIn.value) {
      router.push('/settings'); // 假设的设置页面路由
    }
  };

  const handleLogout = () => {
    console.log('Handle logout');
    // TODO: 开发者B: 调用 userStore.logout() action
    isLoggedIn.value = false; // 模拟登出
    userAvatar.value = '';
    router.push('/'); // 返回首页
  };

  // TODO 对接点
  // 1. isLoggedIn: 从 userStore.isLoggedIn getter 获取
  // 2. userAvatar: 从 userStore.currentUser.avatar getter 获取
  // 3. mockUserId: 从 userStore.currentUser.id getter 获取
  // 4. handleWriteArticle, navigateToUserProfile, navigateToSettings, handleLogout 中的路由跳转和store调用
</script>

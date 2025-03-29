<template>
  <div class="app-container">
    <el-container>
      <!-- 头部导航 -->
      <el-header class="header">
        <div class="header-container">
          <!-- 标题和logo -->
          <div class="logo">
            <router-link to="/">
              <span class="logo-text">SOSD - 博客系统</span>
            </router-link>
          </div>

          <!-- 导航菜单 -->
          <el-menu mode="horizontal" router :ellipsis="false" class="nav-menu" :default-active="activeIndex">
            <div class="flex-spacer"></div>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/blogs">博客</el-menu-item>

            <!-- 登录注册菜单/用户未登录状态 -->
            <template v-if="!isLoggedIn">
              <el-menu-item index="/login">
                <el-icon><User/></el-icon>登录
              </el-menu-item>
              <el-menu-item index="/register">
                <el-icon><Edit/></el-icon>注册
              </el-menu-item>
            </template>

          </el-menu>
        </div>
      </el-header>

      <!-- 主内容 -->
      <el-main class="main-container">
        <router-view v-slot="{ Component }">    <!-- 通过v-slot获取路由组件 -->
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>

      <!-- 页脚 -->
      <el-footer class="footer">
        <div class="footer-content">
          <p>SOSD - 博客系统</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Edit, User } from '@element-plus/icons-vue'

const route = useRoute()

// 导航栏高亮
const activeIndex = computed(() => route.path)

// 用户登录状态（待配置）
const isLoggedIn = ref(false)
const username = ref('username')

// 登出
const logout = () => {
  isLoggedIn.value = false
  console.log('用户登出')
}

</script>


<style>
/* 全局样式 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--el-text-color-primary);
}

/* app容器 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* header样式 */
.header-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}

/* 标题 和 logo样式 */
.logo {
  margin-right: 40px;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: var(--el-color-primary);
}

/* 导航菜单样式 */
.nav-menu {
  flex: 1;
  border-bottom: none;
  justify-content: flex-end;
}

.flex-spacer {
  flex-grow: 1;
}

/* 主内容区 */
.el-main.main-container {
  background-color: #f5f7fa;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

/* 页脚 */
.el-footer.footer {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

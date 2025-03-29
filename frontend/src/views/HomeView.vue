<template>
  <div class="home">
    <div class="welcome">
      <h1>欢迎来到博客</h1>
      <h2>这是一个博客</h2>
      <div class="action-buttons">
        <router-link to="/login">
          <el-button type="primary">登录</el-button>
        </router-link>
        <router-link to="/register">
          <el-button type="primary" plain>注册</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElButton } from 'element-plus'
</script>

<style scoped>
.home {
  padding: 20px;
}

.welcome {
  text-align: center;
  padding: 50px 0;
}

h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 16px;
}

h2 {
  font-size: 20px;
  color: #666;
  margin-bottom: 32px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

</style>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h2>登录</h2>
        </div>
      </template>
      <LoginForm />
    </el-card>
  </div>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 10px;
}

.login-card {
  padding: 20px;
  width: 100%;
  max-width: 450px;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  margin: 0;
  color: #303133;
}
</style>

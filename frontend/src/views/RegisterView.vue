<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <div class="card-header">
          <h2>注册</h2>
        </div>
      </template>
      <RegisterForm />
    </el-card>
  </div>
</template>

<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 10px;
}

.register-card {
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

<template>
  <el-form ref="loginFormRef" :model="form" :rules="rules" status-icon label-position="top" @submit.prevent="handleSubmit">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="User" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password />
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="form.remember" label="记住我" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="isLoading" class="submit-button" @click="handleSubmit">
        {{ isLoading ? '登录中...' : '登录' }}
      </el-button>
    </el-form-item>

    <div class="form-footer">
      还没有账号？
      <router-link to="/register" class="register-link">立即注册</router-link>
    </div>

  </el-form>
</template>


<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不少于 6 个字符', trigger: 'blur' }
  ]
}

const isLoading = ref(false)
const loginFormRef = ref(null)
const router = useRouter()

// 提交处理函数
const handleSubmit = () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) {
      return false
    }

    isLoading.value = true

    try {
      // 在这里请求登录接口
      console.log('登录:', form)

      // 登录成功提示
      ElMessage({
        message: '登录成功！',
        type: 'success',
        duration: 2000
      })

      await router.push('/')
    } catch (error) {
      // 登录失败提示
      ElMessage.error('用户名或密码错误，请重试')
      console.error('登录失败:', error)
    } finally {
      isLoading.value = false
    }
  })
}
</script>


<style scoped>
.submit-button {
  width: 100%;
}

.form-footer {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  color: #606266;
}

.register-link {
  color: #409EFF;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
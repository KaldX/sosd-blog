<template>
  <el-form ref="registerFormRef" :model="form" :rules="rules" status-icon label-position="top" @submit.prevent="handleSubmit">

    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="User"/>
    </el-form-item>

    <el-form-item label="电子邮件" prop="email">
      <el-input v-model="form.email" placeholder="请输入电子邮件" prefix-icon="Message"/>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password/>
    </el-form-item>

    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" prefix-icon="Lock" show-password/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="isLoading" class="submit-button" @click="handleSubmit">
        {{ isLoading ? '注册中...' : '注册' }}
      </el-button>
    </el-form-item>

    <div class="form-footer">
      已有账号？
      <router-link to="/login" class="login-link">立即登录</router-link>
    </div>
  </el-form>
</template>


<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateConfirmPassword = (rules, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入电子邮件', trigger: 'blur' },
    { type: 'email', message: '请输入正确的电子邮件地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不少于 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

const isLoading = ref(false)
const registerFormRef = ref(null)
const router = useRouter()

// 提交处理函数
const handleSubmit = () => {
  registerFormRef.value.validate(async (valid) => {
    if (!valid) {
      return false
    }

    isLoading.value = true

    try {
      // 在这里加入注册接口
      console.log('注册数据:', form)

      // 注册成功提示
      ElMessage({
        message: '注册成功！',
        type: 'success',
        duration: 2000
      })

      await router.push('/login')
    } catch (error) {
      // 注册失败提示
      ElMessage.error('注册失败，请重试')
      console.error('注册失败:', error)
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

.login-link {
  color: #409EFF;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
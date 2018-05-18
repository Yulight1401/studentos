<template>
  <div id="login-container">
    <el-form class="login-form"
             :rules="rules"
             auto-complete="on"
             :model="loginForm"
             ref="loginForm">
      <el-form-item prop="username"
                    label="username">
        <el-input v-model="loginForm.username"
                  placeholder="请输入用户名"
                  auto-complete="on"
                  type="text"></el-input>
      </el-form-item>
      <el-form-item prop="password"
                    label="password">
        <el-input v-model="loginForm.password"
                  type="password"
                  @keyup.enter.native="handleLogin"
                  placeholder="请输入密码"
                  auto-complete="on"></el-input>
      </el-form-item>

    </el-form>
    <el-row>
      <el-col :span="12"
              class="btn-container">
        <el-button type="primary"
                   @click.native.prevent="handleLogin">登录</el-button>
      </el-col>
      <el-col :span="12"
              class="btn-container">
        <el-button type="primary"
                   @click.native.prevent="register">注册</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { isValidUsername } from '@/utils/validate.js'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error('请输入正确的用户名！'))
      } else {
        callback()
      }
    }
    const validatepassword = (rule, value, callback) => {
      if (rule.length <= 6) {
        callback(new Error('密码要求大于6个字符！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatepassword
          }
        ]
      }
    }
  },
  methods: {
    handleLogin() {},
    register() {}
  }
}
</script>
<style>
#login-container {
  width: 300px;
  padding: 20px 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
}
.btn-container {
  display: flex;
  justify-content: center;
}
.register-content {
  display: inline-block;
  padding: 26px 0;
}
</style>

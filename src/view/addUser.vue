<template>
  <div class="addUser">
    <el-form ref="form"
             status-icon
             :rules="rules"
             :model="form"
             label-width="80px"
             label-position="left">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="form.username"
                  placeholder="登录系统时的用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="form.password"
                  placeholder="登录系统所使用的密码,需大于六个字符"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item label="姓名"
                    prop="name">
        <el-input v-model="form.name"
                  placeholder="请输入用户姓名"
                  @keyup.enter.native="add">
        </el-input>
      </el-form-item>
      <el-form-item label="学号"
                    prop="id">
        <el-input v-model="form.id"
                  readonly></el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24"
              class="btn-container">
        <el-button type="primary"
                   class="addBtn"
                   round
                   @click.native.prevent="add">
          立即增加
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import getID from '../utils/id'
export default {
  name: 'addUser',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback('用户名不能为空')
      }
      this.DB.getByIndex('user', value, 'account')
        .then(result => {
          callback('用户名已被注册')
        })
        .catch(error => {
          callback()
        })
    }
    const validatePassword = (rule, value, callback) => {
      if (value && value.length >= 6) {
        callback()
      } else {
        callback('请修改，密码需要大于六个字符')
      }
    }
    const validateName = (rule, value, callback) => {
      if (this._.isEmpty(value)) {
        callback('姓名不能为空')
      }
      callback()
    }
    return {
      form: {
        username: '',
        password: '',
        name: '',
        id: getID()
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
            validator: validatePassword
          }
        ],
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateName
          }
        ]
      }
    }
  },
  methods: {
    add() {
      this.$refs.form.validate(valid => {
        if (valid) {
          try {
            let data = {
              name: this.form.name,
              id: this.form.id,
              account: {
                username: this.form.username,
                password: this.form.password
              }
            }
            this.DB.add(data)
          } catch (error) {
            this.message({
              type: 'error',
              message: '用户增加失败'
            })
          }
          this.message({
            type: 'success',
            message: '用户增加成功'
          })
        }
      })
    }
  }
}
</script>

<style>
.addUser {
  width: 500px;
}
.addBtn {
  width: 200px;
}
</style>


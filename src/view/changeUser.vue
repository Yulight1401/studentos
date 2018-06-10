<template>
  <div class="changeUser">
    <el-steps :active="activeStep"
              align-center>
      <el-step title="FIND"
               description="我们一起找到想要修改信息的用户吧！"></el-step>
      <el-step title="CHANGE"
               description="现在，开始修改该用户信息吧！！！"></el-step>
    </el-steps>
    <template v-if="activeStep === 1">
      <div class="findUser-content">
        <template>
          <div class="findUser">
            <el-alert title="查找须知！！！"
                      type="warning"
                      description="以下三个查找条件，只能够选择其中一个，如果多写，将以姓名，学号，用户名的顺序，选择最靠前的信息，作为查询条件,信息输入完毕，回车即可开始查找！"
                      close-text="知道了"
                      show-icon>
            </el-alert>
            <el-form ref="form"
                     :model="form"
                     label-position="top"
                     status-icon>
              <el-form-item prop="name"
                            label="姓名">
                <el-input v-model="form.name"
                          placeholder="输入想要查找的用户的姓名"
                          @keyup.enter.native="find"></el-input>
              </el-form-item>
              <el-form-item prop="id"
                            label="学号">
                <el-input v-model="form.id"
                          placeholder="请输入想要查找信息的学号"
                          @keyup.enter.native="find"></el-input>
              </el-form-item>
              <el-form-item prop="username"
                            label="用户名">
                <el-input v-model="form.username"
                          placeholder="请输入想要查找信息的用户名"
                          @keyup.enter.native="find"></el-input>
              </el-form-item>
            </el-form>
            <el-row>
              <el-col :span="24"
                      class="btn-container">
                <el-button type="primary"
                           class="Btn"
                           @click.native.prevent="find"
                           round>
                  开始查找
                </el-button>
              </el-col>
            </el-row>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <el-alert title="修改须知"
                show-icon
                close-text="知道了"
                type="warning"
                description="修改需要修改的内容即可，但是需要注意的是，学号无法修改，这是唯一确定用户的数据，所以理解万岁！！！">

      </el-alert>
      <div class="changeUser-content">
        <el-form ref="form"
                 :model="form"
                 label-position="top">
          <el-form-item label="姓名"
                        prop="name">
            <el-input v-model="result.name"
                      placeholder="请输入修改过后的姓名"></el-input>
          </el-form-item>
          <el-form-item label="学号"
                        prop="id">
            <el-input v-model="result.id"
                      readonly
                      placeholder="请输入修改过后的学号，例如201621092026"></el-input>
          </el-form-item>
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="result.username"
                      placeholder="请输入修改过后的用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="result.password"
                      placeholder="请输入修改过后的密码"></el-input>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="24"
                  class="btn-container">
            <el-button round
                       type="primary"
                       class="Btn"
                       @click.native.prevent="changeUser">立即修改</el-button>
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'changeUser',
  data() {
    return {
      activeStep: 1,
      form: {
        name: '',
        id: null,
        username: ''
      },
      result: null
    }
  },
  methods: {
    find() {
      if (this.form.name) {
        this.DB.getByIndex('user', this.form.name, 'name')
          .then(result => {
            this.change(result)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查找失败' + err
            })
          })
      } else if (this.form.id) {
        this.DB.get('user', this.form.id)
          .then(result => {
            this.change(result)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查找失败' + err
            })
          })
      } else if (this.form.username) {
        this.DB.getByIndex('user', this.form.username, 'account')
          .then(result => {
            this.change(result)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查找失败' + err
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '大哥！算我求你了，好好输入相应的信息，谢谢！！！'
        })
      }
    },
    change(res) {
      this.result = {
        name: res.name,
        id: res.id,
        username: res.account.username,
        password: res.account.password
      }
      this.activeStep = 2
    },
    changeUser() {
      let value = Number.parseInt(this.form.id)
      this.DB.updata('user', value, this.result).then(res => {
        this.$notify({
          title: '注意',
          message: '用户修改成功啦！！！',
          type: 'success'
        })
        this.activeStep = 1
        this.result = null
        this.form = {
          name: '',
          id: null,
          username: ''
        }
      })
    }
  }
}
</script>

<style>
.changeUser {
  width: 600px;
}
</style>

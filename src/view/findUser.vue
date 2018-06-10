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
    <template v-if="show">
      <div class="result">
        <el-table :data="result"
                  class="result-table">
          <el-table-column prop="name"
                           label="姓名"
                           width="200"></el-table-column>
          <el-table-column prop="id"
                           label="学号"
                           width="200"></el-table-column>
          <el-table-column prop="username"
                           label="用户名"
                           width="200"></el-table-column>
        </el-table>
      </div>
      //TODO: 增加课程信息表格
    </template>
  </div>
</template>

<script>
export default {
  name: 'findUser',
  data() {
    return {
      form: {
        name: '',
        id: null,
        username: ''
      },
      result: null,
      show: false
    }
  },
  methods: {
    find() {
      if (this.form.name) {
        this.DB.getByIndex('user', this.form.name, 'name')
          .then(result => {
            this.showResult(result)
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
            this.showResult(result)
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
            this.showResult(result)
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
    showResult(res) {
      this.result = [
        {
          name: res.name,
          id: res.id,
          username: res.account.username,
          password: res.account.password
        }
      ]
      this.show = true
    }
  }
}
</script>

<style>
.findUser {
  width: 600px;
}
</style>


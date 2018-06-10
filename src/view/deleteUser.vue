<template>
  <div class="deleteUser">
    <el-alert title="查找须知！！！"
              type="warning"
              description="删除一个用户，提供该用户的学号，以便唯一确认该用户！！！"
              close-text="知道了"
              show-icon>
    </el-alert>
    <el-form ref="form"
             :model="form"
             label-position="top"
             status-icon>

      <el-form-item label="学号">
        <el-input v-model="form.id"
                  placeholder="请输入想要删除的用户的学号"
                  @keyup.enter.native="deleteU"></el-input>
      </el-form-item>

    </el-form>
    <el-row>
      <el-col :span="24"
              class="btn-container">
        <el-button type="primary"
                   class="Btn"
                   @click.native.prevent="deleteU"
                   round>
          开始删除
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'deleteUser',
  data() {
    // const validateName = (rule, value, callback) => {
    //   this.DB.getByIndex('user', value, 'name')
    //     .then(result => {
    //       this.delete()
    //       callback()
    //     })
    //     .catch(err => {
    //       this.$notify({
    //         title: '失败',
    //         message: '填写信息有误，系统中无此用户，请确认后重新填写',
    //         type: 'error'
    //       })
    //       callback('无此用户')
    //     })
    // }
    // const validateId = (rule, value, callback) => {
    //   this.DB.get('user', value)
    //     .then(result => {
    //       this.delete()
    //     })
    //     .catch(err => {
    //       this.$notify({
    //         title: '失败',
    //         message: '填写信息有误，系统中无此用户，请确认后重新填写',
    //         type: 'error'
    //       })
    //        callback('无此用户')
    //     })
    // }
    // const validateUsername = (rule, value, callback) => {
    //   this.DB.getByIndex('user', value, 'account')
    //     .then(result => {
    //       this.delete()
    //     })
    //     .catch(err => {
    //       this.$notify({
    //         title: '失败',
    //         message: '填写信息有误，系统中无此用户，请确认后重新填写',
    //         type: 'error'
    //       })
    //        callback('无此用户')
    //     })
    // }
    return {
      form: {
        id: null,
        name: '',
        username: ''
      }
      //   },
      //   rules: {
      //     name: [
      //       {
      //         required: false,
      //         trigger: 'blur',
      //         validator: validateName
      //       }
      //     ],
      //     id: [
      //       {
      //         required: false,
      //         trigger: 'blur',
      //         validator: validateId
      //       }
      //     ],
      //     username: [
      //       {
      //         required: false,
      //         trigger: 'blur',
      //         validator: validateUsername
      //       }
      //     ]
      //   }
      // }
    }
  },
  methods: {
    deleteU() {
      if (this.form.id) {
        this.DB.get('user', this.form.id)
          .then(result => {
            this.deleteResult(this.form.id)
          })
          .catch(err => {
            this.$notify({
              title: '失败',
              type: 'error',
              message: '该用户不存在！！！'
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '大哥！算我求你了，好好输入相应的信息，谢谢！！！'
        })
      }
    },
    deleteResult(value) {
      this.$confirm(
        '此操作将会永久删除该用户在系统中一切消息, 是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          // 执行删除操作
          let myValue = Number.parseInt(value)
          this.DB.delete('user', myValue)

          this.$notify({
            title: '提示',
            type: 'success',
            message: '该用户已删除！！'
          })
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '提示',
            type: 'success',
            message: '已取消删除操作'
          })
        })
    }
  }
}
</script>

<style>
.deleteUser {
  width: 600px;
}
</style>


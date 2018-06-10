<template>
  <div class="deleteCourse">
    <el-alert title="查找须知！！！"
              type="info"
              description="删除一门课程，提供该该课程的课程号，以便唯一确认该课程！！！"
              close-text="知道了"
              show-icon>
    </el-alert>
    <el-form ref="form"
             :model="form"
             label-position="top"
             status-icon>

      <el-form-item label="课程号">
        <el-input v-model="form.id"
                  placeholder="请输入想要删除的课程的课程号"
                  @keyup.enter.native="deleteC"></el-input>
      </el-form-item>

    </el-form>
    <el-row>
      <el-col :span="24"
              class="btn-container">
        <el-button type="primary"
                   class="Btn"
                   @click.native.prevent="deleteC"
                   round>
          开始删除
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'deleteCourse',
  data() {
    return {
      form: {
        id: null
      }
    }
  },
  methods: {
    deleteC() {
      if (this.form.id) {
        this.DB.get('course', this.form.id)
          .then(result => {
            this.deleteResult(this.form.id)
          })
          .catch(err => {
            this.$notify({
              title: '失败',
              type: 'error',
              message:
                '系统中无此课程，你可以先增加课程，再来进行删除操作！！！'
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '大哥！算我求你了，好好输入相应的信息，谢谢！！！'
        })
      }
    },
    deleteResult(id) {
      this.$confirm(
        '此操作将会永久删除该课程在系统中一切消息, 是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          // 执行删除操作
          let myValue = Number.parseInt(id)
          this.DB.delete('course', myValue)
          this.$notify({
            title: '提示',
            type: 'success',
            message: '该课程已删除！！'
          })
          this.form = {
            id: null
          }
        })
        .catch(err => {
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
.deleteCourse {
  width: 600px;
}
</style>

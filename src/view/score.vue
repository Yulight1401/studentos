<template>
  <div class="score">
    <el-alert title="登分须知"
              type="success"
              description="输入想要登录分数的课程的号码，回车即可进入登分页面，但是需要注意的是，分数登记只能登记一次，因此只显示没有登记分数的学生信息，还有一点，零分无效"
              show-icon
              close-text="知道了"></el-alert>
    <el-form ref="form"
             :model="form"
             status-icon
             label-position="top">
      <el-form-item label="课程号">
        <el-input v-model="form.id"
                  placeholder="输入想要登分的课程的号码"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="24"
                class="btn-container">
          <el-button type="primary"
                     class="Btn"
                     round
                     @click.native.prevent="startScore">点击查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="student">
      <el-table-column prop="id"
                       label="学号"></el-table-column>
      <el-table-column prop="name"
                       label="姓名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editScore(scope.row, scope.rowIndex)"
                     size="small"
                     type="success">登记分数</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'score',
  data() {
    return {
      student: [],
      form: {
        id: ''
      }
    }
  },
  methods: {
    startScore() {
      this.student = []
      let newId = Number.parseInt(this.form.id)
      this.DB.get('course', newId)
        .then(res => {
          res.student.forEach(el => {
            this.DB.get('user', el.id).then(res2 => {
              if (!el.score) {
                let data = {
                  id: el.id,
                  name: res2.name
                }
                this.student.push(data)
              }
            })
          })
        })
        .catch(err => {
          this.$notify({
            type: 'error',
            message: '当前课程不存在，请重新输入'
          })
        })
    },
    editScore(row, rowIndex) {
      this.$prompt('请输入成绩', '登记分数', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^1?[1-9]?\d([.]\d)?$/,
        inputErrorMessage: '成绩格式不正确！！！'
      })
        .then(({ value }) => {
          this.DB.get('course', this.form.id).then(res => {
            let studentS = res.student.filter(el => {
              if (el.id === row.id) {
                return false
              }
              return true
            })
            studentS.push({
              id: Number.parseInt(row.id),
              score: Number.parseFloat(value)
            })
            let newValue = {
              student: studentS
            }
            let key = Number.parseInt(this.form.id)
            this.DB.updata('course', key, newValue).then(res4 => {
              this.$message({
                type: 'success',
                message: '分数登记成功！！！'
              })
              this.startScore()
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          })
        })
    }
  }
}
</script>

<style>
.score {
  width: 600px;
}
</style>

<template>
  <div class="findCourse">
    <template v-if="!show">
      <el-alert title="查找须知！！！"
                type="success"
                description="以下三个查找条件，只能够选择其中一个，如果多写，将以课程名，课程号，任课老师名的顺序，选择最靠前的信息，作为查询条件,信息输入完毕，回车即可开始查找！"
                close-text="知道了"
                show-icon>
      </el-alert>
      <el-form ref="form"
               :model="form"
               label-position="top"
               status-icon>
        <el-form-item prop="name"
                      label="课程名">
          <el-input v-model="form.name"
                    placeholder="输入想要查找的课程的名字"
                    @keyup.enter.native="find"></el-input>
        </el-form-item>
        <el-form-item prop="id"
                      label="课程号">
          <el-input v-model="form.id"
                    placeholder="请输入想要查找的课程号"
                    @keyup.enter.native="find"></el-input>
        </el-form-item>
        <el-form-item prop="tname"
                      label="任课老师">
          <el-input v-model="form.tname"
                    placeholder="请输入想要查找课程的任课老师"
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
    </template>
    <template v-else>
      <div class="result">
        <div class="course">
          <el-table :data="result"
                    class="result-table">
            <el-table-column prop="name"
                             label="课程名"
                             width="150"></el-table-column>
            <el-table-column prop="id"
                             label="课程号"
                             width="150"></el-table-column>
            <el-table-column label="任课老师">
              <el-table-column prop="tname"
                               label="姓名"
                               width="150"></el-table-column>
              <el-table-column prop="tsex"
                               label="性别"
                               width="150"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="student">
          <el-alert type="success"
                    title="修课学生信息"
                    description="显示所有选择该课程的学生的基本信息！！！"
                    close-text="知道了"
                    show-icon></el-alert>
          <el-table :data="student"
                    class="student-table"
                    stripe>
            <el-table-column prop="name"
                             width="200"
                             label="姓名"></el-table-column>
            <el-table-column prop="id"
                             width="200"
                             label="学号"></el-table-column>
            <el-table-column prop="score"
                             width="200"
                             label="成绩"></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- TODO: 增加修课学生信息表格 -->
    </template>
  </div>
</template>

<script>
export default {
  name: 'findCourse',
  data() {
    return {
      form: {
        name: '',
        id: null,
        tname: ''
      },
      show: false,
      result: null,
      student: []
    }
  },
  methods: {
    find() {
      if (this.form.name) {
        this.DB.getByIndex('course', this.form.name, 'name')
          .then(result => {
            this.showResult(result)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查找失败!! 请核对后，重新输入信息进行查找。。。。'
            })
          })
      } else if (this.form.id) {
        this.DB.get('course', this.form.id)
          .then(result => {
            this.showResult(result)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查找失败!! 请核对后，重新输入信息进行查找。。。。'
            })
          })
      } else if (this.form.tname) {
        this.DB.getByIndex('course', this.form.username, 'teacher')
          .then(result => {
            this.showResult(result)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查找失败!! 请核对后，重新输入信息进行查找。。。。'
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
          tname: res.teacher.name,
          tsex: res.teacher.sex
        }
      ]
      res.student.forEach(stu => {
        this.DB.get('user', stu.id).then(res => {
          this.student.push({
            name: res.name,
            id: res.id,
            score: stu.score
          })
        })
      })
      this.show = true
    }
  }
}
</script>

<style>
.findCourse {
  width: 602px;
}
</style>

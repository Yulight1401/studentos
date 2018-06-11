<template>
  <div class="findScore">
    <el-tabs v-model="activeName">
      <el-tab-pane label="课程成绩"
                   name="courseS">
        <template v-if="!showC">
          <el-alert title="注意啦！！！"
                    description="输入想要查看成绩的课程号，即可知道选修该课程的所有学生的课程成绩以及一些基本信息"
                    close-text="知道了"
                    type="success"></el-alert>
          <el-form ref="form"
                   status-icon
                   label-position="top"
                   :model="form">
            <el-form-item label="课程号">
              <el-input placeholder="请输入需要查看成绩的课程号"
                        v-model="form.courseID"
                        @keyup.enter.native="findScoreC"></el-input>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="24"
                    class="btn-container">
              <el-button class="Btn"
                         type="primary"
                         round
                         @click.native.prevent="findScoreC">开始查看</el-button>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-table :data="student">
            <el-table-column label="学号"
                             width="200"
                             prop="id"></el-table-column>
            <el-table-column label="姓名"
                             width="200"
                             prop="name"></el-table-column>
            <el-table-column label="成绩"
                             width="200"
                             prop="score"></el-table-column>
          </el-table>
          <el-row>
            <el-col :span="24"
                    class="btn-container">
              <el-button class="Btn"
                         round
                         type="primary"
                         @click.native.prevent="reset">重新查询</el-button>
            </el-col>
          </el-row>
        </template>
      </el-tab-pane>
      <el-tab-pane label="学生成绩"
                   name="studentS">
        <template v-if="!showS">
          <el-alert title="注意啦！！！"
                    description="输入想要查看成绩的学号，即可知道该学生的选修的所有的课程的成绩以及一些基本信息"
                    close-text="知道了"
                    type="warning"></el-alert>
          <el-form ref="form"
                   status-icon
                   label-position="top"
                   :model="form">
            <el-form-item label="学号">
              <el-input placeholder="请输入需要查看成绩的学号"
                        v-model="form.studentID"
                        @keyup.enter.native="findScoreS"></el-input>
            </el-form-item>
          </el-form>
          <el-row class="findScore-btn">
            <el-col :span="24"
                    class="btn-container">
              <el-button class="Btn"
                         type="primary"
                         round
                         @click.native.prevent="findScoreS">开始查看</el-button>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-table :data="course">
            <el-table-column label="课程号"
                             width="200"
                             prop="id"></el-table-column>
            <el-table-column label="课程名"
                             width="200"
                             prop="name"></el-table-column>
            <el-table-column label="成绩"
                             width="200"
                             prop="score"></el-table-column>
          </el-table>
          <el-row>
            <el-col :span="24"
                    class="btn-container">
              <el-button class="Btn"
                         round
                         type="primary"
                         @click.native.prevent="reset">重新查询</el-button>
            </el-col>
          </el-row>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'findScore',
  data() {
    return {
      activeName: 'courseS',
      form: {
        courseID: null,
        studentID: null
      },
      student: [],
      course: [],
      showC: false,
      showS: false
    }
  },
  methods: {
    findScoreS() {
      let value = Number.parseInt(this.form.studentID)
      this.DB.get('user', value).then(res1 => {
        res1.course.forEach(cou => {
          this.DB.get('course', cou).then(res2 => {
            res2.student.forEach(stu => {
              if (stu.id === value) {
                let data = {
                  id: cou,
                  name: res2.teacher.name,
                  score: stu.score
                }
                this.course.push(data)
              }
            })
          })
        })
      })
      this.showS = true
    },
    findScoreC() {
      let value = Number.parseInt(this.form.courseID)
      this.DB.get('course', value).then(res => {
        res.student.forEach(stu => {
          this.DB.get('user', stu.id).then(res => {
            let data = {
              id: res.id,
              name: res.name,
              score: stu.score
            }
            this.student.push(data)
          })
        })
        this.showC = true
      })
    },
    reset() {
      this.showC = false
      this.showS = false
      this.student = []
      this.course = []
      this.form = {
        courseID: '',
        studentID: ''
      }
    }
  }
}
</script>

<style>
.findScore {
  width: 600px;
}
</style>

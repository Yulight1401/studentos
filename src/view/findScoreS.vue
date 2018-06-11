<template>
  <div class="findScoreS">
    <el-alert title="使用提示"
              description="输入框输入自己想要查看成绩的课程的名字，回车开始查询，即可过滤不希望看到的成绩"
              close-text="知道了"
              show-icon
              type="success"></el-alert>
    <el-form :model="form"
             ref="form"
             status-icon
             label-position="top">
      <el-form-item label="课程">
        <el-input v-model="form.name"
                  placeholder="请输入想要查看成绩的课程名"
                  @keyup.enter.native="find"></el-input>
      </el-form-item>
    </el-form>
    <template v-if="!showFilter">
      <el-table :data="courseScore">
        <el-table-column prop="name"
                         label="课程"></el-table-column>
        <el-table-column prop="tname"
                         label="任课老师"></el-table-column>
        <el-table-column prop="score"
                         label="成绩"></el-table-column>
      </el-table>
    </template>
    <template v-else>
      <el-table :data="filterScore">
        <el-table-column prop="name"
                         label="课程"></el-table-column>
        <el-table-column prop="tname"
                         label="任课老师"></el-table-column>
        <el-table-column prop="score"
                         label="成绩"></el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24"
                class="btn-container">
          <el-button type="primary"
                     round
                     class="Btn"
                     @click.native.prevent="showFilter = false">查看全部课程成绩</el-button>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
export default {
  name: 'findScoreS',
  data() {
    return {
      form: {
        name: ''
      },
      courseScore: [],
      filterScore: [],
      showFilter: false
    }
  },
  methods: {
    find() {
      let isError = true
      this.courseScore.forEach(el => {
        if (el.name === this.form.name) {
          this.filterScore.push(el)
          isError = false
        }
      })
      if (!isError) {
        this.$notify({
          title: '提示',
          type: 'success',
          message: '恭喜，查询成功！！！'
        })
        this.showFilter = true
      } else {
        this.$notify({
          title: '注意',
          type: 'error',
          message:
            '查询失败，无该课程，因此也没有该课程成绩，请核对后，重新输入'
        })
      }
    }
  },
  beforeMount() {
    this.DB.getByIndex('user', this.$store.getters.username, 'account').then(
      res1 => {
        res1.course.forEach(cou => {
          this.DB.get('course', cou).then(res2 => {
            res2.student.forEach(stu => {
              if (stu.id === res1.id) {
                let data = {
                  name: res2.name,
                  tname: res2.teacher.name,
                  score: stu.score
                }
                this.courseScore.push(data)
              }
            })
          })
        })
      }
    )
  }
}
</script>

<style>
.findScoreS {
  width: 600px;
}
</style>

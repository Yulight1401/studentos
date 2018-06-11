<template>
  <div class="unselectCourse">
    <el-alert title="注意事项！"
              description="只提供可以退选的课程"
              show-icon
              type="warning"
              close-text="知道了"></el-alert>
    <el-table :data="course">
      <el-table-column prop="id"
                       label="课程号"></el-table-column>
      <el-table-column prop="name"
                       label="课程名"></el-table-column>
      <el-table-column prop="tname"
                       label="任课老师"></el-table-column>
      <el-table-column prop="tsex"
                       label="性别"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="unselectCourse(scope.row, scope.rowIndex)"
                     size="small"
                     type="success">退选</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'unselectCourse',
  data() {
    return {
      course: []
    }
  },
  methods: {
    unselectCourse(row, rowIndex) {
      this.course = this.course.filter(el => {
        if (el.id === row.id) {
          return false
        }
        return true
      })
      this.DB.getByIndex('user', this.$store.getters.username, 'account').then(
        res => {
          let Ncourse = this._.cloneDeep(res.course)
          Ncourse = Ncourse.filter(el => {
            if (el === row.id) {
              return false
            }
            return true
          })
          let newValue = {
            course: Ncourse
          }
          this.DB.updata('user', res.id, newValue).then(res2 => {
            this.$notify({
              type: 'success',
              message: '退选成功啦！！！'
            })
          })
        }
      )
    }
  },
  beforeMount() {
    this.DB.getByIndex('user', this.$store.getters.username, 'account').then(
      res => {
        res.course.forEach(el => {
          this.DB.get('course', el).then(res2 => {
            let data = {
              id: res2.id,
              name: res2.name,
              tname: res2.teacher.name,
              tsex: res2.teacher.sex
            }
            this.course.push(data)
          })
        })
      }
    )
  }
}
</script>

<style>
.unselectCourse {
  width: 600px;
}
</style>

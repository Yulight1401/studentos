<template>
  <div class="selectCourse">
    <el-alert title="注意事项！"
              description="只提供可以选择的，以及没有选择的课程"
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
          <el-button @click="selectCourse(scope.row, scope.rowIndex)"
                     size="small"
                     type="success">选课</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
  name: 'selectCourse',
  data() {
    return {
      course: [],
      selectedRow: []
    }
  },
  methods: {
    selectCourse(row, rowIndex) {
      this.selectedRow.push(row.id)
      this.showSelect = false
      this.course = this.course.filter(el => {
        if (this.selectedRow.includes(el.id)) {
          return false
        }
        return true
      })
      this.DB.getByIndex('user', this.$store.getters.username, 'account').then(
        res => {
          let newValue = {
            course: this._.cloneDeep(this.selectedRow)
          }
          this.DB.updata('user', res.id, newValue).then(res2 => {
            this.DB.get('course', row.id).then(res3 => {
              let oldStu = this._.cloneDeep(res3.student)
              oldStu.push({
                id: res.id,
                score: '暂无成绩'
              })
              let newValueStu = {
                student: oldStu
              }
              this.DB.updata('course', row.id, newValueStu).then(res4 => {
                this.$notify({
                  title: '提示',
                  type: 'success',
                  message: '选课成功！！！'
                })
              })
            })
          })
        }
      )
    }
  },
  beforeMount() {
    this.DB.getByIndex('user', this.$store.getters.username, 'account').then(
      res => {
        // TODO: 如何去显示没有选的课？
        this.selectedRow = this._.cloneDeep(res.course)
        let value = Number.parseInt(cookie.get('baseCID')) || 2
        for (let i = 1; i < value; i++) {
          this.DB.get('course', i).then(res => {
            let data = {
              id: res.id,
              name: res.name,
              tname: res.teacher.name,
              tsex: res.teacher.sex
            }
            if (!this.selectedRow.includes(res.id)) {
              this.course.push(data)
            }
          })
        }
      }
    )
  }
}
</script>

<style>
</style>

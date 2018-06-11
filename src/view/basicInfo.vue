<template>
  <div class="basicInfo">
    <el-table :data="info">
      <el-table-column prop="id"
                       label="学号"></el-table-column>
      <el-table-column prop="name"
                       label="姓名"></el-table-column>
      <el-table-column label="账户">
        <el-table-column prop="username"
                         label="用户名"></el-table-column>
        <el-table-column prop="password"
                         label="密码"></el-table-column>
      </el-table-column>
    </el-table>
    <el-alert type="success"
              title="注意"
              description="如下是选修的课程的基本信息，但是不包括成绩信息，要查询成绩信息，请使用成绩查询功能"
              close-text="知道了"
              show-icon></el-alert>
    <el-table :data="courseInfo">
      <el-table-column prop="id"
                       label="课程号"></el-table-column>
      <el-table-column prop="name"
                       label="课程名"></el-table-column>
      <el-table-column prop="tname"
                       label="任课老师"></el-table-column>
      <el-table-column prop="tsex"
                       label="性别"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'basicInfo',
  data() {
    return {
      info: [],
      courseInfo: []
    }
  },
  beforeMount() {
    this.DB.getByIndex('user', this.$store.getters.username, 'account').then(
      res => {
        let data = {
          id: res.id,
          name: res.name,
          username: res.account.username,
          password: res.account.password
        }
        this.info.push(data)
        res.course.forEach(cou => {
          this.DB.get('course', cou).then(res2 => {
            let data = {
              id: res2.id,
              name: res2.name,
              tname: res2.teacher.name,
              tsex: res2.teacher.sex
            }
            this.courseInfo.push(data)
          })
        })
      }
    )
  }
}
</script>

<style>
.basicInfo {
  width: 600px;
}
</style>

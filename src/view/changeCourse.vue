<template>
  <div class="changeCourse">
    <el-steps :active="activeStep"
              align-center>
      <el-step title="FIND"
               description="我们一起找到想要修改信息的课程吧！"></el-step>
      <el-step title="CHANGE"
               description="现在，开始修改该课程信息吧！！！"></el-step>
    </el-steps>
    <template v-if="activeStep === 1">
      <div class="findCourse-content">
        <template>
          <div class="findCourse">
            <el-alert title="查找须知！！！"
                      type="warning"
                      description="以下三个查找条件，只能够选择其中一个，如果多写，将以课程名，课程号，教师名的顺序，选择最靠前的信息，作为查询条件,信息输入完毕，回车即可开始查找！"
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
                          placeholder="请输入想要查找信息的课程号"
                          @keyup.enter.native="find"></el-input>
              </el-form-item>
              <el-form-item prop="username"
                            label="教师名">
                <el-input v-model="form.tname"
                          placeholder="请输入想要查找的课程的教师名"
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
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <el-alert title="修改须知"
                show-icon
                close-text="知道了"
                type="warning"
                description="修改需要修改的内容即可，但是需要注意的是，课程号无法修改，这是唯一确定课程的数据，所以理解万岁！！！">

      </el-alert>
      <div class="changeUser-content">
        <el-form ref="form"
                 :model="form"
                 label-position="top">
          <el-form-item label="课程名"
                        prop="name">
            <el-input v-model="result.name"
                      placeholder="请输入修改过后的课程名"></el-input>
          </el-form-item>
          <el-form-item label="课程号"
                        prop="id">
            <el-input v-model="result.id"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="教师名"
                        prop="tname">
            <el-input v-model="result.tname"
                      placeholder="请输入修改过后的教师名"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        prop="sex">
            <el-select v-model="result.tsex">
              <el-option label="女"
                         value="女"></el-option>
              <el-option label="男"
                         value="男"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="24"
                  class="btn-container">
            <el-button round
                       type="primary"
                       class="Btn"
                       @click.native.prevent="changeUser">立即修改</el-button>
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'changeUser',
  data() {
    return {
      activeStep: 1,
      form: {
        name: '',
        id: null,
        tname: ''
      },
      result: null
    }
  },
  methods: {
    find() {
      if (this.form.name) {
        this.DB.getByIndex('course', this.form.name, 'name')
          .then(result => {
            this.change(result)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查找失败'
            })
          })
      } else if (this.form.id) {
        this.DB.get('course', this.form.id)
          .then(result => {
            this.change(result)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查找失败'
            })
          })
      } else if (this.form.tname) {
        this.DB.getByIndex('course', this.form.tname, 'teacher')
          .then(result => {
            this.change(result)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查找失败'
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '大哥！算我求你了，好好输入相应的信息，谢谢！！！'
        })
      }
    },
    change(res) {
      this.result = {
        name: res.name,
        id: res.id,
        tname: res.teacher.name,
        tsex: res.teacher.sex
      }
      this.activeStep = 2
    },
    changeUser() {
      let value = Number.parseInt(this.form.id)
      let data = {
        name: this.result.name,
        id: this.result.id,
        teacher: {
          name: this.result.tname,
          sex: this.result.tsex
        }
      }
      this.DB.updata('course', value, data)
        .then(res => {
          this.$notify({
            title: '注意',
            message: '用户修改成功啦！！！',
            type: 'success'
          })
          this.activeStep = 1
          this.result = null
          this.form = {
            name: '',
            id: null,
            tname: ''
          }
        })
        .catch(err => {
          this.$notify({
            title: '提示',
            type: 'error',
            message: '非常抱歉。。。修改失败'
          })
        })
    }
  }
}
</script>

<style>
.changeCourse {
  width: 600px;
}
.findCourse {
  width: 600px;
}
</style>

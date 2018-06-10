<template>
  <div class="addCourse">
    <el-alert title="注意要点"
              type="info"
              description="按照要求填写相应的内容，否则操作将会失败"
              close-text="知道了"
              show-icon></el-alert>
    <el-form ref="formC"
             :model="formC"
             :rules="rules"
             label-position="top"
             status-icon>
      <el-form-item label="课程名"
                    prop="name">
        <el-input v-model="formC.name"
                  placeholder="请输入课程名"></el-input>
      </el-form-item>
      <el-form-item label="课程号"
                    prop="id">
        <el-input readonly
                  v-model="formC.id"></el-input>
      </el-form-item>
      <el-form-item label="教师"
                    prop="tname">
        <el-input v-model="formC.tname"
                  placeholder="请输入该课程任课老师的姓名!"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    prop="tsex">
        <el-select v-model="formC.tsex"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24"
              class="btn-container">
        <el-button type="primary"
                   class="Btn"
                   round
                   @click.native.prevent="addCourse">
          立即增加</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCID } from '../utils/id'
import cookie from 'js-cookie'
export default {
  name: 'addCourse',
  data() {
    const validate = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback('兄弟，不能为空啊！！！')
      }
    }
    return {
      formC: {
        name: '',
        id: getCID(),
        tname: '',
        tsex: '男'
      },
      options: [
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        }
      ],
      rules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validate
          }
        ],
        tname: [
          {
            required: true,
            trigger: 'blur',
            validator: validate
          }
        ]
      }
    }
  },
  methods: {
    addCourse() {
      this.$refs.formC.validate(valid => {
        if (valid) {
          try {
            let data = {
              name: this.formC.name,
              id: this.formC.id,
              student: [],
              teacher: {
                name: this.formC.tname,
                sex: this.formC.tsex
              }
            }
            this.DB.add('course', data)
            this.$notify({
              title: '提示',
              type: 'success',
              message: 'YES！课程增加成功'
            })
            cookie.set('baseCID', this.formC.id + 1, {
              expires: 360
            })
          } catch (error) {
            console.log(error)
            this.$notify({
              title: '注意',
              type: 'error',
              message: 'NO！！！增加失败了。。。。'
            })
          }
          this.formC = {
            name: '',
            id: getCID(),
            tname: '',
            tsex: '男'
          }
        }
      })
    }
  }
}
</script>

<style>
.addCourse {
  width: 600px;
}
</style>

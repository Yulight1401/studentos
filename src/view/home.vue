<template>
  <el-container id="home">
    <el-header>
      软件过程课设----学生信息管理系统
    </el-header>
    <el-container>
      <el-aside width="200px">
        <sidebar :routes="routes"></sidebar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sidebar from '@/components/sidebar'
export default {
  components: {
    sidebar
  },
  computed: {
    routes() {
      return this.$store.getters.routers[1].children
    }
  }
}
</script>

<style>
#home {
  height: 100%;
}
.el-header {
  background: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
}
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


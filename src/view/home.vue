<template>
  <el-container id="home">
    <el-aside width="200px">
      <sidebar :routes="routes"></sidebar>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
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
      return this.$store.getters.routers
    }
  }
}
</script>

<style>
#home {
  height: 100%;
}
</style>


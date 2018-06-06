<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes"
             close="el-menu-vertical-demo"
             unique-opened
             router>
      <template v-for="item in routes"
                v-if="!item.hidden">
        <template v-if="!item.children">
          <el-menu-item :index="item.path"
                        :key="item.path">
            {{item.meta.title}}
          </el-menu-item>
        </template>
        <template v-else>
          <el-submenu :index="item.path"
                      :key="item.path">
            <template slot="title">
              {{item.meta.title}}
            </template>
            <el-menu-item :index="subitem.path"
                          v-for="subitem in item.children"
                          :key="subitem.path">
              {{subitem.meta.title}}
            </el-menu-item>
          </el-submenu>
        </template>
      </template>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    routes: {
      type: Array,
      required: true
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path
    }
  }
}
</script>

<style>
</style>

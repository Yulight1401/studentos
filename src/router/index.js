import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Register from '@/view/register'
import Home from '@/view/home'
import About from '@/view/about'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    hidden: true,
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    hidden: true,
    component: Register
  },
  {
    path: '/about',
    name: 'aboutUs',
    component: About,
    meta: {
      title: '关于我们'
    }
  }
]

export default new Router({
  routes: constantRouterMap
})
//TODO: 设计需要异步加载的路由表
// 需要异步处理的路由
// 根据用户role的权限，处理显示该权限下的路由

export const asyncRouterMap = [
  {
    path: '/manageUser', // 用户管理
    name: 'manageUser',
    meta: {
      title: '用户管理',
      roles: ['admin']
    },
    component: resolve => require(['../view/manageUser.vue'], resolve), // 懒加载组件的一种实现方式
    children: [
      {
        path: '/addUser',
        name: 'addUser',
        meta: {
          title: '增加用户',
          roles: ['admin']
        },
        component: resolve => require(['../view/addUser.vue'], resolve)
      },
      {
        path: '/deleteUser',
        name: 'deleteUser',
        meta: {
          title: '删除用户',
          roles: ['admin']
        },
        component: resolve => require(['../view/deleteUser.vue'], resolve)
      },
      {
        path: '/findUser',
        name: 'findUser',
        meta: {
          title: '查找用户',
          roles: ['admin']
        },
        component: resolve => require(['../view/findUser.vue'], resolve)
      },
      {
        path: '/changeUser',
        name: 'changeUser',
        meta: {
          titile: '更改用户',
          roles: ['admin']
        },
        component: resolve => require(['../view/changeUser.vue'], resolve)
      }
    ]
  }
]

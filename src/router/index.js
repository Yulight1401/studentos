import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Home from '@/view/home'
import About from '@/view/about'
import addUser from '@/view/addUser'
import deleteUser from '@/view/deleteUser'
import changeUser from '@/view/changeUser'
import findUser from '@/view/findUser'
import addCourse from '@/view/addCourse'
import deleteCourse from '@/view/deleteCourse'
import changeCourse from '@/view/changeCourse'
import findCourse from '@/view/findCourse'
import findScore from '@/view/findScore'
import findScoreS from '@/view/findScoreS'
import basicInfo from '@/view/basicInfo';

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
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
    name: 'home',
    path: '/',
    hidden: true,
    component: Home,
    children: [
      {
        path: '/addUser',
        name: 'addUser',
        meta: {
          title: '增加用户',
          roles: ['admin']
        },
        component: addUser
      },
      {
        path: '/deleteUser',
        name: 'deleteUser',
        meta: {
          title: '删除用户',
          roles: ['admin']
        },
        component: deleteUser
      },
      {
        path: '/findUser',
        name: 'findUser',
        meta: {
          title: '查找用户',
          roles: ['admin']
        },
        component: findUser
      },
      {
        path: '/changeUser',
        name: 'changeUser',
        meta: {
          title: '更改用户',
          roles: ['admin']
        },
        component: changeUser
      },
      {
        path: '/addCourse',
        name: 'addCourse',
        meta: {
          title: '增加课程',
          roles: ['admin']
        },
        component: addCourse
      },
      {
        path: '/deleteCourse',
        name: 'deleteCourse',
        meta: {
          title: '删除课程',
          roles: ['admin']
        },
        component: deleteCourse
      },
      {
        path: '/findCourse',
        name: 'findCourse',
        meta: {
          title: '查找课程',
          roles: ['admin']
        },
        component: findCourse
      },
      {
        path: '/changeCourse',
        name: 'changeCourse',
        meta: {
          title: '更改课程',
          roles: ['admin']
        },
        component: changeCourse
      },
      // 用户路由
      {
        path: '/basicInfo',
        name: 'basicInfo',
        meta: {
          title: '基本信息',
          roles: ['user']
        },
        component: basicInfo
      },
      {
        path: '/findScore',
        name: 'findScore',
        meta: {
          title: '成绩查询',
          roles: ['admin']
        },
        component: findScore
      },
      {
        path: '/findScoreS',
        name: 'findScoreS',
        meta: {
          title: '成绩查询',
          roles: ['user']
        },
        component: findScoreS
      },
      {
        path: '/about',
        name: 'aboutUs',
        component: About,
        meta: {
          title: '关于我们',
          roles: ['admin', 'user']
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/',
    hidden: true
  }
]

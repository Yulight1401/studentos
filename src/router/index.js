import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Register from '@/view/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

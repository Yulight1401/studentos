import router from './router'
import store from './store'
import Vue from 'vue'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']
// FIXME: 权限认证模块实在是差，记得优化此模块
router.beforeEach((to, form, next) => {
  if (getToken()) {
    if (whiteList.includes(to.path)) {
      next()
    } else if (!store.getters.isinfo) {
      // if (!store.getters.role) {
      //   console.log(Vue.prototype.DB)
      //   let role = cookie.get('role')
      //   let username = cookie.get('username')
      //   console.log(role, username)
      //   store.dispatch('setRole', role)
      //   Vue.prototype.DB.getByIndex(role, username, 'account')
      //     .then(result => {
      //       console.log('result')
      //       store.dispatch('setAccount', result)
      //     })
      //     .catch(error => {
      //       callback(error)
      //     })
      // }
      store.dispatch('getInfo').then(res => {
        let role = store.getters.role
        Message({
          message: '欢迎使用本系统！',
          type: 'success'
        })
        store.dispatch('setIsInfo', true)
        store.dispatch('generateRouters', { role }).then(() => {
          router.addRoutes(store.getters.addRouters)
          next({ ...to, replace: true })
        })
      })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import getters from './store/getters'

const whiteList = ['/login', '/register']

router.beforeEach((to, form, next) => {
  if (getToken()) {
    if (whiteList.includes(to.path)) {
      next()
    } else if (!store.getters.isinfo) {
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

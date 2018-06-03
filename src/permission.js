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
    } else {
      store.dispatch('getInfo').then(res => {
        let role = store.getters.role
        Message({
          message: '信息获取成功',
          type: 'success'
        })
        store.dispatch('generateRouters', { role }).then(() => {
          console.log(`addRouters ${store.getters.addRouters}`)
          router.addRoutes(store.getters.addRouters)
          next({ ...to, replace: true })
        })
      })
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

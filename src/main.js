// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DB from './DB/index'
import cookie from 'js-cookie'
import loadsh from 'loadsh'

if (!cookie.get('isInit')) {
  cookie.set('isInit', '0', {
    expires: 360
  })
}

Vue.prototype.DB = DB
Vue.prototype._ = loadsh
Vue.use(ElementUI)
Vue.config.productionTip = false

import '@/permission'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

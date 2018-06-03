import Vue from 'vue'
import Vuex from 'vuex'
import DB from './modules/DB'
import Role from './modules/role'
import Permission from './modules/permission'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    DB,
    Role,
    Permission
  },
  getters
})

export default store

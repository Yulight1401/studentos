import Vue from 'vue'
import Vuex from 'vuex'
import DB from './modules/DB'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    DB
  },
  getters
})

export default store

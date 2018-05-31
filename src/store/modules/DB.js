import cookie from 'js-cookie'
const DB = {
  state: {
    isInit: cookie.get('isInit') || '0'
  },
  mutations: {
    INIT: state => {
      if (state.isInit === '0') {
        state.isInit = '1'
        cookie.set('isInit', '1', {
          expires: 360
        })
      } else {
        console.log('数据库已经初始化，无需再初始化')
      }
    }
  },
  actions: {
    Init({ commit }) {
      commit('INIT')
    }
  }
}

export default DB

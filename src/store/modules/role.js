const role = {
  state: {
    role: '',
    account: {
      username: '',
      password: ''
    },
    name: ''
  },
  mutations: {
    SET_ROLE: (state, role) => {
      state.role = role
      // console.log(`当前操作者身份为 ${role}`)
    },
    SET_ACCOUNT: (state, result) => {
      // console.log(result)
      state.account.username = result.account.username
      state.account.password = result.account.password
      state.name = result.name
    }
  },
  actions: {
    setRole({ commit }, role) {
      commit('SET_ROLE', role)
    },
    setAccount({ commit }, result = {}) {
      commit('SET_ACCOUNT', result)
    }
  }
}

export default role

import { getToken, setToken, removeToken } from '@/utils/auth'
import Vue from 'vue'
const role = {
  state: {
    role: '',
    account: {
      username: '',
      password: ''
    },
    name: '',
    avatar: '',
    token: getToken()
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
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    setRole({ commit }, role) {
      commit('SET_ROLE', role)
    },
    setAccount({ commit }, result = {}) {
      commit('SET_ACCOUNT', result)
    },
    login({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          setToken('yes')
          commit('SET_TOKEN', 'yes')
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        try {
          // TODO: 处理信息获取成功，却出现错误的结果
          let data = Vue.prototype.DB.getByIndex(
            state.role,
            state.account.username,
            'account'
          )
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

export default role

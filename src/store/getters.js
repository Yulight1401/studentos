const getters = {
  isInit: state => state.DB.isInit,
  role: state => state.Role.role,
  username: state => state.Role.account.username,
  password: state => state.Role.account.password
}

export default getters

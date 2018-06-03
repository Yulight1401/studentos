const getters = {
  isInit: state => state.DB.isInit,
  role: state => state.Role.role,
  name: state => state.Role.name,
  username: state => state.Role.account.username,
  password: state => state.Role.account.password,
  routers: state => state.Permission.routers,
  addRouters: state => state.Permission.addRouters
}

export default getters

import cookie from 'js-cookie'
const TokenKey = 'token'

export const getToken = () => {
  return cookie.get(TokenKey) || ''
}

export const setToken = token => {
  return cookie.set(TokenKey, token)
}

export const removeToken = () => {
  return cookie.remove(TokenKey)
}

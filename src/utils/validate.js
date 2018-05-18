import Cookie from 'js-cookie'

export function isValidUsername(value) {
  const valid_map = Cookie.getJSON('user')
  return valid_map.includes(value)
}

import cookie from 'js-cookie'
export function getID() {
  let baseID = cookie.get('baseID') || 201621092027
  let newID = Number.parseInt(baseID)
  return newID
}

export function getCID(params) {
  let baseCID = cookie.get('baseCID') || 2
  let newCID = Number.parseInt(baseCID)
  return newCID
}

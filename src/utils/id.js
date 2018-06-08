import cookie from 'js-cookie'
export default function getID() {
  let baseID = cookie.get('baseID') || 201621092026
  let newID = Number.parseInt(baseID) + 1
  cookie.set('baseID', newID, {
    expires: 360
  })
  return newID
}

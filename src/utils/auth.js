export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("auth")
  sessionStorage.clear()
}

export const getAuthUser = () =>
JSON.parse(localStorage.getItem("auth"))


export const getBasicAuthHeader = () => {
const user = getAuthUser()
return {
Authorization: "Basic " + btoa(`${user.email}:${user.password}`)
}
}
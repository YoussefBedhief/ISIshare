export const fetchUser = () => {
  const storage = localStorage.getItem("user")
  const userInfo =
    storage !== undefined ? JSON.parse(storage) : localStorage.clear()
  return userInfo
}

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://thakurcapital.com/edu/api',
})

// Attach Basic Auth automatically
api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem('auth'))

  if (auth?.email && auth?.password) {
    config.auth = {
      username: auth.email,
      password: auth.password,
    }
  }

  return config
})

export default api
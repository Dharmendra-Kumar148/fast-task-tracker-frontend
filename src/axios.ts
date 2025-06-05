import axios from 'axios'
import store from './store/index.ts'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Change to your backend URL on deployment!
})

instance.interceptors.request.use(config => {
  // @ts-ignore
  const token = store.getters.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default instance
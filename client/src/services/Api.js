import axios from 'axios'
import store from '@/store/store'

export default () => {
  let instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
  instance.interceptors.request.use(config => {
    NProgress.start()
    return config
  })

  instance.interceptors.response.use(response => {
    NProgress.done()
    return response
  })
  return instance
}

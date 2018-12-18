import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('user/register', credentials)
  },
  login (credentials) {
    return Api().post('user/login', credentials)
  },
  update (credentials) {
    return Api().put('user/update', credentials)
  },
  delete () {
    return Api().put('user/delete')
  }
}

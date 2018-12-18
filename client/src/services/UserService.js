import Api from '@/services/Api'

export default {
  getAll() {
    return Api().get('user/')
  },
  get(id) {
    return Api().get('user/' + id)
  },
  update(id) {
    return Api().put('user/' + id)
  },
  delete(id) {
    return Api().delete('user/' + id)
  }
}

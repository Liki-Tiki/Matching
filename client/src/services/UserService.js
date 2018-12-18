import Api from '@/services/Api'

export default {
  getAll() {
    return Api().get('user/')
  },
  get() {
    return Api().get('user/:id')
  },
  update() {
    return Api().put('user/:id')
  },
  delete() {
    return Api().delete('user/:id')
  }
}

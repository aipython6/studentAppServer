const bookTypeImpl = require('../impl/bookTypeImpl')

class bookTypeService {
  constructor() {
    this.bookTypeImpl = new bookTypeImpl()
  }
  all(params) {
    return this.bookTypeImpl.all(params)
  }
  add(data) {
    return this.bookTypeImpl.add(data)
  }
  edit(data) {
    return this.bookTypeImpl.edit(data)
  }
  del(id) {
    return this.bookTypeImpl.del(id)
  }
  queryByBlur(data) {
    return this.bookTypeImpl.queryByBlur(data)
  }
}
module.exports = bookTypeService
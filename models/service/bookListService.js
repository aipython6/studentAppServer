const bookListImpl = require('../impl/bookListImpl')

class bookListService {
  constructor() {
    this.bookListImpl = new bookListImpl()
  }
  all(params) {
    return this.bookListImpl.all(params)
  }
  add(data) {
    return this.bookListImpl.add(data)
  }
  edit(data) {
    return this.bookListImpl.edit(data)
  }
  del(id) {
    return this.bookListImpl.del(id)
  }
  queryByBlur(data) {
    return this.bookListImpl.queryByBlur(data)
  }
}
module.exports = bookListService
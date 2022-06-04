const bookImpl = require('../../impl/bookDetail/bookImpl')

class bookService {
  constructor() {
    this.bookImpl = new bookImpl()
  }
  all(params) {
    return this.bookImpl.all(params)
  }
  getPnameBypid(pid) {
    return this.bookImpl.getPnameBypid(pid)
  }
  add(data) {
    return this.bookImpl.add(data)
  }
  edit(data) {
    return this.bookImpl.edit(data)
  }
  del(id) {
    return this.bookImpl.del(id)
  }
  queryByBlur(data) {
    return this.bookImpl.queryByBlur(data)
  }
}
module.exports = bookService
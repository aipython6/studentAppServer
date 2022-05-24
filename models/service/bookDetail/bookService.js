const bookImpl = require('../../impl/bookDetail/bookImpl')

class bookService {
  constructor() {
    this.bookImpl = new bookImpl()
  }
  all(params) {
    return this.bookImpl.all(params)
  }
  add(data) {
    return this.book.add(data)
  }
  edit(data) {
    return this.book.edit(data)
  }
  del(id) {
    return this.book.del(id)
  }
}
module.exports = bookService
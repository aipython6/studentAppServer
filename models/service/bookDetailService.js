const bookDetailImpl = require('../impl/bookDetailImpl')

class bookDetailService {
  constructor() {
    this.bookDetailImpl = new bookDetailImpl()
  }
  all(params) {
    return this.bookDetailImpl.all(params)
  }
  add(data) {
    return this.bookDetailImpl.add(data)
  }
  edit(data) {
    return this.bookDetailImpl.edit(data)
  }
  del(id) {
    return this.bookDetailImpl.del(id)
  }
  queryByBlur(data) {
    return this.bookDetailImpl.queryByBlur(data)
  }
}
module.exports = bookDetailService
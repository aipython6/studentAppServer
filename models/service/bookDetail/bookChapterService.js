const bookChapterImpl = require('../../impl/bookDetail/bookChapterImpl')

class bookChapterService {
  constructor() {
    this.bookChapterImpl = new bookChapterImpl()
  }
  all() {
    return this.bookChapterImpl.all()
  }
  getNameBybid(bid) {
    return this.bookChapterImpl.getNameBybid(bid)
  }
  add(data) {
    return this.bookChapterImpl.add(data)
  }
  edit(data) {
    return this.bookChapterImpl.edit(data)
  }
  del(id) {
    return this.bookChapterImpl.del(id)
  }
}

module.exports = bookChapterService
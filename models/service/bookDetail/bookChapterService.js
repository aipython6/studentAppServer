const bookChapterImpl = require('../../impl/bookDetail/bookChapterImpl')

class bookChapterService {
  constructor() {
    this.bookChapterImpl = new bookChapterImpl()
  }
  all() {
    return this.bookChapterImpl.all()
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
  blurry(data) {
    return this.bookChapterImpl.blurry(data)
  }
}

module.exports = bookChapterService
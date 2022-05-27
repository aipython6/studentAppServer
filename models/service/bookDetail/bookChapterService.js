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
  del(bid) {
    return this.bookChapterImpl.del(bid)
  }
  // 批量删除books中的记录
  delBybids(bids) {
    return this.bookChapterImpl.delBybids(bids)
  }
}

module.exports = bookChapterService
const chapterChildrenImpl = require('../../impl/bookDetail/chapterChildrenImpl')

class chapterChildrenService {
  constructor() {
    this.chapterChildrenImpl = new chapterChildrenImpl()
  }
  all(params) {
    return this.chapterChildrenImpl.all(params)
  }
  add(data) {
    return this.chapterChildrenImpl.add(data)
  }
  edit(data) {
    return this.chapterChildrenImpl.edit(data)
  }
  del(id) {
    return this.chapterChildrenImpl.del(id)
  }
  blurry(data) {
    return this.chapterChildrenImpl.blurry(data)
  }
}

module.exports = chapterChildrenService
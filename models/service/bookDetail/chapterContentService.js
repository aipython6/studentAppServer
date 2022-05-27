const chapterContentImpl = require('../../impl/bookDetail/chapterContentImpl')

class chapterContentService {
  constructor() {
    this.chapterContentImpl = new chapterContentImpl()
  }
  allBybid(bid) {
    return this.chapterContentImpl.allBybid(bid)
  }

  all(params) {
    return this.chapterContentImpl.all(params)
  }

  add(data) {
    return this.chapterContentImpl.add(data)
  }

  edit(data) {
    return this.chapterContentImpl.edit(data)
  }

  del(id) {
    return this.chapterContentImpl.del(id)
  }
  // 此操作是删除chapterContent表中的记录
  delBybid(bid) {
    return this.chapterContentImpl.delBybid(bid)
  }
}

module.exports = chapterContentService
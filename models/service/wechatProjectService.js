const wechatProjectImpl = require('../impl/wechatProjectImpl')

class wechatProjectService {
  constructor() {
    this.wechatProjectImpl = new wechatProjectImpl();
  }

  getTopAndSecondProject() {
    return this.wechatProjectImpl.getTopAndSecondProject()
  }

  getTop6Hot() {
    return this.wechatProjectImpl.getTop6Hot()
  }

  getSecondProjectByName(data) {
    return this.wechatProjectImpl.getSecondProjectByName(data)
  }

  getBookTypeList(bid) {
    return this.wechatProjectImpl.getBookTypeList(bid)
  }

  getBookList(btid) {
    return this.wechatProjectImpl.getBookList(btid)
  }

  updateClickNum(data) {
    return this.wechatProjectImpl.updateClickNum(data)
  }

  updateClickNumSproject(data) {
    return this.wechatProjectImpl.updateClickNumSproject(data)
  }

  getBookInfoBybid(bid) {
    return this.wechatProjectImpl.getBookInfoBybid(bid)
  }

  getChapterConentList(bid, type) {
    return this.wechatProjectImpl.getChapterConentList(bid, type)
  }
}

module.exports = wechatProjectService
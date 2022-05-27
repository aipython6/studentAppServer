const noticeImpl = require('../../../impl/settings/wechat/noticeImpl')

class noticeService {
  constructor() {
    this.noticeImpl = new noticeImpl()
  }

  all(params) {
    return this.noticeImpl.all(params)
  }

  add(data) {
    return this.noticeImpl.add(data)
  }

  edit(data) {
    return this.noticeImpl.edit(data)
  }

  del(id) {
    return this.noticeImpl.del(id)
  }
}
module.exports = noticeService
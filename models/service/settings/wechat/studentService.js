const studentImpl = require('../../../impl/settings/wechat/studentImpl')

class studentService {
  constructor() {
    this.studentImpl = new studentImpl()
  }
  all(params) {
    return this.noticeImpl.all(params)
  }
}
module.exports = studentService
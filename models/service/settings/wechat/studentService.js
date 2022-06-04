const studentImpl = require('../../../impl/settings/wechat/studentImpl')

class studentService {
  constructor() {
    this.studentImpl = new studentImpl()
  }
  all(params) {
    return this.studentImpl.all(params)
  }
  queryByBlur(data) {
    return this.studentImpl.queryByBlur(data)
  }
}
module.exports = studentService
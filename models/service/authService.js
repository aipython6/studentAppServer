const authImpl = require('../impl/authImpl')

class authService {
  constructor() {
    this.authImpl = new authImpl()
  }
  
  add(data) {
    return this.authImpl.add(data)
  }

  queryStudentByOpenid(data) {
    return this.authImpl.queryStudentByOpenid(data)
  }

  editUserinfo(data) {
    return this.authImpl.editUserinfo(data)
  }

  deleteUserinfoByopenid(data) {
    return this.authImpl.deleteUserinfoByopenid(data)
  }
}

module.exports = authService
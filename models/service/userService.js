const userImpl = require('../impl/userImpl')

class userService {
  constructor() {
    this.userImpl = new userImpl()
  }

  getRoles() {
    return this.userImpl.getRoles()
  }

  getRoleNameByid(id) {
    return this.userImpl.getRoleNameByid(id)
  }

  findUserByUsername(data) {
    return this.userImpl.findUserByUsername(data)
  }

  addToken(data) {
    return this.userImpl.addToken(data)
  }
  
  add(data) {
    return this.userImpl.add(data)
  }

  edit(data) {
    return this.userImpl.edit(data)
  }

  all(data) {
    return this.userImpl.all(data)
  }

  del(id) {
    return this.userImpl.del(id)
  }

  updateAvatar(data) {
    return this.userImpl.updateAvatar(data)
  }

  updatePass(data) {
    return this.userImpl.updatePass(data)
  }

}

module.exports = userService
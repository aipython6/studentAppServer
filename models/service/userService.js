const userImpl = require('../impl/userImpl')

class userService {
  constructor() {
    this.userImpl = new userImpl()
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
}

module.exports = userService
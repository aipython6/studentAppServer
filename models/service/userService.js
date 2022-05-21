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
}

module.exports = userService
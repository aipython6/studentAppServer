const authImpl = require('../impl/authImpl/authImpl')

class authService {
  constructor() {
    this.authImpl = new authImpl()
  }
  add(data) {
    return this.authImpl.add(data)
  }
}

module.exports = authService
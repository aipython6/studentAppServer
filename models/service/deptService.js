const deptImpl = require('../impl/deptImpl')

class deptService {
  constructor() {
    this.deptImpl = new deptImpl()
  }
  all() {
    return this.deptImpl.all()
  }
  get(id) {
    return this.deptImpl.get(id)
  }

  add(data) {
    return this.deptImpl.add(data)
  }

  edit(data) {
    return this.deptImpl.edit(data)
  }

  del(id) {
    return this.deptImpl.del(id)
  }
}

module.exports = deptService
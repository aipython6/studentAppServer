const mysqlConnect = require('../../database/mysql_config')

class deptImpl {
  all() {
    const sql = `SELECT * FROM depts`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  get(id) {
    const sql = `SELECT * FROM depts FROM id = ${id}`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }


  add(data) {
    const sql = `INSERT INTO depts SET ?`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
  edit(data) {
    const { id, deptname, enabled, update_time } = data    
    const sql = `UPDATE depts SET deptname = '${deptname}', enabled = ${enabled}, update_time = ${update_time} WHERE id = ${id}`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
  del(id) {
    const sql = `DELETE FROM depts WHERE id = ${id}`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = deptImpl
const mysqlConnect = require('../../database/mysql_config')

class deptImpl {
  all(data) {
    const { page, size } = data
    const sql = `SELECT * FROM depts`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          const total = result.length
          let dicts = result
          if (page && size) {
            const pageList = dicts.filter((item, index) => index < size * page && index >= size * (page - 1))
            dicts = pageList
          }
          resolve({ content: dicts, total: total })
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
    const { deptid, deptname, enabled, update_time } = data    
    const sql = `UPDATE depts SET deptname = '${deptname}', enabled = ${enabled}, update_time = ${update_time} WHERE id = ${deptid}`
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
  del(deptid) {
    const sql = `DELETE FROM depts WHERE id = ${deptid}`
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
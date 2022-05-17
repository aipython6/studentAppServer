const mysqlConnect = require('../../../database/mysql_config')

class authImpl {
  // 添加一个授权的用户
  add(data) {
    const sql = `INSERT INTO students SET ?`
    return new Promise((resolve, reject)  => {
      mysqlConnect.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })	
    })
  }
}
module.exports = authImpl
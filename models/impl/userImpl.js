const mysqlConnect = require('../../database/mysql_config')

class userImpl {
  // 根据username查询用户
  findUserByUsername({ username }) {
    const sql = `SELECT a.*,b.deptname FROM users a LEFT JOIN depts b ON a.deptid = b.id WHERE a.username = '${username}'`
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

  // 用户登录时,将token保存到tokens表中
  addToken(data) {
    const sql = `INSERT INTO tokens SET ?`
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

  // 添加用户
  add(data) {
    // const { username, password, email, create_time, deptid, gender, enabled } = data
    const sql = `INSERT INTO users SET ?`
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
}
module.exports = userImpl
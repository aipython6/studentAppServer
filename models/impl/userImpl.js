const mysqlConnect = require('../../database/mysql_config')

class userImpl {

  getRoles() {
    const sql = `select rid, name from roles`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve({ content: result })
        } else {
          reject(err)
        }
      })
    })
  }

  getRoleNameByid(id) {
    const sql = `select name from roles where rid = ${id}`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          const name = result[0].name
          resolve({ roleName: name })
        } else {
          reject(err)
        }
      })
    })
  }

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
  all(data) {
    const { page, size, name } = data
    let sql = `select a.*, b.deptname from users a left join depts b on a.deptid=b.id `
    if (name) {
      sql += ` WHERE a.username = '${name}'`
    }
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

  edit(data) {
    const { uid, username, gender, role, update_time, deptid, enabled } = data
    const sql = `update users set username='${username}', gender = '${gender}',
    role='${role}', update_time = ${update_time}, deptid = ${deptid},enabled=${enabled} where uid = ${uid}`
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
    const sql = `delete from users where uid = ${id}`
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

  // 更新头像
  updateAvatar(data) {
    const { url, username } = data
    const sql = `update users set avatar = '${url}' where username = '${username}'`
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

  // 更新密码
  updatePass(data) {
    const { password, username } = data
    const sql = `update users set password = '${password}' where username = '${username}'`
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
module.exports = userImpl
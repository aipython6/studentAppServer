const mysqlConnect = require('../../database/mysql_config')

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
  // 根据openid查询该用户是否为第一次授权
  queryStudentByOpenid({ openid }) {
    const sql = `SELECT * FROM students WHERE openid = '${openid}'`
    return new Promise((resolve, reject)  => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          let t = { isAuth: false, student: '' }
          if (result.length > 0) {
            t.isAuth = true
            t.student = result.map(e => {
              return {
                sid: e.sid, username: e.username, age: e.age, nickName: e.nickName, gender: e.gender,
                email: e.email, professional: e.professional, school: e.school,
                avatarUrl: e.avatarUrl, birthday: e.birthday, isFull: e.isFull === 0 ? false : true
              }
            })
          }
          resolve(t)
        } else {
          reject(err)
        }
      })	
    })
  }

  // 根据openid学生更新个人基本信息
  editUserinfo(data) {
    const { openid, username, age, gender, school, professional, birthday, email, update_time } = data
    const sql = `update students set username = '${username}', age = ${age}, gender = '${gender}', school = '${school}', professional = '${professional}', birthday = '${birthday}', email = '${email}', update_time = '${update_time}', isFull = 1 where openid = '${openid}'`
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

  // 根据openid删除个人记录
  deleteUserinfoByopenid({ openid }) {
    const sql = `delete from students where openid = '${openid}'`
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
module.exports = authImpl
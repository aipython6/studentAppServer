const bcrypt = require('bcryptjs')
// 一些参数
const saltRounds = 10
const plaintextPass = 'studentApp'

class Password {
  // 密码加密
  passEncode(pass) {
    if (!pass) {
      return '请传入密码'
    } else {
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, plaintextPass, (err, salt) => {
          bcrypt.hash(pass, salt, (err, hash) => {
            if (!err) {
              return resolve(hash)
            } else {
              return reject(err)
            }
          })
        })
      })
    }
  }

  // 密码解密
  // @params hash:数据查询到的hash,pass用户传递过来的密码
  passDecode(hash, pass) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(pass, hash, (err, result) => {
        if (!err) {
          return resolve(result)
        } else {
          return reject(err)
        }
      })
    })
  }
}

const password = new Password()

module.exports = password
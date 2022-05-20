const bcrypt = require('bcryptjs')
const salt = 10
const text = 'studentApp'

class Password {
  passEncode(pass) {
    if (!pass) {
      return '请传入密码'
    } else {
      return new Promise((resolve, reject) => {
        bcrypt.getSalt(salt, text, (err, salt) => {
          bcrypt.hash(pass, salt, (err, hash) => {
            if (!err) {
              return resolve(hash)
            } else {
              reject(err)
            }
          })
        })
      })
    }
  }

  passDecode(hash, pass) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(pass, hash, (err, result) => {
        if (!err) {
					return resolve(result)
				} else {
					reject(err)
				}
      })
    })
  }
}

const password = new Password()
module.exports = password
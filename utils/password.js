const bcrypt = require('bcryptjs')
const saltRounds = 10
const plaintextPass = 'studentApp'
// 密码加密
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
							reject(err)
						}
					})
				})
			})
		}
	}
	// 密码解密
	// @param hash:数据库查询到的hash，pass:用户传递过来的pass
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
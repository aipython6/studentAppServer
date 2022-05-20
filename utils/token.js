const jwt = require('jsonwebtoken')
const my_token = 'studentApp'

class Token {
	// 设置token
  sign(username) {
    // 默认token保存为1天
    let expiresIn = { expiresIn: 60 * 60 * 24 }
		return jwt.sign({ username: username }, my_token, { expiresIn: expiresIn.expiresIn })
	}
	// 根据用户传入的username校验token
	verify(token, username) {
		if (!token) {
			return false
		} else {
			return new Promise((resolve, reject) => {
				jwt.verify(token, my_token, function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result.username.toString() === username.toString())
					}
				})
			})
		}
	}
}

const t = new Token()
module.exports = t
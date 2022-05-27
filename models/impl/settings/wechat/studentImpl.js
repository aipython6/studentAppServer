const mysqlConnect = require('../../../../database/mysql_config')

class studentImpl {

  all(data) {
    const { size, page } = data
    const sql = `select * from students`
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
}

module.exports = studentImpl
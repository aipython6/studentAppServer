const mysql = require('mysql');

const config = {
  host: 'www.and2ui.cn',
  user: 'root',
  password: '6118277ndaNDA',
  // database: 'studentApp',
  database: 'studentAppTest',
  useConnectionPool: true,
}

var conn = undefined
function handleError() {
  conn = mysql.createConnection(config)
  conn.connect(function (err) {
    if (err) {
      console.error(err)
      setTimeout(handleError, 2000)
    }
  })
  conn.on('error', function (err) {
    console.error(err)
    if (err.code === 'PROTOCAL_CONNECTION_LOST') {
      handleError()
    } else {
      throw err
    }
  })
}
handleError()

// connection.connect()
module.exports = conn
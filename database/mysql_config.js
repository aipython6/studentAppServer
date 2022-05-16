const mysql = require('mysql');

const connection = mysql.createConnection(
  {
    host: 'www.and2ui.cn',
    user: 'root',
    password: '6118277ndaNDA',
    database: 'studentApp'
  }
)
connection.connect()
module.exports = connection
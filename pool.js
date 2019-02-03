const mysql = require('mysql')
var pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'hlg',
  connectionLimit: 3,
  multipleStatements: true
})

module.exports = pool
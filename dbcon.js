var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_moorenat',
  password: '2650',
  database: 'cs340_moorenat'
});
module.exports.pool = pool;


// var mysql = require('mysql');
// var pool = mysql.createPool({
//   connectionLimit: 10,
//   host: '127.0.0.1',
//   user: 'newuser',
//   password: 'Autopilot89',
//   database: 'mallco'
// });
// module.exports.pool = pool;
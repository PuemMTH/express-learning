const mysql = require('mysql');

//mysql connecttion
const { MYSQL_HOSTNAME,MYSQL_USERNAME,MYSQL_POSSWORD,MYSQL_DATABASE } = process.env; 
var con = mysql.createConnection({
  host: MYSQL_HOSTNAME,
  user: MYSQL_USERNAME,
  password: MYSQL_POSSWORD,
  database: MYSQL_DATABASE
});
con.connect(function(err) {
  if (err) throw err;
});
module.exports = con;

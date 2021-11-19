const express = require('express');
const applog = express();
require('dotenv').config()
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
const logger = (req, res, next) => {
  const parseIp = (req) =>
    req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress
    || null;
  protocaol = req.protocol;
  host = parseIp(req);
  originalUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  con.query("INSERT INTO `logs` (`id`, `protocol`, `host`, `originalUrl`) VALUES (NULL, ?, ?, ?)",[protocaol,host,originalUrl], function (err, result) {
    if (err) throw err;
    console.log(`${parseIp(req)} || ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  });
  next();
}
applog.use(logger);

module.exports = applog;
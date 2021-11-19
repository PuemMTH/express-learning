const express = require('express');
const add = express.Router();
//mysql connecttion
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

// handler for the /user/:id path, which prints the user ID
add.get('/add/:id', function (req, res) {
    res.send(req.params.id)
})
  
add.get('/', (req, res) => {

    con.query("SELECT * FROM `logs` LIMIT 5", function (err, result) {
        if (err) throw err;
        const resultArray = Object.values(JSON.parse(JSON.stringify(result)))
        // res.send(resultArray)
        res.render('select', {
          title: 'API',
          data: resultArray
        });
    });
    
})

module.exports = add;
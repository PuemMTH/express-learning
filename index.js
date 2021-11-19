const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()
const { EDPORT } = process.env;
//mysql connecttion
// const con = require('./dbConnect');
// handersbars require
const { engine } = require('express-handlebars');
// logger
const nextlogs = require('./logger',);
app.use(nextlogs);


// handlebars 
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/api/data', require('./routes/database/data')); // users.js
// app.use('/api/users', require('./routes/api/users')); // users.js

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(EDPORT, () => {
  console.log(`Example app listening at http://localhost:${EDPORT}`)
})
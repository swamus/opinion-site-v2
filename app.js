var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport=require('passport');

// require('./models/Posts');
// require('./models/Comments');
require('./models/User');
require('./config/passport');

var routes =require('./routes/routes');

mongoose.connect('mongodb+srv://TestTestTest:TestTestTest@simple-crud-app-xnyg6.mongodb.net/test?retryWrites=true&w=majority', {useFindAndModify:false},()=> {
    console.log('Connected to MongoDB...');
});

//var users = require('./routes/users');

var app = express();

app.use(express.static(__dirname + '/public/server-test/dist/server-test')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(passport.initialize());


//app.use('/api/v1/users', users);
app.use('/api',routes);

//MAIN APPLICATION ROUTE
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/server-test/dist/server-test/index.html'));
  });

module.exports = app;

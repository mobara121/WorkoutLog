require('dotenv').config();

var express = require('express');
var app = express();
// var test = require('./controllers/testcontroller')
//var authTest = require('./controllers/authtestcontroller');
var user = require('./controllers/usercontroler')
var log = require('./controllers/auth-logcontroller')


var sequelize = require('./db');
sequelize.sync();
app.use(express.json())
app.use(require('./middleware/headers'));

// app.use('/test', test)

app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/log', log);


// app.use('/authtest', authTest);

app.listen(7000, function(){
    console.log("Hi Romeo.")
});

// app.use('/api/test', function(req, res){
//     res.send("Postman server test.");
//});
var express = require('express')
var mainController = require('./controllers/mainController')
var eventController = require('./controllers/eventController') // Get whatever is in the module.exports

var app = express()

// template engine
app.set('view engine', 'ejs')

// static files
app.use(express.static('./public')) // File path referenced inside of public: localhost:8080/assets/style.css

// fire controllers
eventController(app);
mainController(app);

// listen to port
app.listen(8080)
console.log('Listening on port 8080')

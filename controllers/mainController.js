var bodyParser = require('body-parser')
var authorize = require("./authorize.js");

var urlencodedParser = bodyParser.urlencoded({extended: false})

// Export javascript function for app
module.exports = function(app){

  app.get('/', function(req, res){
    res.render('home')
  })

  app.get('/dev', function(req, res){
    res.render('dev')
  })

  app.get('/dev/hash', function(req, res){
    res.render('hash')
  })

  app.post('/dev/hash', urlencodedParser, function(req, res) {
    let toHash = req.body
    res.status(200).send(authorize.hash(req.body.input))
  })
}

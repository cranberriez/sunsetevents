var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var authorize = require("./authorize.js")

// Connect To Database
mongoose.connect('mongodb://root:rootuser@ds257589.mlab.com:57589/shs-events')

// Create a schema - blueprint
var eventSchema = new mongoose.Schema({
  id: String,
  title: String,
  location: String,
  time: String,
  description: String,
  image: String
})

// Create Model
var Event = mongoose.model('Event', eventSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false})

// Export javascript function for app
module.exports = function(app) {

  app.get('/public', function(req, res){
    Event.find({}, function(err, data){
      if (err) throw err;
      res.render('public', {events: data})
    })
  })

  // Get data from mongodb and pass it to the view
  app.get('/events', function(req, res){
    Event.find({}, function(err, data){
      if (err) throw err;
      res.render('events', {events: data})
    })
  })

  // Get data from the view and add it to mongodb
  app.post('/events', urlencodedParser, function(req, res) {
    let events = JSON.parse(req.body.events)
    // let clientToken = authorize.generateToken(authorize.hash(events[0].password))
    // let serverToken = authorize.generateToken(authorize.getUserInfo(events[0].user))
    let client = authorize.hash(events[0].password)
    let server = authorize.getUserInfo(events[0].user)
    if (client === server) {
      console.log('success')
      let dataFinal = []
      for (var i = 1; i < events.length; i++) {
        var newTodo = Event(events[i]).save(function(err, data) {
          if (err) throw err
          dataFinal.push(data)
        })
      }
      res.status(200).send(dataFinal)
    } else {
      console.log('failed')
      res.status(401).send("failed")
    }
  })

  // Delete requested item from mongodb
  app.delete('/events/:id', urlencodedParser, function(req, res) {
    try {
      let login = JSON.parse(req.body.login)
      // let clientToken = authorize.generateToken(authorize.hash(login.password))
      // let serverToken = authorize.generateToken(authorize.getUserInfo(login.user))
      let client = authorize.hash(login.password)
      let server = authorize.getUserInfo(login.user)
      if (client === server) {
        Event.find({id: req.params.id.replace(/\-/g, ' ')}).remove(function(err, data){
          if (err) throw err;
          console.log('success')
          res.status(200).send(data)
        })
      } else {
        console.log('failed')
        res.status(401).send("failed")
      }
    } catch (err) {
      throw err
      res.status(401).send("failed")
    }
  })
}

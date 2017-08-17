const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const session = require('express-session')

const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}));

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(expressValidator());

app.use(function (req,res,next){
console.log("in interceptor");
  next();
})

app.get('/', function(req,res) {
  res.render('home')
})

app.use(session({
  secret: "whomp",
  resave: false,
  saveUninitialized: true
}))

app.post('/login', function (req, res) {
  console.log("username is" + req.body.undername);
  console.log("password is" + req.body.password);
  res.render('home')

})

//Listening on root
app.get('/', function(req, res) {
  res.render('home', {})
})
app.get('/', function(req, res){
  res.send('I am alive')
})

















app.listen(3000, function(){
  console.log("youre entering the first part friend");
})

const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const session = require('express-session')

const app = express();

const username_password = [{
    user: 'colot',
    pass: 'the'
  },
  {
    user: 'helmut',
    pass: 'aufs'
  },
  {
    user: 'den',
    pass: 'hause'
  }

]

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  if (req.url === '/login') {
    next();
  } else if (!req.session.login) {
    res.render('login');
  } else {
    next();
  }
});

app.get('/', function(req, res) {
  res.render('home')
})

app.post('/login', function(req, res) {
  console.log("start of homer");
  username_password.forEach(function(e) {
    console.log("req.session.login", req.session.login);
    console.log("e.user", e.user);
    console.log("req.body.username", req.body.username);
    console.log("e.pass", e.pass);
    console.log("req.body.password", req.body.password);
    if (e.user === req.body.username && e.pass === req.body.password) {
      req.session.login = req.body.username;
      console.log("home is close");
    }
    if (req.session.login === req.body.username) {
      console.log(req.session.login);
      res.render('home')
    } else {
      res.render('login', {
        oops: true
      })
    }
  })
})

app.post('/logOut', function(req, res) {
  res.render('login')
})

app.listen(3000, function() {
  console.log("youre entering the first part friend");
})

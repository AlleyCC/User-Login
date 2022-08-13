const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const Users = require('./models/users')
const session = require('express-session')

const app = express()
const port = 3000

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({
  secret: 'mySecret',
  name: 'user',
  resave: true,
  saveUninitialized: false,
}))

app.get('/', (req, res) => {
  console.log('req.session', req.session)
  console.log('req.session.user', req.session.user)
  console.log('req.sessionID', req.sessionID)
  res.render('index')
})

function auth(req, res, next){
  if(req.session.user){
    console.log('authenticated')
    next()
  } else {
    console.log('not authenticated!')
    return res.redirect('/')
  }
  
}

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const filteredUser = Users.find(item => item.email === email && item.password === password)
  
  if (filteredUser){
    req.session.user = filteredUser.firstName
    return res.render('login', { filteredUser })
  } else {
    
    return res.render('index', { alert: 'Username/Password incorrect! Please enter again.' })
  } 
})

app.get('/logout', auth, (req, res) => {
  req.session.destroy(() => {
    console.log('session destroyed')
  })
  res.render('index', { alert: 'You are logged out! Re-enter email and password to log in again!' })
})

app.listen(port, (req, res) => {
  console.log(`running on http://localhost:${port}`)
})
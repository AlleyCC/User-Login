const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const Users = require('./users')

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true}))


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, (req, res) => {
  console.log(`running on http://localhost:${port}`)
})
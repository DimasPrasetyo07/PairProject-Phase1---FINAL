const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000
const session = require('express-session')


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use(express.static('images'))
app.use(express.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: true }
}))
app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
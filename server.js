let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let mongodb = require('mongodb')

const todoListRoutes = require('./routes/todoList')
let cors = require('cors')

let port = 5000

let app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/api", todoListRoutes)

app.listen(port, ()=>{
  console.log("Server started on port " + port)
})

let user
function passwordProtected(req, res, next) {
  res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"')
  console.log(req.headers.authorization)
  if (req.headers.authorization) {
  console.log(Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString())
  let authentication = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
  let colonIndex = authentication.indexOf(":");
  let username = authentication.substr(0,colonIndex);
  let password = authentication.substr(colonIndex+1,(authentication.length)-1);
  user = db.collection('users').findOne({username: username, password: password}, {'_id':1})
  if (user)
  next();
  }
  else
  res.status(401).send("Authentication required")
}

app.use(passwordProtected)
//*********************************************************************** *//


module.exports = app;

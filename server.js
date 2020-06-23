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
//*********************************************************************** *//
let db

app.use(express.static('public'))

let connectionString = 'mongodb+srv://todoListUser:1581998medhat@cluster0-xayty.mongodb.net/ToDoList-App?retryWrites=true&w=majority'
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  db = client.db()
  app.listen(3000)
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

module.exports = app;

const mongojs = require('mongojs')
let db = mongojs ("meanstack", ["tasks"])

exports.getTasks = async (req, res) => {
  let user = db.users.find
  db.todoLists.find((err, tasks) => {
    if(err){
      res.send(err)
    }
    res.json(tasks)
  })
}; /// to be updated

exports.addTask = async (req, res) => {
  let task = req.body
  console.log(task)
  if(task.text == null){
    res.status(400)
    res.json({
      error: "Bad Request"
    })
  }else {
    db.todoLists.save(task, (err,task) => {
      if(err){
        res.send(err)
      }
      res.json(task)
    })
  }
};

exports.deleteTask = async (req, res) => {
  db.todoLists.remove({_id: mongojs.ObjectId(req.params.id)}, (err,task) => {
    if(err){
      res.send(err)
    }
    res.json(task)
  })
};

exports.updateTask = async (req, res) => {
  let task = req.body
  let updatedTask = {};

  if(task.text){
    updatedTask.text = task.text
    console.log(updatedTask)
  }
  if (!updatedTask) {
    res.status(400)
    res.json({
    error: "Bad Request"
  })
  }else {
    db.todoLists.update({_id: mongojs.ObjectId(req.params.id)}, {$set: {text: task}}, (err,task) => {
      if(err){
        res.send(err)
      }
      res.json(task)
    })
  }
};



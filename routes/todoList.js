const express = require('express');
const router = express.Router();

const ToDoListController = require('../controllers/todoListController');

router.get("/tasks", ToDoListController.getTasks);
router.post("/addTask",ToDoListController.addTask);
router.delete("/deleteTask/:id",ToDoListController.deleteTask);
router.put("/updateTask/:id",ToDoListController.updateTask);

module.exports = router;
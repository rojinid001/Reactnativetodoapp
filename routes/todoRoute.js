const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.todoPage);

router.post('/addtask', todoController.addTask);

router.get('/alltasks', todoController.getAllTask);

router.delete('/deletetask/:id', todoController.deleteTask);

router.put('/updatetask/:id', todoController.updateTask);

module.exports = router;

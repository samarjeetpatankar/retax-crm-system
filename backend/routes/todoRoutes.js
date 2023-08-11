
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getTodos);
router.post('/seetodos', todoController.createTodo);
router.put('/todos/:taskId/status', todoController.updateTodoStatus);


module.exports = router;

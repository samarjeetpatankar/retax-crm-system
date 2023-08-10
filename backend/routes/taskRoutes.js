// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.createTask);
router.put('/:id/in-progress', taskController.moveTaskToInProgress);
router.put('/:id/completed', taskController.moveTaskToCompleted);

module.exports = router;

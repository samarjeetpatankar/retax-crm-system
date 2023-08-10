// controllers/taskController.js
const Task = require("../models/Task.model");

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title, status: 'todo' });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.moveTaskToInProgress = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: 'in-progress' },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.moveTaskToCompleted = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

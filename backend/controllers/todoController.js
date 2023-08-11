
const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createTodo = async (req, res) => {
  const { task, deadline, imageSrc, date } = req.body;
  try {
    const newTodo = new Todo({
      task,
      deadline,
      imageSrc,
      date,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

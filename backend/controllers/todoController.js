const Todo = require("../models/todoModel");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const {
      task,
      deadline,
      customer,
      customerImage,
      customerId,
      imageSrc,
      date,
    } = req.body;

    const newTodo = new Todo({
      task,
      deadline,
      customer,
      customerImage,
      customerId,
      imageSrc,
      date,
    });

    await newTodo.save();

    res.json(newTodo);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};


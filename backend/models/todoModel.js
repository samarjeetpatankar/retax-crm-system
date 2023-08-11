
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: String,
  deadline: String,
  imageSrc: String,
  date: String,
});

module.exports = mongoose.model('Todo', todoSchema);

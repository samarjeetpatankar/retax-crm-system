
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: String,
    deadline: Date,
    customer: String,
    customerImage: String, // Add this line
    customerId: String, // Add this line
    imageSrc: String,
    date: String,
  });
  
module.exports = mongoose.model('Todo', todoSchema);



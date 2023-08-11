
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: String,
    deadline: Date,
    customer: String,
    customerImage: String, 
    customerId: String, 
    imageSrc: String,
    date: String,
    status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  });
  
module.exports = mongoose.model('Todo', todoSchema);



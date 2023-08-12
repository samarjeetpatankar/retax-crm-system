const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: String,
  customerId: String,
  caseStatus: String,
  phoneNo: String,
  email: String,
  age: Number,
  imageUrl: String,
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;

const mongoose = require("mongoose");

const EmpolyeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    position: {
      type: String,
      required: true,
      enum: [
        "Head of marketing",
        "Marketing Consultant",
        "Head of sales",
        "Sales Manager",
        "Lead Generator",
      ],
    },
    department: {
      type: String,
      required: true,
      enum: ["Marketing", "Sales"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive", "In a Meeting"],
    },
    phoneNo: { type: String, required: true },
    imageLink: { type: String },
  },
  {
    timestamps: true,
  }
);

const EmpolyeeModel = mongoose.model("empolyee", EmpolyeeSchema);

module.exports = EmpolyeeModel;



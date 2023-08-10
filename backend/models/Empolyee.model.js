const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    location: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

EmpolyeeSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const EmpolyeeModel = mongoose.model("empolyee", EmpolyeeSchema);

module.exports = EmpolyeeModel;

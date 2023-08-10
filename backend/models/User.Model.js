const mongoose = require("mongoose");
 
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], default: "employee" },
  },
  {
    timestamps: true,
  }
);
 
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;



const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.Model");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 3);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "employee", 
    });

    await newUser.save();

    res.send({ msg: "signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Something went wrong." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: "User not found. Please signup first." });
    }

    const hashPassword = user.password;

    bcrypt.compare(password, hashPassword, function (err, result) {
      if (result) {
        const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY);
        const role = user.role; 

        res.send({ msg: "login successful", token: token, role: role }); 
      } else {
        res.status(401).send({ msg: "Incorrect password. Login failed." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Something went wrong." });
  }
};
 

  
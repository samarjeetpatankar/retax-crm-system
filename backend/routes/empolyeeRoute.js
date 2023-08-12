const express = require("express");
const EmpolyeeModel = require("../models/Empolyee.model");
const bcrypt = require("bcrypt");

const router = express.Router();
 
// Create a new employee
router.post("/create", async (req, res) => {
  try {
    const { password, ...otherFields } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmpolyee = new EmpolyeeModel({
      ...otherFields,
      password: hashedPassword,
    });

    await newEmpolyee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating employee" });
  }
});

// Get all employees
router.get("/all", async (req, res) => {
  try {
    const employees = await EmpolyeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Received ID:", id); // Add this line

    const employee = await EmpolyeeModel.findById(id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employee" });
  }
});

// Update employee by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await EmpolyeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedEmployee) {
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating employee" });
  }
});

// Delete employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await EmpolyeeModel.findByIdAndDelete(
      req.params.id
    );
    if (deletedEmployee) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting employee" });
  }
});

// Login route
router.post("/empolyeelogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await EmpolyeeModel.findOne({ email });

    if (!employee) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await employee.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login" });
  }
});

module.exports = router;

 


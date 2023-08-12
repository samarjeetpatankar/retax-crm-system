const express = require("express");
const CustomerModel = require("../models/Customer.Model");
const router = express.Router();

// Get all customers
router.get("/customers", async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new customer
router.post('/customers', async (req, res) => {
  try {
    const newCustomer = new CustomerModel(req.body);
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a customer
router.put("/customers/:id", async (req, res) => {
  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a customer
router.delete("/customers/:id", async (req, res) => {
  try {
    const deletedCustomer = await CustomerModel.findByIdAndDelete(
      req.params.id
    );
    res.json(deletedCustomer);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

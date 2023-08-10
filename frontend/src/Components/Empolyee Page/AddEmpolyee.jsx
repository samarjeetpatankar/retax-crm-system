import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddEmployee = ({ onSubmit }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
    department: "",
    status: "",
    phoneNo: "",
    imageLink: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    // Making the API call to create the employee
    try {
      const response = await fetch("http://localhost:8199/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Employee created successfully, you might want to handle success here
        console.log("Employee created successfully");
        // Optionally, you can clear the form data after successful submission
        setFormData({
          name: "",
          email: "",
          password: "",
          position: "",
          department: "",
          status: "",
          phoneNo: "",
          imageLink: "",
          location: "",
        });
        navigate("/employee")
      } else {
        // Handle error response here
        console.error("Error creating employee");
      }
    } catch (error) {
      // Handle any network or API-related errors
      console.error("An error occurred:", error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Position</FormLabel>
            <Select
              name="position"
              value={formData.position}
              onChange={handleChange}
            >
              <option value="">Select Position</option>
              <option value="Head of marketing">Head of marketing</option>
              <option value="Marketing Consultant">Marketing Consultant</option>
              <option value="Head of sales">Head of sales</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Lead Generator">Lead Generator</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Department</FormLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="In a Meeting">In a Meeting</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image Link</FormLabel>
            <Input
              type="text"
              name="imageLink"
              value={formData.imageLink}
              onChange={handleChange}
            />
          </FormControl>
        </Stack>
        <Button type="submit" mt={4} colorScheme="blue">
          Create Employee
        </Button>
      </form>
    </Box>
  );
};

export default AddEmployee;

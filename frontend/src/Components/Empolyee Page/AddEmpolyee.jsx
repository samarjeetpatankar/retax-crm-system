import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  positions: "",
  department: "",
  status: "",
  phoneNumber: "",
  email: "",
  img: "",
  joinDate: "",
};

function Form() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3003/employeesListData", formData)
      .then((response) => {
        //setFormData(initialState);
        showToast();
        navigate('/employee')
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  const showToast = () => {
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box
      justifyContent="center"
     
      boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
      p="30px"
      borderRadius="md"
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Image Link</FormLabel>
          <Input name="img" value={formData.img} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Position</FormLabel>
          <Select
            name="positions"
            value={formData.positions}
            onChange={handleChange}
          >
            <option value="">Select a position</option>
            <option value="Head of marketing">Head of marketing</option>
            <option value="Marketing Consultant">Marketing Consultant</option>
            <option value="Head of sales">Head of sales</option>
            <option value="Sales">Sales</option>
            <option value="Manager">Manager</option>
            <option value="Lead Generator">Lead Generator</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Department</FormLabel>
          <Select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select a department</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Status</FormLabel>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select a status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="In a Meeting">In a Meeting</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <Button
          marginTop="20px"
          type="submit"
          onClick={() => {
            showToast();
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Form;

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegularUserLogin = async () => {
    const response = await fetch("http://localhost:8199/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Regular User Login successful", data);
      // Handle the token and user data for regular user
    } else {
      const errorData = await response.json();
      console.error("Regular User Login error", errorData);
      // Handle login error for regular user
    }
  };

  const handleEmployeeLogin = async () => {
    const response = await fetch("http://localhost:8199/empolyeelogin", {
      // Fix the typo here: "/empolyeelogin" to "/employeelogin"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Employee Login successful", data);
      // Handle the token and user data for employee
    } else {
      const errorData = await response.json();
      console.error("Employee Login error", errorData);
      // Handle login error for employee
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleEmployeeLogin}>
          Login as Employee
        </Button>
        <Button colorScheme="teal" onClick={handleRegularUserLogin}>
          Login as Admin
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;

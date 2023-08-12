import React, { useState } from "react";
import {
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

const Login = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      // Send a POST request to the login API
      const response = await fetch("http://localhost:8199/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setIsLoggedIn(true);
        setErrorMessage("");
        navigate("/");
      } else {
        // Login failed, show error message
        setIsLoggedIn(false);
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login");
    }
  };

  return (
    <VStack spacing={4} p={4}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleLogin}>
        Login
      </Button>
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      {isLoggedIn && <Navigate to="/" />}{" "}
     
    </VStack>
  );
};

export default Login;

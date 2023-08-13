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
import API_BASE_URL from "../ApiConfig/apiConfig";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = async () => {
    try {
      // Send a POST request to the login API
      const response = await fetch(`${API_BASE_URL}/login`, {
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
        // Store the token in localStorage
        localStorage.setItem("authToken", data.token); // Replace "authToken" with your actual token key
        handleLogin(); // Call the handleLogin function
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
    <VStack
      margin={"auto"}
      mt={"50px"}
      width={"700px"}
      spacing={6}
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="filled"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
        />
      </FormControl>
      <Button colorScheme="blue" size="lg" onClick={handleLoginClick}>
        Login
      </Button>
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      {isLoggedIn && <Navigate to="/" />}
    </VStack>
  );
};

export default Login;



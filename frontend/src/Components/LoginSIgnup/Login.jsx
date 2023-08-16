import React, { useState } from "react";
import {
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Box,
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
    <Box
      className="gradient"
      pt={["10px", "20px"]}
      height="100vh"
      backgroundColor="gray.100"
    >
      <VStack
        margin={"auto"}
        mt={["20px", "50px"]}
        width={["90%", "700px"]}
        spacing={6}
        p={8}
        borderWidth={3}
        borderRadius="lg"
        boxShadow="lg"
      >
        <FormControl>
          <FormLabel fontSize={["18px", "21px"]}>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            border={"1px solid black"}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={["18px", "21px"]}>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            border={"1px solid black"}
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
    </Box>
  );
};

export default Login;

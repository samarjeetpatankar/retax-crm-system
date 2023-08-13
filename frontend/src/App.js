import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import AllFiles from "./Components/AllFiles/AllFiles";
import Login from "./Components/LoginSIgnup/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking the token in localStorage
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <Box className="App">
      {isLoggedIn ? (
        <AllFiles handleLogout={handleLogout} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </Box>
  );
}

export default App;

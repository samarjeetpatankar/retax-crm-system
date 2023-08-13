import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import AllFiles from "./Components/AllFiles/AllFiles";
import Login from "./Components/LoginSIgnup/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // You can set the `isLoggedIn` state to `true` after successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // You can set the `isLoggedIn` state to `false` when the user logs out
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

// App.js
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import AllFiles from "./Components/AllFiles/AllFiles";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import Login from "./Components/LoginSIgnup/Login";
import { AllRoutes } from "./Components/AllRoutes/AllRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  return (
    <Box className="App">
      <AllFiles />
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} navigate={navigate} />} // Pass the navigate function to the Login component
        />
        {isLoggedIn ? <Route path="/" element={<AllRoutes />} /> : null}{" "}
        {/* Conditional rendering based on isLoggedIn */}
        {!isLoggedIn && (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}{" "}
        {/* Redirect all other paths to login */}
      </Routes>
    </Box>
  );
}

export default App;



import React from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import AllFiles from "./Components/AllFiles/AllFiles";
import Login from "./Components/LoginSIgnup/Login";

function App() {
  return (
    <Box className="App">
      <AllFiles />
      <Login />
    </Box>
  );
}

export default App;


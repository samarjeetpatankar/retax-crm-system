import React from "react";
import { Box, Grid, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Sidebar from "../Sidebar/Sidebar";
import { AllRoutes } from "../AllRoutes/AllRoutes";
import Topbar from "../Topbar/Topbar";
import Footer from "../Footer/Footer";
const AllFiles = () => {
  const { isOpen, onToggle } = useDisclosure();

  const handleSidebarToggle = () => {
    onToggle();
  };
  return (
    <div>
      <Box mb={2}> 
        <Topbar />
      </Box>
      <Grid templateColumns={{ base: "1fr", md: "250px 1fr" }} gap={6}>
        <Box display={{ base: isOpen ? "block" : "none", md: "block" }}>
          <Sidebar />
        </Box>

        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={handleSidebarToggle}
          />
        </Box>

        <Box display={{ base: "block", md: "block" }}>
          <AllRoutes />
        </Box>
      </Grid>
      <Footer />
    </div>
  );
};

export default AllFiles;
 

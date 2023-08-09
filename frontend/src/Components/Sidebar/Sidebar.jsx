import { Box, Heading, Input,Divider, HStack, VStack } from "@chakra-ui/react";
import {  FaCalendar, FaUserFriends, FaUser, FaBriefcase, FaChartBar, FaCommentAlt, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx"
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
 
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  

  const filteredLinks = [
    { path: '/', label: 'Dashboard', icon: RxDashboard },
    { path: '/calendar', label: 'Calendar', icon: FaCalendar },
    { path: '/employee', label: 'Employees', icon: FaUserFriends },
    { path: '/customers', label: 'Customers', icon: FaUser },
    { path: '/cases', label: 'Cases', icon: FaBriefcase },
    { path: '/leads', label: 'Leads', icon: FaChartBar },
    { path: '/requests', label: 'Requests', icon: FaCommentAlt },
  ].filter((link) =>
    link.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      p={4}
      borderRadius="md"
      boxShadow="md"
      height="100%"
      width="250px"
      bgGradient="linear(to-r, teal.300, teal.600)"
      color="white"
    >
      <Heading as="h3" size="lg" mb={4} textAlign="center">
        Retax
      </Heading>
    
        <Input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
          mb={4}
        />
     

      <VStack spacing={4} align="start">
        {filteredLinks.map((link) => (
          <Link key={link.path} to={link.path}>
            <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
              <link.icon size={20} />
              <Box>{link.label}</Box>
            </HStack>
          </Link>
        ))}
      </VStack>

      <Box mt={16}>
         <Divider />
      </Box>

      <VStack spacing={4} align="start" mt={4}>
         <Link to="/settings">
           <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
             <FaCog size={20} />
             <Box>Settings</Box>
           </HStack>
         </Link>
         <Link to="/help">
          <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
             <FaQuestionCircle size={20} />
             <Box>Help</Box>
           </HStack>
         </Link>
       </VStack>

       <Box mt={12}>
         <Divider />
       </Box>

       <Link to="/logout">
         <HStack spacing={2} mt={6} _hover={{ textDecoration: "underline" }}>
           <FaSignOutAlt size={20} />
           <Box>Logout</Box>
         </HStack>
     </Link>
     </Box>
    
  );
};

export default Sidebar;

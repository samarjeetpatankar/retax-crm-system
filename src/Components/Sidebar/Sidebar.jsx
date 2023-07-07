import { Box, Heading, Input, Button, Divider, HStack, VStack } from "@chakra-ui/react";
import { FaTasks, FaCalendar, FaUserFriends, FaUser, FaBriefcase, FaChartBar, FaCommentAlt, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
      <Input type="text" placeholder="Search" mb={4} />

      <VStack spacing={4} align="start">
        <Link to="/tasks">
          <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
            <FaTasks size={20} />
            <Box>Tasks</Box>
          </HStack>
        </Link>
        <Link to="/calendar">
          <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
            <FaCalendar size={20} />
            <Box>Calendar</Box>
          </HStack>
        </Link>
        <Link to="/employee">
          <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
            <FaUserFriends size={20} />
            <Box>Employees</Box>
          </HStack>
        </Link>
        <Link to="/customers">
          <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
            <FaUser size={20} />
            <Box>Customers</Box>
          </HStack>
        </Link>
        <Link to="/cases">
          <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
            <FaBriefcase size={20} />
            <Box>Cases</Box>
          </HStack>
        </Link>
        <Link to="/leads">
          <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
            <FaChartBar size={20} />
            <Box>Leads</Box>
          </HStack>
        </Link>
        <Link to="/requests">
          <HStack spacing={2} _hover={{ textDecoration: "underline" }}>
            <FaCommentAlt size={20} />
            <Box>Requests</Box>
          </HStack>
        </Link>
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

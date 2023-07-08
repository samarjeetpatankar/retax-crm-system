import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Box, IconButton, Flex, Spacer, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DashboardTop = () => {
    const navigate = useNavigate();
  return (
    <Box p={4} bg="white" boxShadow="md" borderRadius="md">
      <Flex alignItems="center">
        <Heading as="h3" size="lg" color="gray.700">
          Dashboard
        </Heading>
        <Spacer />
        <ButtonGroup isAttached variant="outline">
          <IconButton icon={<AddIcon />} colorScheme="blue" />
          <Button onClick={()=>navigate('/addempolyee')} colorScheme="blue">Add an employee</Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default DashboardTop;

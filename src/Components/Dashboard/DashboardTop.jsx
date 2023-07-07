import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button, Text, ButtonGroup, Box, IconButton, Flex, Spacer, Heading } from "@chakra-ui/react";

const DashboardTop = () => {
  return (
    <Box p={4} bg="white" boxShadow="md" borderRadius="md">
      <Flex alignItems="center">
        <Heading as="h3" size="lg" color="gray.700">
          Dashboard
        </Heading>
        <Spacer />
        <ButtonGroup isAttached variant="outline">
          <IconButton icon={<AddIcon />} colorScheme="blue" />
          <Button colorScheme="blue">Add an employee</Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default DashboardTop;

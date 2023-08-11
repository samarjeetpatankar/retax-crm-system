import React from "react";
import {
  Box,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const Customer = () => {
  return (
    <Box p="4">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th>
              {" "}
              <Checkbox />
            </Th>
            <Th>Customer Name</Th>
            <Th>Customer ID</Th>
            <Th>Case Status</Th>
            <Th>Phone No</Th>
            <Th>Email</Th>
            <Th>Age</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Sample customer data */}
          <Tr>
            <Td>
              <Checkbox />
            </Td>
            <Td>John Doe</Td>
            <Td>C12345</Td>
            <Td>Active</Td>
            <Td>123-456-7890</Td>
            <Td>john@example.com</Td>
            <Td>30</Td>
          </Tr>
          <Tr>
            <Td>
              <Checkbox />
            </Td>
            <Td>Jane Smith</Td>
            <Td>C67890</Td>
            <Td>Inactive</Td>
            <Td>987-654-3210</Td>
            <Td>jane@example.com</Td>
            <Td>28</Td>
          </Tr>
          {/* Add more customer rows here */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Customer;

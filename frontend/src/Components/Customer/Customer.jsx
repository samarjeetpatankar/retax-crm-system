import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8199/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  return (
    <Box p="4">
      <Button>
        Add a Customer
      </Button>
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>Customer Image</Th>
            <Th>Customer Name</Th>
            <Th>Customer ID</Th>
            <Th>Case Status</Th>
            <Th>Phone No</Th>
            <Th>Email</Th>
            <Th>Age</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => (
            <Tr key={customer._id}>
              <Td>
                <Checkbox />
              </Td>
              <Td>
                <img
                  src={customer.imageUrl}
                  alt={customer.name}
                  width="50"
                  height="50"
                />
              </Td>
              <Td>{customer.name}</Td>
              <Td>{customer.customerId}</Td>
              <Td>{customer.caseStatus}</Td>
              <Td>{customer.phoneNo}</Td>
              <Td>{customer.email}</Td>
              <Td>{customer.age}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Customer;

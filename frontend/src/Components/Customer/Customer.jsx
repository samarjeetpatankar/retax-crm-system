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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    imageUrl: "",
    name: "",
    customerId: "",
    caseStatus: "",
    phoneNo: "",
    email: "",
    age: "",
  });
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [deletingCustomerId, setDeletingCustomerId] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editingCustomerId) {
      // If editing an existing customer
      axios
        .put(
          `http://localhost:8199/customers/${editingCustomerId}`,
          customerData
        )
        .then((response) => {
          const updatedCustomers = customers.map((c) =>
            c._id === editingCustomerId ? response.data : c
          );
          setCustomers(updatedCustomers);
          setIsModalOpen(false);
          setEditingCustomerId(null);
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
        });
    } else {
      // If adding a new customer
      axios
        .post("http://localhost:8199/customers", customerData)
        .then((response) => {
          setCustomers([...customers, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error adding customer:", error);
        });
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomerId(customer._id);
    setCustomerData(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (customerId) => {
    setDeletingCustomerId(customerId);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8199/customers/${deletingCustomerId}`)
      .then(() => {
        const updatedCustomers = customers.filter(
          (c) => c._id !== deletingCustomerId
        );
        setCustomers(updatedCustomers);
        setDeletingCustomerId(null);
        setIsDeleteConfirmationOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  return (
    <Box p="4">
      <Button onClick={handleModalOpen}>Add a Customer</Button>
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
              <Td>
                <Button onClick={() => handleEditCustomer(customer)}>
                  Edit
                </Button>
              </Td>
              <Td>
                <Button onClick={() => handleDeleteCustomer(customer._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
          <Modal
            isOpen={isDeleteConfirmationOpen}
            onClose={() => setIsDeleteConfirmationOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to delete this customer?
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" onClick={confirmDelete}>
                  Delete
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsDeleteConfirmationOpen(false)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Customer</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleFormSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Customer Image</FormLabel>
                <Input
                  type="text"
                  name="imageUrl"
                  value={customerData.imageUrl}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={customerData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Customer ID</FormLabel>
                <Input
                  type="text"
                  name="customerId"
                  value={customerData.customerId}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Case Status</FormLabel>
                <Select
                  name="caseStatus"
                  value={customerData.caseStatus}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Phone No</FormLabel>
                <Input
                  type="text"
                  name="phoneNo"
                  value={customerData.phoneNo}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  name="age"
                  value={customerData.age}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={handleModalClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Customer;

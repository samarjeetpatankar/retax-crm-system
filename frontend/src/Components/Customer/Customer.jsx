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
  ButtonGroup
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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 7;
  const [currentDisplayedCustomers, setCurrentDisplayedCustomers] = useState(
    []
  );

  useEffect(() => {
    const filteredCustomers = searchResults.slice(
      (currentPage - 1) * customersPerPage,
      currentPage * customersPerPage
    );
    setCurrentDisplayedCustomers(filteredCustomers);
  }, [currentPage, searchResults]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  useEffect(() => {
    const filteredCustomers = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.customerId.includes(searchQuery) ||
        customer.phoneNo.includes(searchQuery) ||
        customer.email.includes(searchQuery)
    );
    setSearchResults(filteredCustomers);
  }, [searchQuery, customers]);

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
      <Input
        width={"500px"}
        type="text"
        placeholder="Search by name, customer ID, phone no, or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button mb={"10px"} ml={"700px"} onClick={handleModalOpen}>
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
          {currentDisplayedCustomers.map((customer) => (
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
        </Tbody>
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
      </Table>

      <Box mt="4">
        <ButtonGroup>
          <Button
            isDisabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button>{currentPage}</Button>
          <Button
            isDisabled={currentPage * customersPerPage >= searchResults.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>

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

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  Spacer,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { MdOutlineAddCircle } from "react-icons/md";

function Employee() {
  const [sort, setSort] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userRole, setUserRole] = useState("");
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editEmployeeData, setEditEmployeeData] = useState({
    name: "",
    position: "",
    department: "",
    status: "",
    phoneNo: "",
    email: "",
  });
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employeeData.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (event) => {
    let status = event.target.value;
    if (status === "All") {
      setEmployeeData(sort);
    } else {
      const sortedList = sort.filter((employee) => employee.status === status);
      setEmployeeData(sortedList);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleButton = (event) => {
    const sortBy = event.target.textContent.toLowerCase();
    if (sortBy === "position") {
      const sortedList = [...employeeData].sort((a, b) =>
        a.position.localeCompare(b.position)
      );
      setEmployeeData(sortedList);
    } else if (sortBy === "department") {
      const sortedList = [...employeeData].sort((a, b) =>
        a.department.localeCompare(b.department)
      );
      setEmployeeData(sortedList);
    } else if (sortBy === "status") {
      const sortedList = [...employeeData].sort((a, b) =>
        a.status.localeCompare(b.status)
      );
      setEmployeeData(sortedList);
    }
  };

  useEffect(() => {
    const fetchedUserRole = "admin";
    setUserRole(fetchedUserRole);

    axios
      .get("http://localhost:8199/all")
      .then((response) => {
        setSort(response.data);
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("User Role:", userRole);

  useEffect(() => {
    const filteredList = sort.filter(
      (employee) =>
        (employee.name &&
          employee.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (employee.phoneNumber &&
          employee.phoneNumber
            .toLowerCase()
            .includes(searchText.toLowerCase())) ||
        (employee.email &&
          employee.email.toLowerCase().includes(searchText.toLowerCase()))
    );
    setEmployeeData(filteredList);
  }, [searchText, sort]);

  const handleEditEmployee = (employee) => {
    setEditingEmployeeId(employee._id);
    setEditEmployeeData({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      status: employee.status,
      phoneNo: employee.phoneNo,
      email: employee.email,
    });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8199/${editingEmployeeId}`, editEmployeeData)
      .then((response) => {
        const updatedEmployeeData = employeeData.map((employee) =>
          employee._id === editingEmployeeId ? response.data : employee
        );
        setEmployeeData(updatedEmployeeData);
        setEditingEmployeeId(null);
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  const handleDeleteEmployee = (employeeId) => {
    setDeletingEmployeeId(employeeId);
  };

  const confirmDeleteEmployee = () => {
    axios
      .delete(`http://localhost:8199/${deletingEmployeeId}`)
      .then(() => {
        const updatedEmployeeData = employeeData.filter(
          (employee) => employee._id !== deletingEmployeeId
        );
        setEmployeeData(updatedEmployeeData);
        setDeletingEmployeeId(null);
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <Box style={{ margin: "10px", padding: "10px" }}>
      <Flex style={{ margin: "30px" }}>
        <Heading>Employees</Heading>
        <Spacer />

        {userRole === "admin" && (
          <Button
            as={Link}
            to="/addempolyee"
            colorScheme="purple"
            size="md"
            variant="outline"
          >
            <Box style={{ margin: "5px" }}>
              <MdOutlineAddCircle />
            </Box>
            Add An Employee
          </Button>
        )}
      </Flex>

      <Flex className="sort">
        <Box>
          <InputGroup>
            <InputLeftElement children={<SearchIcon />} />
            <Input
              onChange={handleSearchChange}
              value={searchText}
              placeholder="Search by name, phone or email"
            />
          </InputGroup>
        </Box>
        <Box marginLeft="10px" display="flex" columnGap="10px">
          <Button
            backgroundColor="white"
            border="solid 1px"
            borderColor="gray"
            onClick={handleButton}
          >
            Position
          </Button>
          <Button
            backgroundColor="white"
            border="solid 1px"
            borderColor="gray"
            onClick={handleButton}
          >
            Department
          </Button>
          <Button
            backgroundColor="white"
            border="solid 1px"
            borderColor="gray"
            onClick={handleButton}
          >
            Status
          </Button>
        </Box>
        <Spacer />
        <Box alignItems="center">Sort by:</Box>
        <Box>
          <Select
            placeholder="Select option"
            size="sm"
            variant="filled"
            style={{ width: "200px" }}
            onChange={handleSort}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="In a Meeting">In a Meeting</option>
            <option value="On Sick Leave">On Sick Leave</option>
          </Select>
        </Box>
      </Flex>

      <br />

      <Box className="showData">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <input type="checkbox" />
                </Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Position</Th>
                <Th>Department</Th>
                <Th>Status</Th>
                <Th>Phone no</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>

            <Tbody>
              {currentEmployees.map((employee) => {
                return (
                  <Tr
                    key={employee._id}
                    alignItems={"center"}
                    textAlign={"left"}
                  >
                    <Td>
                      <input type="checkbox" />
                    </Td>
                    <Td>
                      <Flex style={{ alignItems: "center" }}>
                        <Link to={`/employee/${employee._id}`}>
                          <img
                            src={employee.imageLink}
                            alt="profile img"
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "30px",
                            }}
                          />
                        </Link>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex style={{ alignItems: "center" }}>
                        <Link
                          to={`/employee/${employee._id}`}
                          style={{ fontSize: "14px" }}
                        >
                          {employee.name}
                        </Link>
                      </Flex>
                    </Td>
                    <Td fontSize={"14px"}>{employee.position}</Td>
                    <Td fontSize={"14px"}>{employee.department}</Td>
                    <Td
                      style={{
                        color:
                          employee.status === "Active"
                            ? "green"
                            : employee.status === "In a Meeting"
                            ? "blue"
                            : employee.status === "On Sick Leave"
                            ? "orange"
                            : "inherit",
                      }}
                    >
                      {employee.status}
                    </Td>
                    <Td fontSize={"14px"}>{employee.phoneNo}</Td>
                    <Td fontSize={"14px"} textAlign="center">
                      <Link
                        to={`/employee/${employee._id}`}
                        style={{ marginLeft: "-50px", textAlign: "left" }}
                      >
                        {employee.email}
                      </Link>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleEditEmployee(employee)}
                      >
                        Edit
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDeleteEmployee(employee._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="center" mt="4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            ml="2"
            disabled={currentEmployees.length < employeesPerPage}
          >
            Next
          </Button>
        </Flex>
        <Modal
          isOpen={editingEmployeeId !== null}
          onClose={() => setEditingEmployeeId(null)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Employee</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleEditFormSubmit}>
              <ModalBody>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={editEmployeeData.name}
                    onChange={handleEditInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Position</FormLabel>
                  <Input
                    type="text"
                    name="position"
                    value={editEmployeeData.position}
                    onChange={handleEditInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Department</FormLabel>
                  <Input
                    type="text"
                    name="department"
                    value={editEmployeeData.department}
                    onChange={handleEditInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Input
                    type="text"
                    name="status"
                    value={editEmployeeData.status}
                    onChange={handleEditInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone No</FormLabel>
                  <Input
                    type="text"
                    name="phoneNo"
                    value={editEmployeeData.phoneNo}
                    onChange={handleEditInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={editEmployeeData.email}
                    onChange={handleEditInputChange}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={() => setEditingEmployeeId(null)}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={deletingEmployeeId !== null}
          onClose={() => setDeletingEmployeeId(null)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this employee?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={confirmDeleteEmployee}>
                Delete
              </Button>
              <Button onClick={() => setDeletingEmployeeId(null)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}

export default Employee;

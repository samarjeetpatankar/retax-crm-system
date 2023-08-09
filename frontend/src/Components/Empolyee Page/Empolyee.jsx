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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { MdOutlineAddCircle } from "react-icons/md";

function Employee() {
  const [sort, setSort] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchText, setSearchText] = useState('');

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
        a.positions.localeCompare(b.positions)
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
    axios
      .get("http://localhost:3003/employeesListData")
      .then((response) => {
        setSort(response.data);
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filteredList = sort.filter((employee) =>
      employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.phoneNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setEmployeeData(filteredList);
  }, [searchText, sort]);

  return (
    <Box style={{ margin: "10px", padding: "10px" }}>
      <Flex style={{ margin: "30px" }}>
        <Heading>Employees</Heading>
        <Spacer />
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
                <Th>Name</Th>
                <Th>Position</Th>
                <Th>Department</Th>
                <Th>Status</Th>
                <Th>Phone no</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>

            <Tbody>
              {employeeData.map((employee) => {
                return (
                  <Tr key={employee.id} alignItems={"center"} textAlign={"left"}>
                    <Td>
                      <input type="checkbox" />
                    </Td>
                    <Td marginLeft="-50px">
                      <Flex style={{ alignItems: "center" }}>
                        <Link to={`/employee/${employee.id}`}>
                          <img
                            src={employee.img}
                            alt="profile img"
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "30px",
                            }}
                          />
                        </Link>
                        <Link
                          to={`/employee/${employee.id}`}
                          style={{ fontSize: "14px" }}
                        >
                          {employee.name}
                        </Link>
                      </Flex>
                    </Td>
                    <Td fontSize={"14px"}>{employee.positions}</Td>
                    <Td marginLeft={"-100px"} fontSize={"14px"}>
                      {employee.department}
                    </Td>
                    <Td
                      marginRight="-100px"
                      fontSize={"14px"}
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
                    <Td marginRight="70px" fontSize={"14px"}>
                      {employee.phoneNumber}
                    </Td>
                    <Td textAlign="center" fontSize={"14px"}>
                      <Link
                        to={`/employee/${employee.id}`}
                        style={{ marginLeft: "-50px" }}
                      >
                        {employee.email}
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Employee;

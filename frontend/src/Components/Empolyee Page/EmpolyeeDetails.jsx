import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ToDoTask from "./ToDoTask";
import API_BASE_URL from "../ApiConfig/apiConfig";

function EmployeeDetails() {
  const { emp_id } = useParams();
  const [empData, setEmpData] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  useEffect(() => {
    fetch(`${API_BASE_URL}/customers`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCustomers(data);
        }
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/${emp_id}`)
      .then((response) => {
        setEmpData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [emp_id]);

  if (!empData) {
    return <Box>Loading...</Box>;
  }

  return (
    <div>
      <Box>
        <Flex
          borderBottomWidth="0.5px"
          borderBottomStyle="solid"
          borderBottomColor="#000"
        >
          <Heading marginTop="30px">
            Employees {"> "}
            <span style={{ fontSize: "30px", color: "grey" }}>
              {empData.name}
            </span>
          </Heading>
        </Flex>
      </Box>
      <br />
      <br />
      <Flex>
        <Box
          className="left"
          width="300px"
          paddingRight="-90px"
          marginBottom="30px"
          paddingTop="-20px"
        >
          <Box>
            <Flex>
              <img
                src={empData.imageLink}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
              <Box style={{ marginLeft: "30px" }}>
                <h2
                  style={{
                    color:
                      empData.status === "Active"
                        ? "green"
                        : empData.status === "In a Meeting"
                        ? "blue"
                        : empData.status === "On Sick Leave"
                        ? "orange"
                        : "inherit",
                    fontSize: "20px",
                  }}
                >
                  {empData.status}
                </h2>
                <br />
                <Heading fontSize="20px">{empData.name}</Heading>
                <br />
                <p style={{ fontSize: "15px" }}>Position: {empData.position}</p>
                <p style={{ fontSize: "15px" }}>
                  Department: {empData.department}
                </p>
              </Box>
            </Flex>
            <br />
            <hr />

            <div style={{ marginLeft: "8px" }}>
              <br />
              <br />

              <div style={{ marginLeft: "10px" }}>
                <Flex>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/74/Location_icon_from_Noun_Project.png"
                    alt=""
                    style={{ width: "39px", marginLeft: "-10px" }}
                  />
                  <p
                    style={{
                      fontSize: "14px",
                      marginTop: "13px",
                      marginLeft: "3px",
                    }}
                  >
                    Location:{" "}
                  </p>
                  <p style={{ fontSize: "14px", marginTop: "13px" }}>
                    {empData.location}
                  </p>
                </Flex>
              </div>
              <div>
                <Flex>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png"
                    alt=""
                    style={{ width: "29px" }}
                  />
                  <p
                    style={{
                      fontSize: "14px",
                      marginTop: "13px",
                      marginLeft: "15px",
                    }}
                  >
                    Phone No:{" "}
                  </p>
                  <p style={{ fontSize: "14px", marginTop: "12px" }}>
                    {empData.phoneNo}
                  </p>
                </Flex>
              </div>
              <div>
                <Flex>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xbVW0hXsvd70H-Tv_T-hNtkrEWjBDnnbRtiTMhZRAw&s"
                    alt=""
                    style={{ width: "29px" }}
                  />
                  <p
                    style={{
                      fontSize: "14px",
                      marginTop: "13px",
                      marginLeft: "3px",
                    }}
                  >
                    Email:{" "}
                  </p>
                  <p style={{ fontSize: "14px", marginTop: "13px" }}>
                    {empData.email}
                  </p>
                </Flex>
              </div>
            </div>
            <br />
            <div>
              <Button
                padding="20px"
                fontSize="16px"
                backgroundColor={"aquamarine"}
                leftIcon={<AiOutlineMail style={{ color: "black" }} />}
                pr={2}
              >
                <a
                  href={`mailto:${empData.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Text ml={2}>Send to {empData.name}</Text>
                </a>
              </Button>
            </div>
            <Box mt={"23px"}>
              <Link to="/employee">
                <Button backgroundColor={"aquamarine"}>
                  Back to Employees Section
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box className="right" marginLeft="10px" marginTop="-50px">
          <Tabs>
            <TabList>
              <Tab>Tasks</Tab>
              <Tab>Customers</Tab>
              <Tab>Calls VOIP</Tab>
              <Tab>Leads</Tab>
              <Tab>Requests</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex w="900" gap={"10px"}>
                  <ToDoTask />
                </Flex>
              </TabPanel>
              <TabPanel>
                <Tabs>
                  <TabPanels>
                    <TabPanel>
                      {currentCustomers.map((customer, index) => (
                        <Box
                          key={index}
                          borderWidth="1px"
                          borderRadius="lg"
                          p="4"
                          mb="4"
                          boxShadow="md"
                        >
                          <VStack align="left" spacing="1">
                            <Text fontSize="lg" fontWeight="semibold">
                              Name: {customer.name}
                            </Text>
                            <Text>Email: {customer.email}</Text>
                            <Text>Phone No.: {customer.phoneNo}</Text>
                          </VStack>
                        </Box>
                      ))}
                      <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        disabled={indexOfLastCustomer >= customers.length}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </Button>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </div>
  );
}

export default EmployeeDetails;

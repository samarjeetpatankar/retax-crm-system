import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
  Badge,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineMail } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

function EmployeeDetails() {
  const { emp_id } = useParams();
  const [empData, setEmpData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3003/employeesListData")
      .then((response) => {
        const data = response.data;
        const employee = data.find((emp) => emp.id === parseInt(emp_id));
        setEmpData(employee);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [emp_id]);

  return (
    <div >
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
                src={empData.img}
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
                <p style={{ fontSize: "15px" }}>
                  Position: {empData.positions}
                </p>
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
                    {empData.Location}
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
                    {empData.phoneNumber}
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
                <Text ml={2} color={"black"}>
                  Send to {empData.name}
                </Text>
              </Button>
            </div>
            <Box mt={"23px"}>
              <Link to="/employee">
                <Button backgroundColor={"aquamarine"}>Back to Employees Section</Button>
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
                <Flex w="720px" gap={"10px"}>
                  <Box
                    w="240px"
                    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      ml={"10px"}
                      mt={"10px"}
                    >
                      <Text fontSize={"14px"}>
                        <Badge colorScheme="blue" mr={2} fontSize="12px">
                          &bull;
                        </Badge>
                        To Do
                      </Text>
                      <IoMdAdd />
                    </Box>
                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex">
                        <Text fontSize={"14px"}>
                          Send lead documents for inceptions
                        </Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 22-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"10px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxfMWicZlX7_MYru1I2rpzYtL9AJxEw7fse4xuClp&s"
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000221</Text>
                        </Box>

                        <Text fontSize={"12px"}>8-jun-2021</Text>
                      </Box>
                    </Box>

                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex">
                        <Text
                          fontSize={"14px"}
                          justifyContent={"space-between"}
                        >
                          Update Dcouments in Customer profile
                        </Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 23-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"10px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://www.corporatephotographylondon.com/wp-content/uploads/2019/11/HKstrategies-755-1-1024x683.jpg"
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000111</Text>
                        </Box>

                        <Text fontSize={"12px"}>09-jun-2021</Text>
                      </Box>
                    </Box>

                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex" justifyContent={"space-between"}>
                        <Text fontSize={"14px"}>Call to Customer</Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 27-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"23px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://media.gettyimages.com/id/155442005/photo/moustache-man.jpg?s=612x612&w=gi&k=20&c=2D51xsdb2y64t17NOJnCbW_eGcHx9-Nz10Hl-WQZJg8="
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000111</Text>
                        </Box>

                        <Text fontSize={"12px"}>10-jun-2021</Text>
                      </Box>
                    </Box>

                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex">
                        <Text fontSize={"14px"}>
                          Send lead documents for inceptions
                        </Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 01-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"10px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxfMWicZlX7_MYru1I2rpzYtL9AJxEw7fse4xuClp&s"
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000221</Text>
                        </Box>

                        <Text fontSize={"12px"}>8-jun-2021</Text>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    w="240px"
                    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      ml={"10px"}
                      mt={"10px"}
                    >
                      <Text fontSize={"14px"}>
                        <Badge colorScheme="yellow" mr={2} fontSize="12px">
                          &bull;
                        </Badge>
                        In Progress
                      </Text>
                      <IoMdAdd />
                    </Box>
                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex" justifyContent={"space-between"}>
                        <Text fontSize={"14px"}>Call to Customer</Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 19-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"10px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://www.corporatephotographylondon.com/wp-content/uploads/2019/11/HKstrategies-791-1-1024x683.jpg"
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000111</Text>
                        </Box>

                        <Text fontSize={"12px"}>9-jun-2021</Text>
                      </Box>
                    </Box>

                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex">
                        <Text fontSize={"14px"}>
                          Send lead documents for inceptions
                        </Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 22-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"10px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://www.corporatephotographylondon.com/wp-content/uploads/2019/11/HKstrategies-1210-1024x683.jpg"
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000221</Text>
                        </Box>

                        <Text fontSize={"12px"}>8-jun-2021</Text>
                      </Box>
                    </Box>

                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex">
                        <Text fontSize={"14px"}>
                          Send lead documents for inceptions
                        </Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 22-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"10px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxfMWicZlX7_MYru1I2rpzYtL9AJxEw7fse4xuClp&s"
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000221</Text>
                        </Box>

                        <Text fontSize={"12px"}>8-jun-2021</Text>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    w="240px"
                    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      ml={"10px"}
                      mt={"10px"}
                    >
                      <Text fontSize={"14px"}>
                        <Badge colorScheme="green" mr={2} fontSize="12px">
                          &bull;
                        </Badge>
                        Completed
                      </Text>
                      <IoMdAdd />
                    </Box>
                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex" justifyContent={"space-between"}>
                        <Text fontSize={"14px"}>Call to Customer</Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 17-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"10px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxfMWicZlX7_MYru1I2rpzYtL9AJxEw7fse4xuClp&s"
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000228</Text>
                        </Box>

                        <Text fontSize={"12px"}>7-jun-2021</Text>
                      </Box>
                    </Box>

                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex">
                        <Text fontSize={"14px"}>
                          Send lead documents for inceptions
                        </Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 22-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"10px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxfMWicZlX7_MYru1I2rpzYtL9AJxEw7fse4xuClp&s"
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000221</Text>
                        </Box>

                        <Text fontSize={"12px"}>8-jun-2021</Text>
                      </Box>
                    </Box>

                    <Box
                      mt={"20px"}
                      p={"10px"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      <Box display="flex">
                        <Text fontSize={"14px"}>
                          Send lead documents for inceptions
                        </Text>
                        <FiMoreHorizontal />
                      </Box>
                      <Box>
                        <Text fontSize={"14px"}>Deadline : 22-Jun-2021</Text>
                      </Box>
                      <Box
                        mt={"10px"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Image
                            width="45px"
                            borderRadius="10px"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxfMWicZlX7_MYru1I2rpzYtL9AJxEw7fse4xuClp&s"
                            alt="img"
                          />
                          <Text fontSize={"12px"}>ID000221</Text>
                        </Box>

                        <Text fontSize={"12px"}>8-jun-2021</Text>
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </div>
  );
}

export default EmployeeDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Badge,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EmployeeDetails() {
  const { emp_id } = useParams();
  const [empData, setEmpData] = useState(null);

  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState(new Date());

  const handleAddTodo = () => {
    if (taskInput && deadlineInput) {
      const newTodo = {
        task: taskInput,
        deadline: deadlineInput.toDateString(),
        id: `ID${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toLocaleDateString(),
        imageSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxfMWicZlX7_MYru1I2rpzYtL9AJxEw7fse4xuClp&s",
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTaskInput("");
      setDeadlineInput(new Date());
    }
  };

  const handleMoveToInProgress = (todo) => {
    setInProgress((prevInProgress) => [...prevInProgress, todo]);
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
  };

  const handleMoveToCompleted = (todo) => {
    setCompleted((prevCompleted) => [...prevCompleted, todo]);
    setInProgress((prevInProgress) =>
      prevInProgress.filter((item) => item.id !== todo.id)
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8199/${emp_id}`)
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
                  <Text ml={2}>Send to {empData.email}</Text>
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
                      <IoMdAdd
                        onClick={handleAddTodo}
                        style={{ cursor: "pointer" }}
                      />
                    </Box>

                    <Box p="10px">
                      <Input
                        placeholder="Task"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        mb="5px"
                      />
                      <DatePicker
                        selected={deadlineInput}
                        onChange={(date) => setDeadlineInput(date)}
                        dateFormat="dd-MMM-yyyy"
                      />
                      <Button
                        onClick={handleAddTodo}
                        colorScheme="blue"
                        size="sm"
                      >
                        Add Task
                      </Button>
                    </Box>
                    {todos.map((todo) => (
                      <Box
                        key={todo.id}
                        mt={"20px"}
                        p={"10px"}
                        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      >
                        <Box display="flex">
                          <Text fontSize={"14px"}>{todo.task}</Text>
                          <Button
                            onClick={() => handleMoveToInProgress(todo)}
                            colorScheme="yellow"
                            size="sm"
                          >
                            Move to In Progress
                          </Button>
                        </Box>
                        <Box>
                          <Text fontSize={"14px"}>
                            Deadline : {todo.deadline}
                          </Text>
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
                              src={todo.imageSrc}
                              alt="img"
                            />
                            <Text fontSize={"12px"}>{todo.id}</Text>
                          </Box>
                          <Text fontSize={"12px"}>{todo.date}</Text>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {/* In Progress Section */}
                  <Box
                    w="240px"
                    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    mt="20px"
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
                    {inProgress.map((todo) => (
                      <Box
                        key={todo.id}
                        mt={"20px"}
                        p={"10px"}
                        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      >
                        <Box display="flex">
                          <Text fontSize={"14px"}>{todo.task}</Text>
                          <Button
                            onClick={() => handleMoveToCompleted(todo)}
                            colorScheme="green"
                            size="sm"
                          >
                            Move to Completed
                          </Button>
                        </Box>
                        <Box>
                          <Text fontSize={"14px"}>
                            Deadline : {todo.deadline}
                          </Text>
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
                              src={todo.imageSrc}
                              alt="img"
                            />
                            <Text fontSize={"12px"}>{todo.id}</Text>
                          </Box>
                          <Text fontSize={"12px"}>{todo.date}</Text>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {/* Completed Section */}
                  <Box
                    w="240px"
                    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    mt="20px"
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
                    {completed.map((todo) => (
                      <Box
                        key={todo.id}
                        mt={"20px"}
                        p={"10px"}
                        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      >
                        <Box display="flex">
                          <Text fontSize={"14px"}>{todo.task}</Text>
                          <FiMoreHorizontal />
                        </Box>
                        <Box>
                          <Text fontSize={"14px"}>
                            Deadline : {todo.deadline}
                          </Text>
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
                              src={todo.imageSrc}
                              alt="img"
                            />
                            <Text fontSize={"12px"}>{todo.id}</Text>
                          </Box>
                          <Text fontSize={"12px"}>{todo.date}</Text>
                        </Box>
                      </Box>
                    ))}
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
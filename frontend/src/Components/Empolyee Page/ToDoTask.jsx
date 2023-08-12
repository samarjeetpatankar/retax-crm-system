import React, { useState, useEffect } from "react";
import { Box, Text, Badge, Button, Input, Image } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ToDoTask = () => {
  const [taskInput, setTaskInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState(new Date());
  const [customerInput, setCustomerInput] = useState("");
  const [customerImageInput, setCustomerImageInput] = useState("");
  const [customerIdInput, setCustomerIdInput] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [todos, setTodos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = todos.slice(indexOfFirstTask, indexOfLastTask);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (indexOfLastTask < todos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8199/todos")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTodos(data);
        }
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleAddClick = () => {
    setShowInputs(!showInputs);
  };

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      return;
    }

    const newTodo = {
      task: taskInput,
      deadline: deadlineInput.toISOString().split("T")[0],
      customer: customerInput,
      customerImage: customerImageInput,
      customerId: customerIdInput,
      date: new Date().toLocaleDateString(),
    };

    fetch("http://localhost:8199/seetodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTodos([...todos, data]);
          setTaskInput("");
          setDeadlineInput(new Date());
          setShowInputs(false); // Hide the input fields after adding
        }
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  return (
    <div>
      <Box w="280px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
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
          <IoMdAdd style={{ cursor: "pointer" }} onClick={handleAddClick} />
        </Box>

        {showInputs && (
          <Box p="10px">
            <Input
              placeholder="Task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              mb="5px"
            />
            <Input
              placeholder="Customer Image URL"
              value={customerImageInput}
              onChange={(e) => setCustomerImageInput(e.target.value)}
              mb="5px"
            />
            <Input
              placeholder="Customer ID"
              value={customerIdInput}
              onChange={(e) => setCustomerIdInput(e.target.value)}
              mb="5px"
            />
            <Input
              placeholder="Customer Name"
              value={customerInput}
              onChange={(e) => setCustomerInput(e.target.value)}
              mb="5px"
            />
            <Box display="inline-flex" alignItems="center">
              <label>Deadline : </label>
              <DatePicker
                selected={deadlineInput}
                onChange={(date) => setDeadlineInput(date)}
                dateFormat="dd-MMM-yyyy"
              />
            </Box>
            <Button colorScheme="blue" size="sm" onClick={handleAddTask}>
              Add Task
            </Button>
          </Box>
        )}

        {currentTasks.map((todo) => (
          <Box
            key={todo.id}
            mt={"20px"}
            p={"10px"}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          >
            <Box display="flex">
              <Text fontSize={"14px"}>Task Name:</Text>
              <Text ml={"7px"} fontSize={"14px"} fontWeight="bold">
                {todo.task}
              </Text>
            </Box>

            <Box>
              <Text fontSize={"14px"}>Deadline : {todo.deadline}</Text>
              <Text fontSize={"14px"}>Customer : {todo.customer}</Text>
              <Text fontSize={"14px"}>Customer ID: {todo.customerId}</Text>
            </Box>
            <Box mt={"10px"} display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"}>
                <Image
                  width="45px"
                  borderRadius="10px"
                  src={todo.customerImage}
                  alt="img"
                />
                <Text fontSize={"14px"}>{todo.id}</Text>
              </Box>
              <Text fontSize={"14px"}>Added Date : {todo.date}</Text>
            </Box>
          </Box>
        ))}
      </Box>

      <div style={{ display: "flex", justifyContent: "space-between" , marginTop:"5px" }}>
        <Button
        colorScheme='teal' variant='outline'
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          style={{ order: 1 }}
        >
          Previous
        </Button>
        <Button
        colorScheme='teal' variant='outline'
          disabled={indexOfLastTask >= todos.length}
          onClick={handleNextPage}
          style={{ order: 2 }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ToDoTask;

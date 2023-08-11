import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Badge,
  Button,
  Input,
  Image,
 
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ToDoTask = () => {
  const [taskInput, setTaskInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState(new Date());
  const [todos, setTodos] = useState([]);

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

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      return;
    }

    const newTodo = {
      task: taskInput,
      deadline: deadlineInput.toISOString().split("T")[0],
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxfMWicZlX7_MYru1I2rpzYtL9AJxEw7fse4xuClp&s",
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
        }
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  return (
    <div>
      <Box w="300px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
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
          <IoMdAdd style={{ cursor: "pointer" }} />
        </Box>

        <Box p="10px">
          <Input
            placeholder="Task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            mb="5px"
          />

          <Box display="inline-flex" alignItems="center">
            <label >Deadline : </label>
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
        {todos.map((todo) => (
          <Box
            key={todo.id}
            mt={"20px"}
            p={"10px"}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          >
            <Box display="flex">
              <Text fontSize={"14px"}>{todo.task}</Text>
            </Box>
            <Box>
              <Text fontSize={"14px"}>Deadline : {todo.deadline}</Text>
            </Box>
            <Box mt={"10px"} display={"flex"} justifyContent={"space-between"}>
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
    </div>
  );
};

export default ToDoTask;

import React, { useState, useEffect } from "react";
import { Box, Text, Image } from "@chakra-ui/react";

const InProgressTasks = () => {
  const [inProgressTasks, setInProgressTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8199/inprogress")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInProgressTasks(data);
        }
      })
      .catch((error) =>
        console.error("Error fetching in progress tasks:", error)
      );
  }, []);

  return (
    <Box>
      {inProgressTasks.map((task) => (
        <Box
          key={task.id}
          mt={"20px"}
          p={"10px"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Box display="flex">
            <Text fontSize={"14px"}>Task Name:</Text>
            <Text ml={"7px"} fontSize={"14px"} fontWeight="bold">
              {task.task}
            </Text>
          </Box>

          <Box>
            <Text fontSize={"14px"}>Deadline : {task.deadline}</Text>
            <Text fontSize={"14px"}>Customer : {task.customer}</Text>
            <Text fontSize={"14px"}>Customer ID: {task.customerId}</Text>
          </Box>
          <Box mt={"10px"} display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
              <Image
                width="45px"
                borderRadius="10px"
                src={task.customerImage}
                alt="img"
              />
              <Text fontSize={"14px"}>{task.id}</Text>
            </Box>
            <Text fontSize={"14px"}>Added Date : {task.date}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default InProgressTasks;

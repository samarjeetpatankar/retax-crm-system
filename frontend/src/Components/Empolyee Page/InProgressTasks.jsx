import React, { useState, useEffect } from "react";

const InProgressTasks = () => {
  const [inProgressTasks, setInProgressTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8199/todos?status=In%20Progress")
      .then((response) => response.json())
      .then((data) => {
        setInProgressTasks(data);
      })
      .catch((error) =>
        console.error("Error fetching in progress tasks:", error)
      );
  }, []);

  return (
    <div>
      {inProgressTasks.map((task) => (
        <div key={task.id}>
          <p>{task.task}</p>
          <p>Deadline: {task.deadline}</p>
          <p>Customer: {task.customer}</p>
          <p>Customer ID: {task.customerId}</p>
          {/* Display other task details as needed */}
        </div>
      ))}
    </div>
  );
};

export default InProgressTasks;

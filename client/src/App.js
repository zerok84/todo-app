import React, { useEffect, useState } from "react";
import {
  addTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "./services/taskServices";
import { Paper, TextField, Checkbox, Button } from "@mui/material";
import "./App.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setTaskInput(e.currentTarget.value);
  };

  const handleUpdate = async (taskId) => {
    try {
      let newStatus;
      const newTasks = [];
      tasks.forEach((task) => {
        if (task._id === taskId) {
          newStatus = !task.completed;
          newTasks.push({ ...task, completed: newStatus });
        } else {
          newTasks.push(task);
        }
      });
      await updateTaskStatus(taskId, newStatus);
      setTasks(newTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      const newTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(newTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addTask(taskInput);
      tasks.push(data);
      setTaskInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App flex">
      <Paper elevation={3} className="container">
        <div className="heading">TODO List App with MERN stack</div>
        <form
          onSubmit={handleSubmit}
          className="flex"
          style={{ margin: "0.95rem 0" }}
        >
          <TextField
            variant="outlined"
            size="small"
            sx={{ width: "75%" }}
            value={taskInput}
            required={true}
            onChange={handleChange}
            placeholder="Add new TO-DO"
          />
          <Button
            sx={{ height: "2.5rem", marginLeft: "0.625rem" }}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Add task
          </Button>
        </form>
        <div>
          {tasks.map((task) => (
            <Paper key={task._id} className="flex task_container">
              <Checkbox
                checked={task.completed}
                onClick={() => handleUpdate(task._id)}
                color="primary"
              />
              <div className={task.completed ? "task line_through" : "task"}>
                {task.task}
              </div>
              <Button onClick={() => handleDelete(task._id)} color="secondary">
                delete
              </Button>
            </Paper>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default Todo;

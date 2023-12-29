import express from "express";
import { getTask, createTask, updateTask, deleteTask, completeTask } from "../controllers/Task.js";

const taskRoute = express.Router();

taskRoute.get("/", getTask);
taskRoute.post("/create", createTask);
taskRoute.put("/edit/:id", updateTask);
taskRoute.put("/complete/:id", completeTask);
taskRoute.delete("/delete/:id", deleteTask);



export default taskRoute;
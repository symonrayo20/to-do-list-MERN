import { Task } from "../models/tasksModel.js";

export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).send(tasks);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({Error: "retrieve Error", message: error.message})
    }
}

export const createTask = async (req, res) => {
    try {
        if (!req.body.task || !req.body.category) {
            return res.status(400).send({message: "Please fill up all fields"})
        }

        const newTask = {
            task: req.body.task,
            category: req.body.category,
            isComplete: false
        }

        const task = await Task.create(newTask);
        return res.status(201).send(task);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({Error: "Create Error", message: error.message})

    }
}

export const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Task.findByIdAndUpdate(id, req.body, {new: true});

        return (result) ? res.status(200).send({message: "updated Succesfully", data: result})
                        : res.status(404).send({message: "Tasks Not Found"});


    } catch (error) {
        console.log(error.message);
        res.status(500).send({Error: "Update Error", message: error.message})
    }
}

export const completeTask = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Task.findByIdAndUpdate(id, {isComplete: true}, {new: true});

        return (result) ? res.status(200).send({message: "updated Succesfully", data: result})
                        : res.status(404).send({message: "Tasks Not Found"});


    } catch (error) {
        console.log(error.message);
        res.status(500).send({Error: "Update Error", message: error.message})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Task.findByIdAndDelete(id);

        return (result) ? res.status(200).send({message: "Deleted Succesfully", data: result})
                        : res.status(404).send({message: "Tasks Not Found"});


    } catch (error) {
        console.log(error.message);
        res.status(500).send({Error: "Delete Error", message: error.message})
    }
}


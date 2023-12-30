import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDB_URL } from './config.js';
import taskRoute from './routes/Task.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoute);

const getDirName = function (moduleUrl) {
    const filename = fileURLToPath(moduleUrl)
    return path.dirname(filename)
}

app.use(express.static(path.join(getDirName(import.meta.url), "../frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(getDirName(import.meta.url), "../frontend/dist/index.html"));
})

mongoose.connect(mongoDB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`app is listening to port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })




import express from 'express';
import * as mongoose from 'mongoose';
import taskRoute from './routes/Task.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoute);

const getDirName = function (moduleUrl) {
    const filename = fileURLToPath(moduleUrl)
    return path.dirname(filename)
}


mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`app is listening to port: ${process.env.PORT}`);
    })
    app.use(express.static(path.join(getDirName(import.meta.url), "../frontend/dist")));
    console.log(getDirName(import.meta.url));
    app.get("*", (req, res) => {
        res.sendFile(path.join(getDirName(import.meta.url), "../frontend/dist/index.html"));
        })
    })
    .catch((err) => {
        console.log(err);
    })




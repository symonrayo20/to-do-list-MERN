import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDB_URL } from './config.js';
import taskRoute from './routes/Task.js';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoute);

mongoose.connect(mongoDB_URL)
    .then(() => {
        console.log("Connected to Database");
        app.listen(PORT, () => {
            console.log(`app is listening to port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })




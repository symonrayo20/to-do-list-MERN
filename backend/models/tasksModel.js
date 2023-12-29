import mongoose from "mongoose";

const taskScheme = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        isComplete: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Task = mongoose.model("Task", taskScheme);
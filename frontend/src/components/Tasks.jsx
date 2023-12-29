import { useContext, useEffect, useState } from "react"
import Task from "./Task"
import { TaskContext } from "../pages/Home";

const Tasks = () => {
    const {tasks, setTasks} = useContext(TaskContext);

    return (
        <div>
            
            <div className="my-8 text-stone-600">
                <h1 className="text-2xl font-semibold">Pending Task</h1>
                <div className="flex flex-col gap-y-2">
                    {tasks.map(task => (
                        !task.isComplete && <Task key={task._id} task={task} />
                    ))}
                </div>
            </div>
            <div className="my-5 text-stone-500">
                <h1 className="text-2xl font-semibold">Completed Task</h1>
                <div className="flex flex-col gap-y-2">
                    {tasks.map(task => (
                        task.isComplete && <Task key={task._id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tasks

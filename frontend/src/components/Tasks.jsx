import { useContext } from "react"
import Task from "./Task"
import { TaskContext } from "../pages/Home";

const Tasks = () => {
    const {tasks, setTasks} = useContext(TaskContext);
    return (
        <div>
            <div className="my-5 text-stone-600">
                <h1 className="text-xl font-semibold mb-2">Pending Task</h1>
                <div className="flex flex-col gap-y-2 pb-1 max-h-[300px] overflow-auto">
                    {tasks.map(task => (
                        !task.isComplete && <Task key={task._id} task={task} />
                    ))}
                </div>
            </div>
            <div className="my-5 text-stone-500">
                <h1 className="text-xl font-semibold mb-2">Completed Task</h1>
                <div className="flex flex-col gap-y-2 pb-1 max-h-[300px] overflow-auto">
                    {tasks.map(task => (
                        task.isComplete && <Task key={task._id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tasks

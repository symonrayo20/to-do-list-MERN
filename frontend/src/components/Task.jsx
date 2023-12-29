import { useContext, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TaskContext } from "../pages/Home";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";


const Task = ({task}) => {
    const {tasks, setTasks} = useContext(TaskContext);
    const [editShowModal, setEditShowModal] = useState(false);
    const [deleteShowModal, setDeleteShowModal] = useState(false);
    const navigate = useNavigate();

    const taskCompleted = () => {
        axios.put(`http://localhost:8000/tasks/complete/${task._id}`)
            .then((res) => {
                setTasks(tasks.map(theTask => {
                    return theTask._id === task._id ? res.data.data : theTask;
                }))
                navigate(-1);
            })
            .catch((err) => {
                enqueueSnackbar(err, {variant: "error"});
            })
    }

    return (
        <div className="flex items-center shadow-md py-4 px-6 rounded-lg">
            <Link to={`/complete/${task._id}`} onClick={taskCompleted}>
                <input
                    disabled={task.isComplete}
                    defaultChecked={task.isComplete}
                    className={`h-5 w-5 mr-8 ${task.isComplete || "cursor-pointer"}`}
                    type="checkbox"
                />
            </Link>
            <div className="flex-1">
                <p className={`text-xl font-medium ${task.isComplete && "line-through"}`}>{task.task}</p>
                <p>{new Date(task.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-x-4">
                {task.isComplete || 
                    <Link to={`/edit/${task._id}`} onClick={() => setEditShowModal(true)}>
                        <MdEdit className="text-2xl text-green-700 cursor-pointer" />
                    </Link>
                }
                <Link to={`/delete/${task._id}`} onClick={() => setDeleteShowModal(true)}>
                    <MdDelete className="text-2xl text-red-700 cursor-pointer" />
                </Link>
            </div>

            {editShowModal && <EditTask taskEdit={task} onClose={() => setEditShowModal(false)} />}
            {deleteShowModal && <DeleteTask taskDelete={task} onClose={() => setDeleteShowModal(false)} />}
        </div>
    )
}

export default Task

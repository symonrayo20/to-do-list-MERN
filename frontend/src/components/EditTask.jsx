import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { MdClose } from "react-icons/md";
import Button from "./Button";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../pages/Home";

const EditTask = ({ taskEdit, onClose }) => {
    const {tasks, setTasks} = useContext(TaskContext);
    const [task, setTask] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setTask(taskEdit.task);
        setCategory(taskEdit.category);
    }, [])

    const onClosed =  () => {
        navigate(-1);
        onClose();
    }

    const editTask = () => {
        const data = {task, category};
        axios.put(`/tasks/edit/${taskEdit._id}`, data)
            .then((res) => {
                setTasks(tasks.map((theTask => {
                    return theTask._id === taskEdit._id ? res.data.data : theTask;
                })))
                enqueueSnackbar("Task Update Successfully", {variant: "success"})
                onClosed();
            })
            .catch((err) => {
                enqueueSnackbar(err, {variant: "error"})
            })
    }

    return (
        <div 
            className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-60 z-50 flex justify-center "
            onClick={onClosed}
        >
            <div 
                className="relative w-[500px] h-[320px] mt-16 px-5 bg-white rounded"
                onClick={(e) => e.stopPropagation()}
            >   
                <div className="">
                    <h1 className="text-2xl text-center mt-2 mb-5  font-semibold text-stone-700">Edit Task</h1>
                    <MdClose 
                        className="absolute text-2xl top-2 right-2 cursor-pointer" 
                        onClick={onClosed}
                    />
                </div>

                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm mb-1">Task</label>
                        <input 
                            type="text" 
                            className="text-sm px-2 py-1 border-2 border-stone-400 rounded outline-stone-500 w-full" 
                            placeholder="Enter a Task" 
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm mb-1">Category</label>
                        <select 
                            className="text-sm border-2 border-stone-400 px-2 py-1 outline-stone-500 cursor-pointer"
                            value={category}
                            onChange={(e) => setCategory(e.currentTarget.value)}
                        >
                            <option disabled>Select Category</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center mt-7">
                    <Button color="green" text="Update" onClick={editTask} />
                </div>
                
            </div>
        </div>
    )
}

export default EditTask

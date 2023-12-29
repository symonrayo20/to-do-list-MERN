import axios from "axios";
import { useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import Button from "./Button";
import { enqueueSnackbar } from "notistack";
import { TaskContext } from "../pages/Home";
import { useNavigate } from "react-router-dom";

const AddTask = ({ onClose }) => {
    const {tasks, setTasks} = useContext(TaskContext);
    const [task, setTask] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    
    const addTask = () => {
        const newtask = {task, category};
        axios.post("http://localhost:8000/tasks/create", newtask)
            .then((res) => {
                setTasks([...tasks, res.data]);
                enqueueSnackbar("New Task Added Successfully", {variant: "success"});
                navigate(`/${category.toLowerCase()}`);
                onClose();
            })
            .catch((err) => {
                enqueueSnackbar(err, {variant: "error"})
            })
    }

    return (
        <div 
            className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-60 z-50 flex justify-center "
            onClick={onClose}
        >
            <div 
                className="relative w-[600px] h-[400px] mt-16 px-5 bg-white rounded"
                onClick={(e) => e.stopPropagation()}
            >   
                <div className="">
                    <h1 className="text-3xl text-center mt-2 mb-5  font-semibold text-stone-700">Add Task</h1>
                    <MdClose 
                        className="absolute text-3xl top-2 right-2 cursor-pointer" 
                        onClick={onClose}
                    />
                </div>

                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col">
                        <label className="text-xl mb-1">Task</label>
                        <input 
                            type="text" 
                            className="p-2 border-2 border-stone-400 rounded outline-stone-500 w-full" 
                            placeholder="Enter a Task" 
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xl mb-1">Category</label>
                        <select 
                            className="border-2 border-stone-400 p-2 outline-stone-500 cursor-pointer"
                            defaultValue={"Select Category"}
                            onChange={(e) => setCategory(e.currentTarget.value)}
                        >
                            <option disabled>Select Category</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-10">
                    <Button color="gray" text="Submit" onClick={addTask} />
                </div>
                
            </div>
        </div>
    )
}

export default AddTask

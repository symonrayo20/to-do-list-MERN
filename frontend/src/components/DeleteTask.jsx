import { useContext } from "react"
import { TaskContext } from "../pages/Home"
import Button from "./Button"
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const DeleteTask = ({taskDelete, onClose}) => {
    const {tasks, setTasks} = useContext(TaskContext);
    const navigate = useNavigate();

    const onClosed =  () => {
        navigate(-1);
        onClose();
    }

    const deleteTask = () => {
        axios.delete(`/tasks/delete/${taskDelete._id}`)
            .then(() => {
                setTasks(tasks.filter(task => task._id !== taskDelete._id));
                enqueueSnackbar("Deleted Successfully", {variant: "success"});
                onClosed();
            })
            .catch((err) => {
                enqueueSnackbar(err, {variant: "error"});
            })
    }

    return (
        <div 
            className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-60 z-50 flex justify-center "
            onClick={onClosed}
        >
            <div 
                className="relative w-[500px] h-[250px] mt-16 px-5 bg-white rounded"
                onClick={(e) => e.stopPropagation()}
            >   
                <div className="">
                    <h1 className="text-2xl text-center mt-2 mb-5  font-semibold text-stone-700">Delete Task</h1>
                </div>

                <h1 className="text-sm text-center my-10">
                    Are You Sure You Want to Delete This Task?
                </h1>

                <div className="flex justify-center gap-x-4 mt-10">
                    <Button color="red" text="Yes, Delete it" onClick={deleteTask} />
                    <Button color="gray" text="Cancel" onClick={onClosed} />
                </div>
                
            </div>
        </div>
    )
}

export default DeleteTask

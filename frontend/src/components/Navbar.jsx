import { useContext, useState } from "react";
import { TaskContext } from "../pages/Home";
import { fetchTasks } from "../pages/Home";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const {tasks, setTasks} = useContext(TaskContext);

    const allTasks = async () => {
        const res = await fetchTasks();
        setTasks(res);
    }
    const workTasks = async () => {
        const res = await fetchTasks();
        setTasks(res.filter(task => task.category === "Work" && task));
        
    }
    const personalTasks = async () => {
        const res = await fetchTasks();
        setTasks(res.filter(task => task.category === "Personal" && task));
    }

    return (
        <div className="flex gap-x-5 mt-10">
            <NavLink
                to="/"
                onClick={allTasks}
                className={({ isActive }) =>
                    `py-[12px] px-4 rounded-3xl font-medium "
                    ${isActive ? "bg-[#C4C4C4]" : "bg-[#E4E4E4] hover:bg-[#D4D4D4]"}`}>
                All
            </NavLink>
            <NavLink
                to="/work"
                onClick={workTasks}
                className={({ isActive }) =>
                    `py-[12px] px-4 rounded-3xl font-medium "
                    ${isActive ? "bg-[#C4C4C4]" : "bg-[#E4E4E4] hover:bg-[#D4D4D4]"}`}>
                Work
            </NavLink>
            <NavLink
                to="/personal"
                onClick={personalTasks}
                className={({ isActive }) =>
                    `py-[12px] px-4 rounded-3xl font-medium "
                    ${isActive ? "bg-[#C4C4C4]" : "bg-[#E4E4E4] hover:bg-[#D4D4D4]"}`}>
                Personal
            </NavLink>
        </div>
    )
}

export default Navbar

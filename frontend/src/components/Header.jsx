import { useState } from "react";
import Button from "./Button"
import AddTask from "./AddTask";

const Header = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex">
            <h1 className="flex-1 text-center text-4xl font-semibold text-gray-600">To Do List</h1>
            <Button color="gray" text="Add Task" onClick={() => setShowModal(true)} />

            {showModal && <AddTask onClose={() => setShowModal(false)} />}
        </div>
    )
}

export default Header

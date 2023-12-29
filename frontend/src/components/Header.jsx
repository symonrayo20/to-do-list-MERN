import { useState } from "react";
import Button from "./Button"
import AddTask from "./AddTask";

const Header = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="relative">
            <h1 className="text-center text-4xl font-semibold text-gray-600">My Tasks</h1>
            <div className="absolute right-0 top-0">
                <Button color="gray" text="Add Task" onClick={() => setShowModal(true)} />
            </div>

            {showModal && <AddTask onClose={() => setShowModal(false)} />}
        </div>
    )
}

export default Header

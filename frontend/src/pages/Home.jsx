import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {enqueueSnackbar} from 'notistack'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Tasks from '../components/Tasks'
import PulseLoader from "react-spinners/PulseLoader"

export const TaskContext = React.createContext();

export const fetchTasks = async () => {
    const res = await fetch('/tasks');
    const data = await res.json();
    return data;
}

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect( () => {
        setLoading(true);
        axios.get("/tasks")
            .then((res) => {
                setTasks(res.data);
                setLoading(false);
            })
            .catch((err) => {
                enqueueSnackbar(err, {variant: "error"});
                setLoading(false);
            })
        // (async () => setTasks(await fetchTasks()) ) ();
    }, [])

    return (
        <div className='flex justify-center my-10'>
            <div className='w-full max-w-[1200px] mx-[100px] px-6 py-4 rounded-lg border-t-8 border-t-stone-500 bg-[#F4F4F4]'>
                <TaskContext.Provider value={{ tasks, setTasks }} >
                    <Header />
                    <Navbar />
                    {loading
                        ? 
                        <div className='flex justify-center items-center h-[300px]'>
                            <PulseLoader color={"#646464"} loading={loading} size={30}/>
                        </div>
                        : <Tasks />
                    }
                </TaskContext.Provider>
            </div>
        </div>
    )
}

export default Home

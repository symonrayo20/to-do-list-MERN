import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {enqueueSnackbar} from 'notistack'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Tasks from '../components/Tasks'

export const TaskContext = React.createContext();

export const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/tasks');
    const data = await res.json();
    return data;
}

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect( () => {
        (async () => setTasks(await fetchTasks()) ) ();
    }, [])

    return (
        
        <div className='flex justify-center my-10'>
            <div className='w-full max-w-[1200px] mx-[100px] px-6 py-4 rounded-lg border-t-8 border-t-stone-500 bg-[#F4F4F4]'>
                <TaskContext.Provider value={{ tasks, setTasks }} >
                    <Header />
                    <Navbar />
                    <Tasks />
                </TaskContext.Provider>
            </div>
        </div>
    )
}

export default Home

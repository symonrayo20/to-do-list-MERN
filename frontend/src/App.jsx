import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/work' element={<Home />} />
            <Route path='/personal' element={<Home />} />
            <Route path='/create' element={<Home />} />
            <Route path='/edit/:id' element={<Home />} />
            <Route path='/delete/:id' element={<Home />} />
            <Route path='/complete/:id' element={<Home />} />
        </Routes>
    )
}

export default App

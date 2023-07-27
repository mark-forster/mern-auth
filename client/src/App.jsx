import React from 'react'
import { Routes, Route} from 'react-router-dom';

import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';



function App() {

  return (
    <>
      <Navbar />
     <Toaster position='top-center' toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
       </>

  )
}

export default App

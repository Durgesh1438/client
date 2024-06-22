/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css'
import Login from './Login/login';
import Home from './components/home';
import { useUsername } from './globalstate/globalstate';
function App() {
  const {user,setUser}=useUsername()
  const [isLoggedIn,setisLoggedIn]=useState(()=>{
    return sessionStorage.getItem('isLoggedIn')==='true'
  })
  useEffect(()=>{
    sessionStorage.setItem('isLoggedIn',isLoggedIn)
    const email=sessionStorage.getItem('Email')
    setUser(()=>{
      return {...user,Email:email}
    })
  },[isLoggedIn])
  
  const handlelogin=()=>{
    setisLoggedIn(true)
  }
  return (
    <Router>
        <Routes>
          <Route path="/login" element={isLoggedIn?<Home />:<Login onLogin={handlelogin}/>} />
          <Route path="/home"  element={isLoggedIn?<Home />:<Login onLogin={handlelogin}/>} />
          
          <Route path="/" element={isLoggedIn?<Home />:<Login onLogin={handlelogin}/>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
  )
}

export default App;

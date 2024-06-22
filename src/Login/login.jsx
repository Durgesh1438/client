import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useUsername } from '../globalstate/globalstate';
import './../App.css'
import { useNavigate } from 'react-router-dom';
function Login({onLogin}){
    const Navigate=useNavigate()
    
    const {user,setUser}=useUsername()
    const responseSuccess = async (response) => {
        const {credential}=response;
        try {
          const res = await axios.post('http://localhost:5000/api/google-login',{
            tokenId:credential
          });
          const {token,username,Email}=res.data;
          console.log(res.data)
          sessionStorage.setItem('access_token',token)
          sessionStorage.setItem('Email',Email)
          sessionStorage.setItem('isLoggedIn',true)
          setUser(res.data);
          onLogin()
          Navigate('/home')
          
        } catch (error) {
          console.error('Authentication Error:', error);
        }
        // Handle the response, send it to backend, etc.
      };
      
      const responseFailure=(response)=>{
        console.log("failed")
      }
    return (
        <div className="login-section">
          <h2>Google SignIn</h2>
          <div className='google-login-button'>
          <GoogleLogin
            clientId="1059114201146-sdlckjt0gmthfjlt3ncvcphdmu5ohn4g.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccess}
            onError={responseFailure}
          />
          </div>
        </div>
    )
}

export default Login;
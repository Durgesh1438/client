import React from 'react';
import ReactDOM from 'react-dom/client';
import { UsernameProvider } from './globalstate/globalstate';
import App from './App';

import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
  <UsernameProvider>
  <GoogleOAuthProvider clientId='1059114201146-sdlckjt0gmthfjlt3ncvcphdmu5ohn4g.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>
  </UsernameProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


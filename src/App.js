import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* CSS Imports */
import './App.css';

/* Page Imports */
import Home from 'pages/Home';
import Login from 'pages/Login';
import LoginTenant from 'pages/LoginTenant';
import LoginRenter from 'pages/LoginRenter';
import RegisterRenter from 'pages/RegisterRenter';
import ResetPasswordEmail from 'pages/ResetPasswordEmail';
import ResetPasswordOTP from 'pages/ResetPasswordOTP';
import ResetPasswordSubmit from 'pages/ResetPasswordSubmit';
import ResetPasswordSuccess from 'pages/ResetPasswordSuccess';

function App() {
    return (
        <Router>
            <main className='app'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/tenant/login' element={<LoginTenant />} />
                    <Route path='/renter/login' element={<LoginRenter />} />
                    <Route path='/renter/register' element={<RegisterRenter />} />
                    {/* <Route path='/register/success' element={<RegisterSuccess />} /> */}
                    <Route path='/resetpassword' element={<ResetPasswordEmail />} />
                    <Route path='/resetpassword/:id/otp' element={<ResetPasswordOTP />} />
                    <Route path='/resetpassword/:id/submit' element={<ResetPasswordSubmit />} />
                    <Route path='/resetpassword/:id/success' element={<ResetPasswordSuccess />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
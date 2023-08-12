import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* CSS Imports */
import './App.css';

/*** Page Imports ***/
import Home from 'pages/Home';
import LoginTenant from 'pages/Auth/LoginTenant';
import RegisterRenter from 'pages/Auth/RegisterRenter';
import ResetPasswordEmail from 'pages/Auth/ResetPasswordEmail';
import ResetPasswordOTP from 'pages/Auth/ResetPasswordOTP';
import ResetPasswordSubmit from 'pages/Auth/ResetPasswordSubmit';
import ResetPasswordSuccess from 'pages/Auth/ResetPasswordSuccess';

// import Listing from 'pages/Listing';
// import Layout01 from 'layouts/Layout01';

/* Authentication */
import Landing from 'pages/Landing';
import UserTypeSelect from 'pages/Auth/UserTypeSelect';
import Login from 'pages/Auth/Login';

import Detail from 'pages/Detail';
import Profile from 'pages/Profile';
import Forms from 'pages/Forms';
import Search from 'pages/Search';
import Favorite from 'pages/Favorite';
import ErrorPage from 'pages/Error/NotFound404';
import ListingUpsert from 'pages/ListingUpSert';

function App() {
    return (
        <Router>
            <main className='app'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    {/* <Route path='/login' element={<Login />} />
                    <Route path='/tenant/login' element={<LoginTenant />} />
                    <Route path='/renter/login' element={<LoginRenter />} />
                    <Route path='/renter/register' element={<RegisterRenter />} />
                    <Route path='/register/success' element={<RegisterSuccess />} />
                    <Route path='/resetpassword' element={<ResetPasswordEmail />} />
                    <Route path='/resetpassword/:id/otp' element={<ResetPasswordOTP />} />
                    <Route path='/resetpassword/:id/submit' element={<ResetPasswordSubmit />} />
                    <Route path='/resetpassword/:id/success' element={<ResetPasswordSuccess />} /> */}
                    
                    {/* SOMIN ROUTES --- DELETE */}
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/detail' element={<Detail />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/forms' element={<Forms />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/favorite' element={<Favorite />} />
                    <Route path='/404' element={<ErrorPage />} />
                    <Route path='/upsert' element={<ListingUpsert />} />

                    {/* Authentication */}
                    <Route path='/login' element={<UserTypeSelect />} />
                    <Route path='/register' element={<UserTypeSelect />} />
                    <Route path='/login/:user' element={<Login />} />
                    <Route path='/resetpassword/:user' element={<ResetPasswordEmail />} />
                    <Route path='/resetpassword/:user/:id/otp' element={<ResetPasswordOTP />} />
                    <Route path='/resetpassword/:user/:id/submit' element={<ResetPasswordSubmit />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
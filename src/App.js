import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* CSS Imports */
import './App.css';

/* Service Imports */
import firebase from 'services/firebase/firebase';

/*** Page Imports ***/
import Home from 'pages/Home';
import LoginTenant from 'pages/Auth/LoginTenant';
import Login from 'pages/Auth/Login';
import RegisterRenter from 'pages/Auth/RegisterRenter';
import ResetPasswordEmail from 'pages/Auth/ResetPasswordEmail';
import ResetPasswordOTP from 'pages/Auth/ResetPasswordOTP';
import ResetPasswordSubmit from 'pages/Auth/ResetPasswordSubmit';
import ResetPasswordSuccess from 'pages/Auth/ResetPasswordSuccess';

import Listing from 'pages/Listing';
import Layout01 from 'layouts/Layout01';

import Landing from 'pages/Landing';
import Login2 from 'pages/Login';

/* Listing */
import ListingUpsert from 'pages/Listing/ListingUpsert';
import ListingDetail from 'pages/Listing/ListingDetail';

/* Error Pages */
import NotFound404 from 'pages/Error/NotFound404';

function App() {

    /* Program Initialization */
    useEffect(() => {

    }, []);

    return (
        <Router>
            <main className='app'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/tenant/login' element={<LoginTenant />} />
                    <Route path='/register/renter' element={<RegisterRenter />} />
                    {/* <Route path='/register/success' element={<RegisterSuccess />} /> */}
                    <Route path='/resetpassword/:id/success' element={<ResetPasswordSuccess />} />

                    {/* SOMIN ROUTES --- DELETE */}
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/login' element={<Login2 />} />
                    <Route path='/renter/listing/:upsert' element={<ListingUpsert />} />

                    {/* Listing */}
                    <Route path='/listing/:id' element={<ListingDetail />} />

                    <Route path='resetpassword/:id/success' element={<ResetPasswordSuccess />} />

                    <Route path='/login/:user' element={<Login />} />
                    <Route path='/resetpassword/:user' element={<ResetPasswordEmail />} />
                    <Route path='/resetpassword/:user/:id/otp' element={<ResetPasswordOTP />} />
                    <Route path='/resetpassword/:user/:id/submit' element={<ResetPasswordSubmit />} />

                    {/* Authorization Roles */}
                    {/* <Route path="/dashboard"
                        render={() =>
                            isAuthenticated ? <Dashboard /> : <Redirect to="/" />
                        }
                    /> */}

                    {/* <Route element={<Layout01 />}>
                        <Route path='/listing' element={<Listing />} />
                    </Route> */}


                    <Route path='*' element={<NotFound404 />} />

                </Routes>
            </main>
        </Router>
    );
}

export default App;
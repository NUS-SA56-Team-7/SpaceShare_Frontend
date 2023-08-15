import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* CSS Imports */
import './App.css';

/*** Page Imports ***/
import Register from 'pages/Auth/Register';
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

/* Listing */
import ListingUpsert from 'pages/Listing/ListingUpsert';
import ListingDetail from 'pages/Listing/ListingDetail';

/* Renter */
import RenterProperties from 'pages/Renter/RenterProperties';

/* Tenant */
import Favorites from 'pages/Tenant/Favorites';

/* Error Pages */
import NotFound404 from 'pages/Error/NotFound404';

import Profile from 'pages/Profile';
import Forms from 'pages/Forms';
import Search from 'pages/Search';

function App() {

    /* Program Initialization */
    useEffect(() => {

    }, []);

    return (
        <Router>
            <main className='app'>
                <Routes>
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
                    <Route path='/renter/register' element={<Register />} />
                    {/* <Route path='/register/success' element={<RegisterSuccess />} /> */}

                    {/* Listing */}
                    <Route path='/' element={<Landing />} />
                    <Route path='/listing/:id' element={<ListingDetail />} />
                    <Route path='/renter/listing/:upsert' element={<ListingUpsert />} />

                    <Route path='resetpassword/:id/success' element={<ResetPasswordSuccess />} />

                    {/* Renter */}
                    <Route path='/renter/properties' element={<RenterProperties />} />

                    {/* Tenant */}
                    <Route path='/tenant/favorites' element={<Favorites />} />

                    {/* Authentication */}
                    <Route path='/login' element={<UserTypeSelect />} />
                    <Route path='/register' element={<UserTypeSelect />} />
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


                    {/* Default Routes */}
                    <Route path='*' element={<NotFound404 />} />

                    <Route path='/profile' element={<Profile />} />
                    <Route path='/forms' element={<Forms />} />
                    <Route path='/search' element={<Search />} />

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
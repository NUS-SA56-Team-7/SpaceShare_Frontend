import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* CSS Imports */
// import 'styles/pages/LoginRenter.css';
// import 'styles/components/form/Form.css';
// import 'styles/components/form/FormLink.css';
// import 'styles/components/ui/FormHeader.css';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Component Imports */
import LoginLayout from 'components/layout/LoginLayout';
import FormInputText from 'components/form/FormInputText';
import FormInputPassword from 'components/form/FormInputPassword';
import FormError from 'components/form/FormError';
import ButtonFilled from 'components/ui/ButtonFilled';

/* Context Imports */
import EmailContext from 'contexts/EmailContext';
import AuthContext from 'contexts/AuthContext';
import Login from './Login';

// /* Firebase Imports */
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { firebaseAuth, firebaseAuthProvider } from 'services/firebase/auth/firebaseAuth';

// /* Asset Imports */
// import Google from 'assets/logos/GOOGLE.png';
// import Facebook from 'assets/logos/FACEBOOK.png';

function LoginRenter() {

    /* Initialization */
    const initData = { account: '', password: '' };

    /* useNavitgate */
    const navigate = useNavigate();

    /* useLocation */
    const location = useLocation();

    /* useContext */
    const { email: ctxEmail } = useContext(EmailContext);
    const { setAuth } = useContext(AuthContext);

    /* useState */
    const [formOptions, setFormOptions] = useState(false);

    const [data, setData] = useState(initData);
    const [error, setError] = useState({});
    const [result, setResult] = useState([]);

    /* Functions */
    // const signInWithGoogle = () => {
    //     signInWithPopup(firebaseAuth, firebaseAuthProvider.google)
    //         .then(result => {
    //             // Generates Google Access Token which can be used to access Google API
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;

    //             // Signed In User Info
    //             const user = result.user;
    //             setResult([credential, token, user]);

    //             navigate('/home');
    //         }).catch((err) => {
    //             const errCode = err.code;
    //             const errMsg = err.message;
    //             const errEmail = err.customData.email;
    //             const errCredentialType = GoogleAuthProvider.credentialFromError(err);
    //             console.log([errCode, errMsg, errEmail, errCredentialType]);
    //         })
    // };

    const signIn = () => {
        Axios.post('accounts/login', data, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    setAuth(res.data.message);
                    sessionStorage.setItem('auth', JSON.stringify(res.data.message));
                    navigate('/home');
                }
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setError({ account: err.response.data.message });
                }
                else if (err.response.status === 401) {
                    setError({ password: err.response.data.message });
                }
            })
    };

    /* useEffect */
    useEffect(() => {
        if (location?.state?.fromRegister) {
            setData({ ...data, account: ctxEmail['register'] });
        }
        else {
            setData({ ...data, account: ctxEmail['reset'] });
        }
    }, []);

    useEffect(() => {
        if (result[2] !== undefined) {
            console.log(new Date(result[2].metadata.createdAt * 1000).toISOString());
            let user = result[2];
            sessionStorage.setItem('auth', JSON.stringify({
                avatar: user['photoURL'],
                username: user['displayName'],
                email: user['email'],
                createdAt: user.metadata.creationTime,
                lastLoginAt: user.metadata.lastSignInTime
            }));
        }
    }, [result]);

    const bgImgUrl = "https://images.unsplash.com/photo-1675449215007-def921b7c0ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80";

    return (
        <main className='login'>
            <LoginLayout>
                {/* Main Content */}
                <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                    <div className="flex flex-col p-6 md:sticky md:top-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 w-96">
                        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-auto w-40"
                                src="/spaceshare_logo.svg"
                                alt="SpaceShare"
                            />
                            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="">
                                <FormInputText
                                    label='Enter Username or Email Address'
                                    autoFocus
                                    value={data['account'] ? data['account'] : ''}
                                    onChange={(e) => setData({ ...data, account: (e.target.value).toLowerCase() })}
                                    onKeyPress={(e) => e.key === 'Enter' && signIn()}
                                />
                                <FormError nbsp>{'account' in error && error['account']}</FormError>
                                <FormInputPassword
                                    label='Enter Password'
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    onKeyPress={(e) => e.key === 'Enter' && signIn()}
                                />
                                <FormError nbsp>{'password' in error && error['password']}</FormError>
                                <div className="forgot_password text-right text-sm mb-2">
                                    <a
                                        href="#"
                                        className="txt-primary hover:txt-primary-hover"
                                        onClick={() => navigate('/resetpassword')}>
                                        Forgot Password?
                                    </a>
                                </div>
                                <ButtonFilled
                                    onClick={() => signIn()}>
                                    Login
                                </ButtonFilled>
                            </div>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Don't have an account?{' '}
                                <a
                                    href="#"
                                    className="font-semibold leading-6 txt-primary hover:txt-primary"
                                    onClick={() => navigate('/register')}>
                                    Register
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className='form' style={{ height: '550px' }}>
                <div className='form_container'>
                    <div className='form_header'>
                        <h3>Stephen Phyo's</h3>
                        <h2>Authentication</h2>
                    </div>
                    <FormInputText
                        label='Enter Username or Email Address'
                        autoFocus
                        value={data['account'] ? data['account'] : ''}
                        onChange={(e) => setData({ ...data, account: (e.target.value).toLowerCase() })}
                        onKeyPress={(e) => e.key === 'Enter' && signIn()}
                    />
                    <FormError nbsp>{'account' in error && error['account']}</FormError>
                    <FormInputPassword
                        label='Enter Password'
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && signIn()}
                    />
                    <FormError nbsp>{'password' in error && error['password']}</FormError>
                    <div className='forgot_password'>
                        <span className='form_link'
                            onClick={() => navigate('/resetpassword')}>
                            Forgot Password?
                        </span>
                    </div>
                    <ButtonFilled
                        onClick={() => signIn()}>
                        Login
                    </ButtonFilled>
                    <div className='login_form_footer'>
                        <span className='label'>Don't have an account?</span>
                        <span className='form_link' onClick={() => navigate('/register')}>Register</span>
                    </div> */}

                {/* <section className={`login_form_options ${!formOptions && 'close'}`}>
                        <div className='login_form_options_button'
                            onClick={() => setFormOptions(!formOptions)}>
                            <div className='login_form_options_button_inner'>
                                OR
                            </div>
                        </div>
                        <div className='login_form_options_container'>
                            <div className='option'>
                                <div className='option_inner google'
                                    onClick={() => signInWithGoogle()}>
                                    <img className='option_logo' src={Google} alt='Google' />
                                    <div className='option_text'>Login with Google</div>
                                </div>
                            </div>
                            <div className='option'>
                                <div className='option_inner facebook'>
                                    <img className='option_logo' src={Facebook} alt='Facebook' />
                                    <div className='option_text'>Login with Facebook</div>
                                </div>
                            </div>
                        </div>
                    </section> */}
                {/* </div>
            </div> */}
            </LoginLayout>
        </main>
    );
}

export default LoginRenter;
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/* CSS Imports */
import 'styles/pages/ResetPasswordOTP.css';
import 'styles/components/form/Form.css';
import 'styles/components/form/FormLink.css';
import 'styles/components/ui/FormHeader.css';
import 'styles/components/ui/Button.css';
import 'styles/components/ui/Text.css';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Context Imports */
import ResetPasswordContext from 'contexts/ResetPasswordContext';

/* Component Imports */
import FormError from 'components/form/FormError';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';

/* Hook Imports */
import useCountDownTimer from 'hooks/useCountDownTimer';

/* Function Imports */
import convertTimeString from 'functions/convertTimeString';

function ResetPasswordOTP() {

    /* Initialization */
    const OTP_MAX_LENGTH = 6;
    const OTP_TTL = 300;

    /* useNavigate */
    const navigate = useNavigate();

    /* useParams */
    const params = useParams();

    /* useContext */
    const { resetAccount: ctxResetAccount, recaptchaToken } = useContext(ResetPasswordContext);

    /* useState */
    const [render, setRender] = useState(false);
    const [OTP, setOTP] = useState(' '.repeat(6));
    const [error, setError] = useState('');

    /* useRef */
    const inputRef = useRef([]);

    /* Custom Hooks */
    const [countdown, actionCountDown] = useCountDownTimer(OTP_TTL);

    /* Functions */
    const handleInput = (e, index) => {
        if (e.target.value) {
            // Input is a Number
            if (/^\d+$/.test(e.target.value)) {
                setOTP(OTP.substring(0, index) + e.target.value + OTP.substring(index + 1));
                // Focus to Next OTP Input
                if (index !== OTP_MAX_LENGTH - 1) {
                    inputRef.current[index + 1].focus();
                }
            }
            // Input is Not a Number
            else {
                setOTP(OTP.substring(0, index) + ' ' + OTP.substring(index + 1));
                // setTimeout() buys some time until the DOM elements are loaded, even if timeout is set to 0,
                // and the callback function inside setTimeout() will be queued up
                setTimeout(() => inputRef.current[index].select(), 0);
            }
        };
    };

    const handleKeyEvents = (e, index) => {
        if (e.key === 'Backspace' && index !== -1) {
            setOTP(OTP.substring(0, index) + ' ' + OTP.substring(index + 1));
            if (index !== 0) {
                inputRef.current[index - 1].focus();
                setTimeout(() => inputRef.current[index - 1].select(), 0);
            } else {
                inputRef.current[index].focus();
                setTimeout(() => inputRef.current[index].select(), 0);
            }
        }
        else if (e.key === 'ArrowLeft' && index !== 0) {
            inputRef.current[index - 1].focus();
            setTimeout(() => inputRef.current[index - 1].select(), 0);
        }
        else if (e.key === 'ArrowRight' && index < OTP_MAX_LENGTH - 1) {
            inputRef.current[index + 1].focus();
            setTimeout(() => inputRef.current[index + 1].select(), 0);
        }
        else if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && index === 0) {
            setTimeout(() => inputRef.current[0].select(), 0);
        }
        else if (e.key === 'ArrowRight' && index === OTP_MAX_LENGTH - 1) {
            setTimeout(() => inputRef.current[OTP_MAX_LENGTH - 1].select(), 0);
        }
    };

    const sendOTP = () => {
        actionCountDown('RESET');
        Axios.get(`/api/auth/resetpassword/${params.user}/${params.id}/otp`)
            .then(res => {
                if (res.status === 200) {
                    actionCountDown('START');
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const handleSubmit = () => {
        if (!OTP.includes(' ')) {
            Axios.post(`/api/auth/resetpassword/${params.user}/${params.id}/otp/verify`,
                { otp: OTP },
                { headers: { 'Content-Type': 'application/json' } }
            )
                .then(res => {
                    if (res.status === 200) {
                        console.log('OK');
                    }
                    navigate(`/resetpassword/${params.user}/${params.id}/submit`, { state: res.data.data });
                })
                .catch(err => {
                    if (err?.response?.status === 403) { setError('OTP Verification Failed') };
                })
        }
    };

    /* useEffect */
    useEffect(() => {
        if (!ctxResetAccount.id) {
            navigate(`/resetpassword/${params.user}`);
        } else {
            setRender(true);
            sendOTP();
        }
    }, []);

    useEffect(() => {
        render && inputRef.current[0].focus();
    }, [render]);

    useEffect(() => {
        console.log(OTP);
    }, [OTP]);

    return (
        <main className='resetpwd_otp' >
            <div className='form' style={{ width: '400px', height: '550px' }}>
                <div className='form_container'>
                    <div className='form_header'>
                        <h2>Verify it's you</h2>
                    </div>
                    <div className='form_text'>
                        <p>
                            Email with a 6-digit OTP for password reset has been sent to your email address:
                        </p>
                        <p id='email'>{ctxResetAccount.email}</p>
                        <p>Please check your email and enter OTP to reset your password.</p>
                    </div>
                    <div className='otp_input_container'>
                        {Array(OTP_MAX_LENGTH).fill().map((_, index) => (
                            <input className='otp_input' key={index}
                                type='text'
                                name='otp'
                                ref={e => inputRef.current[index] = e}
                                required='required'
                                value={OTP[index]}
                                inputMode='numeric'
                                autoComplete='one-time-code'
                                maxLength='1'
                                onFocus={(e) => e.target.select()}
                                onInput={(e) => handleInput(e, index)}
                                onChange={() => setError('')}
                                onKeyDown={(e) => handleKeyEvents(e, index)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                            />
                        ))}
                    </div>
                    <FormError nbsp>{error}</FormError>
                    <div className='forgotpwdotp_resendotp'>
                        <div className='form_link'
                            onClick={() => sendOTP()}>
                            Resend OTP
                        </div>
                        <div className='form_link' id='countdown'>
                            {`${convertTimeString(countdown).mm}:${convertTimeString(countdown).ss}`}
                        </div>
                    </div>
                    <ButtonFilled
                        onClick={() => handleSubmit()}>
                        Continue
                    </ButtonFilled>
                    <ButtonOutlined
                        onClick={() => navigate('/resetpassword')}>
                        Back
                    </ButtonOutlined>
                </div>
            </div>
        </main>
    );
};

export default ResetPasswordOTP;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import FormInputText from 'components/form/FormInputText';
import FormInputPassword from 'components/form/FormInputPassword';
import FormInputDate from 'components/form/FormInputDate';
import FormError from 'components/form/FormError';

/* Util Imports */
import Axios from 'utils/Axios';

/* Context Imports */
import EmailContext from 'contexts/EmailContext';

/* Function Imports */
import validateEmail from 'functions/validateEmail';
import validatePassword from 'functions/validatePassword';

function RegisterRenter() {

    /* Initialization */
    const initData = {
        email: '', password: '', cfmPassword: '', firstName: '', lastName: '',
        identificationNumber: '', address: '', phone: '', dateOfBirth: ''
    };
    const err = {};

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [data, setData] = useState(initData);
    const [error, setError] = useState({});

    /* useContext */
    const { setEmail: setCtxEmail } = useContext(EmailContext);

    /* Functions */
    const checkEmail = (email) => {
        if (email.length === 0) {
            err['email'] = 'Email address must not be empty';
        }
        else if (!validateEmail(email)) {
            err['email'] = 'Enter a valid email address';
        }
    };

    const checkPassword = (password, cfmPassword) => {
        if (password.length === 0) {
            err['password'] = 'Password must not be empty';
        }
        else if (password.length < 8 || password.length > 24) {
            err['password'] = 'Password must be 8-24 characters';
        }
        else if (!validatePassword(data['password'])) {
            err['password'] = 'Password must contain at least one uppercase, lowercase, number and special character';
        }
        else if (password != cfmPassword) {
            err['cfmPassword'] = 'Passwords do not match';
        }
    };

    const checkNames = (firstName, lastName) => {
        if (firstName.length === 0) {
            err['firstName'] = 'First Name must not be empty';
        }
        else if (firstName.length < 2 || firstName.length > 20) {
            err['firstName'] = 'First Name must be 2-20 characters';
        }

        if (lastName.length === 0) {
            err['lastName'] = 'Last Name must not be empty';
        }
        else if (lastName.length < 2 || lastName.length > 20) {
            err['lastName'] = 'Last Name must be 2-20 characters';
        }
    };

    const checkIdentification = (identification) => {
        if (identification.length === 0) {
            err['identificationNumber'] = 'Identification must not be empty';
        }
    };

    const checkData = () => {
        checkEmail(data['email']);
        checkPassword(data['password'], data['cfmPassword']);
        checkNames(data['firstName'], data['lastName']);
        checkIdentification(data['identificationNumber']);

        if (Object.keys(err).length !== 0) {
            setError(err);
            return false;
        } else {
            setError({});
            delete data['cfmPassword'];
            return true;
        }
    }

    const register = () => {
        if (checkData()) {
            Axios.post('/api/renter/register', data, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    if (res.status === 201) {
                        setCtxEmail({ register: data['email'] });
                        navigate('/renter/login');
                    }
                })
                .catch(err => {
                    // alert(`${err.response.status}: ${err.response.data.message}`);
                    alert(err.message);
                })
        }
    };

    return (
        <main className='register_finder'>
            <FormInputText
                label='Enter Email Address'
                autoFocus
                value={data['email'] ? data['email'] : ''}
                onChange={(e) => setData({ ...data, email: (e.target.value).toLowerCase() })}
                onKeyPress={(e) => e.key === 'Enter' && register()}
            />
            <FormError nbsp>{'email' in error && error['email']}</FormError>

            <FormInputPassword
                label='Enter Password'
                value={data['password']}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && register()}
            />
            <FormError nbsp>{'password' in error && error['password']}</FormError>

            <FormInputPassword
                label='Confirm Password'
                value={data['cfmPassword']}
                onChange={(e) => setData({ ...data, cfmPassword: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && register()}
            />
            <FormError nbsp>{'cfmPassword' in error && error['cfmPassword']}</FormError>

            <FormInputText
                label='Enter Identification Number'
                value={data['identificationNumber']}
                onChange={(e) => setData({ ...data, identification: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && register()}
            />
            <FormError nbsp>{'identificationNumber' in error && error['identificationNumber']}</FormError>

            <FormInputText
                label='Enter First Name'
                value={data['firstName']}
                onChange={(e) => setData({ ...data, firstName: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && register()}
            />
            <FormError nbsp>{'firstName' in error && error['firstName']}</FormError>

            <FormInputText
                label='Enter Last Name'
                value={data['lastName']}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && register()}
            />
            <FormError nbsp>{'lastName' in error && error['lastName']}</FormError>

            <FormInputText
                label='Enter Address'
                value={data['address'] ? data['address'] : ''}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && register()}
            />
            <FormError nbsp>{'address' in error && error['address']}</FormError>

            <FormInputText
                label='Enter Phone Number'
                value={data['phone'] ? data['phone'] : ''}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && register()}
            />
            <FormError nbsp>{'phone' in error && error['phone']}</FormError>

            <FormInputDate
                label='Choose your Birthday'
                onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })} />
            <FormError nbsp></FormError>
        </main>
    );
}

export default RegisterRenter;
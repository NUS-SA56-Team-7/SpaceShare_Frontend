import React from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';

function Login() {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div>
            <ButtonFilled
                onClick={() => navigate('/')}>
                Are you a Property Finder?
            </ButtonFilled>
            <ButtonFilled
                onClick={() => navigate('/renter/login')}>
                Are you a Property Renter?
            </ButtonFilled>
        </div>
    );
}

export default Login;
import React from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import FormLink from 'components/form/FormLink';

function LoginTenant() {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div>
            <h1>Property Finder Login</h1>
            <FormLink
                onClick={() => navigate('/register/tenant')}>
                Register an account
            </FormLink>
        </div>
    );
}

export default LoginTenant;
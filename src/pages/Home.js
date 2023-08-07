import React from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';

function Home() {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div>
            <ButtonFilled
                onClick={() => navigate('/login/renter')}>
                Are you a Renter?
            </ButtonFilled>
            <ButtonFilled
                onClick={() => navigate('/login/tenant')}>
                Are you a Tenant?
            </ButtonFilled>
        </div>
    );
}

export default Home;
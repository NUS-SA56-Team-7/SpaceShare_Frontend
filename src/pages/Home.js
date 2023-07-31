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
                onClick={() => navigate('/login')}>Login/Sign Up</ButtonFilled>
        </div>
    );
}

export default Home;
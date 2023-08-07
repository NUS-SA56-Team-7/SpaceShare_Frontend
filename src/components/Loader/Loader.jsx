import React from 'react';

/* CSS Import */
import './Loader.css';

/* MUI Import */
import { CircularProgress } from '@mui/material';

function Loader(props) {
    return (
        <div className={`loading-page`}>
            <CircularProgress />
        </div>
    );
}

export default Loader;
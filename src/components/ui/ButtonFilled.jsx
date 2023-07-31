import React from 'react';

/* CSS Imports */
import 'styles/components/ui/Button.css';

function ButtonFilled(props) {
    return (
        <div className='button filled'
            {...props}>
            {props.children}
        </div>
    );
}

export default ButtonFilled;
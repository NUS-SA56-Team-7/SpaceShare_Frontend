import React from 'react';

/* CSS Imports */
import 'styles/components/ui/Button.css';

function ButtonOutlined(props) {
    return (
        <div className='button outlined'
            {...props}>
            {props.children}
        </div>
    );
}

export default ButtonOutlined;
import React, { forwardRef } from 'react';

const FormInputNumber = forwardRef((props, ref) => {
    return (
        <div
            className='form-group'>
            <label>{props.label}</label>
            <input
                type='number'
                ref={ref}
                {...props} />
            <hr />
        </div>
    );
});

export default FormInputNumber;
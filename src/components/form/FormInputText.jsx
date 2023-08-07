import React, { forwardRef } from 'react';

const FormInputText = forwardRef((props, ref) => {
    return (
        <div
            className='form_group'>
            <label>{props.label}</label>
            <input
                type='text'
                required='required'
                ref={ref}
                {...props} />
            <hr />
        </div>
    );
});

export default FormInputText;
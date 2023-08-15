import React, { forwardRef } from 'react';

/* CSS Imports */
// import 'styles/components/form/FormInputDate.css';

const FormInputDate = forwardRef((props, ref) => {
    return (
        <div
            className='form_input_date w-full content-none'>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {props.label}
            </label>
            <div className='relative'>
                <input
                    type='date'
                    required='required'
                    ref={ref}
                    {...props}
                    className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"/>
            </div>
        </div>
    );
});

export default FormInputDate;
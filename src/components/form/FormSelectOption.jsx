import React from 'react';

const FormSelectOption = ({ options, selected, setSelected }) => {
    if (!options) {
        throw new Error('Select Options must be specified');
    }
    return (
        <select value={selected} onChange={setSelected} >
            <option value=''>
                {Object.keys(options).includes('default') ? options['default'] : 'Choose an Option'}
            </option>
            {
                Object.keys(options).map((key) => {
                    if (key !== 'default') {
                        return (
                            <option key={options[key]} value={options[key]}>
                                {key}
                            </option>
                        );
                    }
                })
            }
        </select >
    );
};

export default FormSelectOption;
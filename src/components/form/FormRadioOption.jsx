import React from 'react';

const FormRadio = ({ name, options, selected, setSelected }) => {
    if (!name) {
        throw new Error('Radio Fieldset Name must be specified');
    }
    if (!options) {
        throw new Error('Radio Fieldset Options must be specified');
    }
    return (
        <fieldset>
            <legend>{name}</legend>
            {Object.keys(options).map((key) => (
                <label key={key}>
                    <input
                        type='radio'
                        name={name}
                        value={options[key]}
                        checked={selected === options[key]}
                        onChange={setSelected}
                    />
                    {key}
                </label>
            ))}
        </fieldset>
    );
}

export default FormRadio;
import React from 'react';

const InputField = ({ label, text, name, onChange, defaultValue }) => {
    return(
        <div>                
            <label className="upload-label">{text}</label>
            <input
                className="upload-input"
                label={label}
                name={name}
                onChange={onChange}
                defaultValue={defaultValue ? defaultValue : ""}
            />
        </div>
    )
}

export default InputField
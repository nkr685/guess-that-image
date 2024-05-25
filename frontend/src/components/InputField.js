import "../css/components/InputField.css"

const InputField = ({ label, text, name, onChange, defaultValue, error, errorList }) => {
    return(
        <div style={{display: 'inline'}}>                
            <label className="account-label">{text}<span>{error ? " " : ""}</span>
            </label>
            <input
                className="account-input"
                label={label}
                name={name}
                onChange={onChange}
                defaultValue={defaultValue ? defaultValue : ""}
                style={ errorList.includes(name) ? {borderColor: 'red'} : null}
            />
        </div>
    )
}

export default InputField
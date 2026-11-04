import Icon from './Icon.jsx'

function DropDown({ label, register, error, options, placeholder = 'Select City', icon }) {
    const select = (
        <select {...register} className="form-input">
            {placeholder !== null && <option value="">{placeholder}</option>}

            {options.map((option) => {
                const value = typeof option === 'object' ? option.value : option
                const text = typeof option === 'object' ? option.label : option

                return (
                    <option key={value} value={value}>
                        {text}
                    </option>
                )
            })}
        </select>
    )

    return (
        <div className="input-group">
            <label htmlFor={register.id}>{label}</label>
            {icon ? (
                <div className="field-control">
                    <Icon name={icon} />
                    {select}
                </div>
            ) : (
                select
            )}
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default DropDown

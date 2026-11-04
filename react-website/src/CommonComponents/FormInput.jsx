import Icon from './Icon.jsx'

function FormInput({ label, type, placeholder, error, register, icon }) {
    const input = (
        <input
            {...register}
            type={type}
            placeholder={placeholder}
            className="form-input"
            aria-invalid={Boolean(error)}
        />
    )

    return (
        <div className="input-group">
            <label htmlFor={register.id}>{label}</label>
            {icon ? (
                <div className="field-control">
                    <Icon name={icon} />
                    {input}
                </div>
            ) : (
                input
            )}
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default FormInput

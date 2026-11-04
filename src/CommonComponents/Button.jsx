function Button({ type = 'button', children, onClick, disabled = false, className = '' }) {
  return (
    <button
      className={`form-button ${className}`.trim()}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button

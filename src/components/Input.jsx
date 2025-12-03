function Input({
  type = "text",
  value,
  onChange,
  children,
  name,
  warningText,
  required = false,
}) {
  return (
    <div className="input-box-container">
      <div className="input-box">
        <input
          className={`input-field ${warningText ? "error" : ""}`}
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
        />
        <label htmlFor={name}>{children}</label>
      </div>
      {warningText && <p className="form-warning-text"> {warningText}</p>}
    </div>
  );
}

export default Input;

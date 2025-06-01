import formStyles from "../styles/formStyles";

const InputField = ({ label, type = "text", placeholder, icon, id,value,onChange }) => (
  <div className="mb-4">
    {label && (
      <label className={formStyles.label}>
        {icon && <span className="mr-2">{icon}</span>} {label}
      </label>
    )}
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={formStyles.input}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
import formStyles from "../styles/formStyles";

const CheckboxWithLabel = ({ label }) => (
  <label className={formStyles.checkboxLabel}>
    <input type="checkbox" className="mr-2" />
    {label}
  </label>
);

export default CheckboxWithLabel;

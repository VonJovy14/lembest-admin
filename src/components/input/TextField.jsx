import "./textfield.scss";

const TextField = ({ type, label, value, onChange, disabled }) => {
  return (
    <div className="text-field-container">
      <div className="text-field-wrapper">
        <input
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e)}
          autoComplete="on"
          name={label.split(" ").join("_").toLowerCase()}
          required
          min="0"
        />

        <div
          className={
            "text-field-placeholder-container-" +
            (value === "" ? "inactive" : "active") +
            " " +
            (label === "" ? "no-label" : "with-label")
          }
        >
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

const NumberField = ({
  type,
  label,
  unit,
  value,
  onChange,
  disabled,
  onBlur,
}) => {
  return (
    <div className="text-field-container">
      <div className="text-field-wrapper with-peso">
        <span className="peso-symbol">{unit ? unit : "₱"}</span>

        <input
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur && onBlur(e)}
          autoComplete="on"
          name={label.split(" ").join("_").toLowerCase()}
          required
          min="0"
          className="text-input"
        />

        <div
          className={
            "text-field-placeholder-container-" +
            (value === "" ? "inactive" : "active") +
            " " +
            (label === "" ? "no-label" : "with-label")
          }
        >
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

const TextArea = ({ label, value, rows, onChange }) => {
  return (
    <div className="text-area-container">
      <div className="text-area-wrapper">
        <textarea
          value={value}
          onChange={(e) => onChange(e)}
          name={label.split(" ").join("_").toLowerCase()}
          rows={rows}
        />

        <div
          className={
            "text-area-placeholder-container-" +
            (value === "" ? "inactive" : "active")
          }
        >
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

export { TextField, TextArea, NumberField };

import { useEffect, useRef } from "react";
import "./select.scss";

const Select = ({ label, data, value, disabled, onSelectChange }) => {
  const hasSetDefault = useRef(false);

  const defaultValue = data[0]?.id ?? "";

  // Set default only once when there's no value
  useEffect(() => {
    if (!value && defaultValue && !hasSetDefault.current) {
      hasSetDefault.current = true;

      const fakeEvent = {
        target: {
          name: label.split(" ").join("_").toLowerCase(),
          value: defaultValue,
        },
      };
      onSelectChange(fakeEvent);
    }
  }, [value, defaultValue, label, onSelectChange]);

  return (
    <div className="select-container">
      <select
        name={label.split(" ").join("_").toLowerCase()}
        onChange={onSelectChange}
        disabled={disabled}
        value={value}
      >
        {data.map((item, index) => (
          <option value={item.id} key={index}>
            {item.text.toUpperCase()}
          </option>
        ))}
      </select>

      <div className={label === "" ? null : "select-placeholder-container"}>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default Select;

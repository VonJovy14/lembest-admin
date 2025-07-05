import "./button.scss";

const SubmitButton = ({ text }) => {
  return (
    <button type="submit" className="block-button-container button-container">
      {text.toUpperCase()}
    </button>
  );
};

export { SubmitButton };

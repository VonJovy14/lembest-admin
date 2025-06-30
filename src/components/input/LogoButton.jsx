import "./logo-button.scss";
import { LogoButton as LogoButtonData } from "../../constant/Buttons";

const LogoButton = ({ type }) => {
  const buttonData = LogoButtonData[type]; // Get the corresponding data

  if (!buttonData) {
    return null; // Handle invalid type gracefully
  }

  return (
    <div
      className="logo-button-container"
      style={{ backgroundColor: buttonData.color }}
    >
      <a href={buttonData.link} target="_blank" rel="noopener noreferrer">
        <div className="logo-container">
          <img src={buttonData.image} alt={type} />
        </div>
      </a>
    </div>
  );
};

export default LogoButton;

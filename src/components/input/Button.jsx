import "./button.scss";

import { Link } from "react-router-dom";

import Icons from "../display/Icons";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

//
const Button = ({ linkTo, children, isActive, onButtonClick, design }) => {
  return (
    <Link to={linkTo}>
      <div
        className={
          (design ? design : "other") +
          "-font " +
          (design ? design : "other") +
          "-button-container button-container navigation-" +
          (isActive ? "active" : "inactive")
        }
        onClick={() => (linkTo ? null : onButtonClick())}
      >
        <div className="navigation-button-wrapper">{children}</div>
      </div>
    </Link>
  );
};

//
const SubmitButton = ({ text }) => {
  return (
    <button type="submit" className="block-button-container button-container">
      {text.toUpperCase()}
    </button>
  );
};

const LinkButtonWipe = ({ text, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div className="link-button-wipe-container">
        <div className="link-button-wipe-label-container">
          {text.toUpperCase()}
        </div>
        <div className="link-button-wipe-background"></div>
      </div>
    </Link>
  );
};

const LinkButtonCircle = ({ image, linkTo, size }) => {
  return (
    <Link to={linkTo}>
      <div
        className="link-button-circle-container button-container"
        style={{ width: size + "px", height: size + "px" }}
      >
        <div className="link-button-circle-wrapper">
          <img
            src={image}
            alt=""
            style={{ width: size + "px", height: size + "px" }}
          />
        </div>
      </div>
    </Link>
  );
};

const TextButton = ({ text, handleTextButton }) => {
  return (
    <div
      onClick={() => handleTextButton()}
      className="text-button-border-container"
    >
      <div
        onClick={() => handleTextButton()}
        className="text-button-border-label-container"
      >
        {text.toUpperCase()}
      </div>
      <div className="text-button-background"></div>
    </div>
  );
};

const IconsButton = ({
  size,
  icon,
  color,
  tooltip,
  handleIconsButtonClick,
}) => {
  return (
    <div
      onClick={() => handleIconsButtonClick()}
      className="icons-button-container"
    >
      <Tooltip title={tooltip}>
        <div className={color + "-icon"}>
          <Icons icon={icon} size={size} />
        </div>
      </Tooltip>
    </div>
  );
};

const CircleIconsButton = ({
  size,
  icon,
  tooltip,
  handleCircleIconsButtonClick,
}) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={() => handleCircleIconsButtonClick()}
        className="circle-icons-button-container"
      >
        <Icons icon={icon} size={size} />
      </IconButton>
    </Tooltip>
  );
};

export {
  Button,
  SubmitButton,
  LinkButtonWipe,
  LinkButtonCircle,
  TextButton,
  IconsButton,
  CircleIconsButton,
};

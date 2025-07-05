import "./container.scss";

import { SubmitButton } from "../input/Button";

import { LinearProgress } from "@mui/material";

const PageContainer = ({ children }) => {
  return (
    <div className="page-container-container">
      <div className="page-container-wrapper">{children}</div>
    </div>
  );
};

const PageWrapper = ({ children, wide, color }) => {
  return (
    <div
      className={
        (color ? color : "white") + "-background page-wrapper-container"
      }
    >
      <div className={(wide ? "wide" : "normal") + "-page-wrapper-wrapper"}>
        {children}
      </div>
    </div>
  );
};

const CenterContainer = ({ children }) => {
  return (
    <div className="center-container-container">
      <div className="center-container-wrapper">{children}</div>
    </div>
  );
};

const AbsoluteMiddleCenterContainer = ({
  children,
  color,
  size,
  component,
}) => {
  return (
    <div className="absolute-middle-center-container-container">
      <div
        className="absolute-middle-center-content-container"
        style={{ maxWidth: size ? size : "500px" }}
      >
        <ContentContainer>{children}</ContentContainer>
      </div>
      <div
        style={{
          width: component ? "100%" : "100vw",
          height: component ? "100%" : "100vh",
        }}
        className={
          (color ? color : "transparent") +
          "-background absolute-middle-center-background-container"
        }
      ></div>
    </div>
  );
};

const ContentContainer = ({ children, border, color }) => {
  return (
    <div
      className={
        (color ? color : "white") + "-border content-container-container"
      }
      style={{ borderWidth: border ? border : "2px" }}
    >
      {children}
    </div>
  );
};

const FormContainer = ({ children, button, onFormSubmit, loading }) => {
  return (
    <form className="form-container" onSubmit={onFormSubmit}>
      <ContentContainer color="red">
        {loading && (
          <div className="form-loading-container">
            <AbsoluteMiddleCenterContainer component>
              <LinearProgress />
              Wait a bit—lechon magic in progress 🐷✨
            </AbsoluteMiddleCenterContainer>
          </div>
        )}

        {children}

        <div className="form-submit-button-container">
          <SubmitButton text={button} />
        </div>
      </ContentContainer>
    </form>
  );
};

export {
  PageContainer,
  PageWrapper,
  CenterContainer,
  ContentContainer,
  AbsoluteMiddleCenterContainer,
  FormContainer,
};

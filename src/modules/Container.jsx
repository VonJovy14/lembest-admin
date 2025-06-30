import "./container.scss";

import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";

import { NewsData } from "../constant/News";

import { TextCarousels } from "../components/display/Carousels";
import { TitleTwo } from "../components/display/Title";
import { SubmitButton } from "../components/input/Button";

import Footer from "../page/app/Footer";
import Header from "../page/app/Header";

//
const AppContainer = () => {
  const [headlineData, setHeadlineData] = useState([]);

  useEffect(() => {
    handleHeadlineData();
  }, []);

  const handleHeadlineData = () => {
    const newHeadlineData = NewsData.filter((item) => item.headline);
    setHeadlineData(newHeadlineData);
  };

  return (
    <div className="app-container">
      <Header />
      <TextCarousels CarouselText={headlineData} />

      <div className="app-wrapper">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

//
const AppWrapper = () => {
  return <Outlet />;
};

const ModuleContainer = ({ children, color }) => {
  return (
    <div className="module-container">
      <div className={"module-wrapper container " + color}>{children}</div>
    </div>
  );
};

const ComponentContainer = ({ children }) => {
  return <div className="component-container">{children}</div>;
};

const BorderContainer = ({ children, border }) => {
  return (
    <div className={"paragraph-container " + (border ? "border-style" : null)}>
      <div
        className={
          "paragraph-wrapper border-" + (border ? border + " container" : null)
        }
      >
        {children}
      </div>
    </div>
  );
};

const ParagraphContainer = ({ title, children, border }) => {
  return (
    <BorderContainer border={border}>
      <TitleTwo>
        <h2>{title.toUpperCase()}</h2>
      </TitleTwo>
      {children}
    </BorderContainer>
  );
};

//
const CollapsibleContainer = ({ children, open }) => {
  const contentRef = useRef();

  return (
    <div
      className="collapsible-container"
      ref={contentRef}
      style={
        !open
          ? { height: 0 }
          : { height: contentRef.current.scrollHeight + "px" }
      }
    >
      {children}
    </div>
  );
};

//
const FormContainer = ({ children, button, onFormSubmit }) => {
  return (
    <form className="form-container" onSubmit={onFormSubmit}>
      {children}

      <div className="form-submit-button-container">
        <SubmitButton text={button} />
      </div>
    </form>
  );
};

export {
  AppContainer,
  ModuleContainer,
  ComponentContainer,
  BorderContainer,
  ParagraphContainer,
  CollapsibleContainer,
  FormContainer,
  AppWrapper,
};

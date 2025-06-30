import "./title.scss";

const TitleOne = ({ children, inline }) => {
  return (
    <div className={"title-one-container " + (inline ? "no-border" : null)}>
      {children}
    </div>
  );
};

const TitleTwo = ({ children }) => {
  return (
    <div className="title-two-container">
      {children}
      <div className="title-two-line" />
    </div>
  );
};

const TitleThree = ({ children }) => {
  return <div className="title-three-container">{children}</div>;
};

export { TitleOne, TitleTwo, TitleThree };

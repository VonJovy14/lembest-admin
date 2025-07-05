import "./image.scss";

const DisplayImage = ({ image, width, height }) => {
  return (
    <div className="display-image-container">
      <img
        src={image}
        style={{
          height: height ? height : "auto",
          width: width ? width : "auto",
        }}
      />
    </div>
  );
};

export { DisplayImage };

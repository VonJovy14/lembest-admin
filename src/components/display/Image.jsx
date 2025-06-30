import "./image.scss";

import { ComponentContainer } from "../../modules/Container";

const WithLockImage = ({ src }) => {
  return (
    <div className="width-lock-image-container">
      <img src={src} alt="" className="width-lock--image" />
    </div>
  );
};

const LandscapeImage = ({ src }) => {
  return (
    <ComponentContainer>
      <div className="landscape-image-container">
        <div className="landscape-image-wrapper">
          <img src={src} alt="" className="landscape-image" />
        </div>
      </div>
    </ComponentContainer>
  );
};

export { WithLockImage, LandscapeImage };

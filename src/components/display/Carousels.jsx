import "./carousels.scss";

import { Carousel } from "react-bootstrap";
import { LandscapeImage } from "./Image";

const TextCarousels = ({ CarouselText }) => {
  return (
    <div className="text-carousels-container">
      <Carousel interval={2000} indicators={false} controls={false}>
        {CarouselText.map((data, index) => (
          <Carousel.Item key={index}>
            <span className="text-carousel-label one-line">
              <b>{data.title.toUpperCase()}</b>
            </span>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

const ImageCarousel = ({ CarouselImage }) => {
  return (
    <div className="image-carousels-container">
      <Carousel interval={2000} controls={false}>
        {CarouselImage.map((data, index) => (
          <Carousel.Item key={index}>
            <LandscapeImage src={data.image} />

            <Carousel.Caption>
              <div className="image-carousel-caption-container">
                <b>{data.caption.toUpperCase()}</b>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export { TextCarousels, ImageCarousel };

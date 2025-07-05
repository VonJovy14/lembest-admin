import "./notfound.scss";

import Manok2 from "../../assets/Manok 2.png";

import { AbsoluteMiddleCenterContainer } from "../../components/display/Container";
import { TitleThree } from "../../components/display/Title";
import { DisplayImage } from "../../components/display/Image";

function NotFound() {
  return (
    <div className="not-found-page-container">
      <AbsoluteMiddleCenterContainer color="yellow">
        <div className="not-found-page-image-container">
          <DisplayImage image={Manok2} width="100%" />
        </div>

        <div className="not-found-page-wrapper">
          <TitleThree>
            <h1>Uh-oh...</h1>
            <h1>you're in the digital void.</h1>
          </TitleThree>

          <p>
            Maybe the URL is wrong—or maybe it's just lost in the sauce. 🍝 Call
            your system admin (or summon them like a Pokémon).
          </p>
        </div>
      </AbsoluteMiddleCenterContainer>
    </div>
  );
}

export default NotFound;

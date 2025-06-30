import "./notfound.scss";

import Manok2 from "../assets/images/Manok 2.png";

import { TitleThree } from "../components/display/Title";
import { ModuleContainer } from "../modules/Container";

function NotFound() {
  return (
    <div className="not-found-page-container">
      <div className="not-found-page-wrapper">
        <ModuleContainer color="white">
          <div className="not-found-page-image-container">
            <img src={Manok2} alt="Lost chicken 😵" />
          </div>

          <TitleThree>
            <h3> Uh-oh... you're in the digital void. 🕳️</h3>
          </TitleThree>

          <span>
            Maybe the URL is wrong—or maybe it's just lost in the sauce. 🍝
            <br />
            Call your system admin (or summon them like a Pokémon).
          </span>
        </ModuleContainer>
      </div>
    </div>
  );
}

export default NotFound;

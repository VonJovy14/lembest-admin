import "./footer.scss";

import {
  LinkButtonWipe,
  LinkButtonCircle,
} from "../../components/input/Button";
import { FooterAdditionalButton, SocialButton } from "../../constant/Buttons";

import Grid from "@mui/material/Grid";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-tagline-container">
          <b>
            “Ibang iba parin ang sarap{" "}
            <span className="footer-tagline-wrapper"> LEMBEST</span>”
          </b>
        </div>

        <div className="footer-additional-button-container">
          <Grid container spacing={2} justifyContent="center">
            {FooterAdditionalButton.map((item, index) => (
              <Grid key={index}>
                <LinkButtonWipe text={item.label} linkTo={item.link} />
              </Grid>
            ))}
          </Grid>
        </div>

        <div className="footer-social-button-container">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid display={{ xs: "none", md: "block" }}>
              <span>Follow us on:</span>
            </Grid>

            {SocialButton.map((item, index) => (
              <Grid key={index}>
                <div className="footer-social-button-wrapper">
                  <div className="footer-social-button">
                    <LinkButtonCircle
                      image={item.image}
                      linkTo={item.link}
                      size="30"
                    />
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Footer;

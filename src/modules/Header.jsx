import "./header.scss";

import Logo from "../assets/Logo1.png";

import { Link } from "react-router-dom";

import { PageWrapper, CenterContainer } from "../components/display/Container";
import { DisplayImage } from "../components/display/Image";

import { Navigation1 } from "../constant/Navigation";

import { Grid } from "@mui/material";

import { AbsoluteMiddleCenterContainer } from "../components/display/Container";

const Header = () => {
  return (
    <div className="header-module-container">
      <PageWrapper wide color="yellow">
        <Grid container>
          <Grid size="grow">
            <div className="header-module-logo-container">
              <DisplayImage image={Logo} height="50px" />
            </div>
          </Grid>

          {Navigation1.map((navigation, index) => (
            <Grid key={index}>
              <NavigationButton link={navigation.link}>
                {navigation.label.toUpperCase()}
              </NavigationButton>
            </Grid>
          ))}

          <Grid>
            <NavigationButton link="login">LOGIN</NavigationButton>
          </Grid>
        </Grid>
      </PageWrapper>
    </div>
  );
};

const NavigationButton = ({ children, link }) => {
  return (
    <Link to={link}>
      <div className="header-module-navigation-button-container">
        <CenterContainer>{children}</CenterContainer>
      </div>
    </Link>
  );
};

export default Header;

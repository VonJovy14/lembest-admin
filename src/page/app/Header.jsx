import "./header.scss";

import { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase.jsx";

import { AuthContext } from "../../middleware/context/AuthContext.jsx";

import Logo from "../../assets/images/Logo1.png";

import {
  Navigation1,
  Navigation2,
  SuperAdminNav,
  AccountingSupervisorNav,
  LogisticHeadNav,
  LogisticAssistantNav,
} from "../../constant/Buttons.jsx";

import { Button } from "../../components/input/Button.jsx";
import { Divider } from "../../components/display/Divider.jsx";
import Icons from "../../components/display/Icons.jsx";

import { CollapsibleContainer } from "../../modules/Container.jsx";

import Grid from "@mui/material/Grid";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  const activeUserData = useSelector((state) => state.users.activeUser);
  const activeNavigation = useSelector((state) =>
    state.navigation.activeNavigation.toUpperCase()
  );

  const [isMobileNavigationCollapse, setIsMobileNavigationCollapse] =
    useState(false);
  const [additionalNavigation, setAdditionalNavigation] = useState([]);

  const toggleMobileNav = () => {
    setIsMobileNavigationCollapse((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut(auth);
    toggleMobileNav();
  };

  const _renderAdditionalNavigation = () => {
    switch (activeUserData.access_level) {
      case "1":
        setAdditionalNavigation(SuperAdminNav);
        break;
      case "3":
        setAdditionalNavigation(LogisticHeadNav);
        break;
      case "4":
        setAdditionalNavigation(LogisticAssistantNav);
        break;
      case "5":
        setAdditionalNavigation(AccountingSupervisorNav);
        break;
      default:
        setAdditionalNavigation([]);
        break;
    }
  };

  useEffect(() => {
    _renderAdditionalNavigation();
  }, [activeUserData]);

  return (
    <>
      <div className="header-container">
        <div className="header-wrapper">
          <Grid container alignItems="center">
            <Grid size="grow">
              <div className="header-image-logo-container">
                <img src={Logo} alt="" className="header-image-logo" />
              </div>
            </Grid>

            {Navigation1.map((item, index) => (
              <Grid display={{ xs: "none", lg: "block" }} key={index}>
                <div className="header-navigation-button-container">
                  <Button
                    design="navigation"
                    isActive={activeNavigation === item.label.toUpperCase()}
                    linkTo={item.link}
                  >
                    {item.label.toUpperCase()}
                  </Button>
                </div>
              </Grid>
            ))}

            <Grid display={{ xs: "none", lg: "block" }}>
              {!currentUser ? (
                <div className="header-navigation-button-container">
                  <Button
                    design="navigation"
                    isActive={activeNavigation === "LOGIN"}
                    linkTo="login"
                  >
                    LOGIN
                  </Button>
                </div>
              ) : (
                <div
                  className="header-navigation-profile-container"
                  onMouseEnter={() =>
                    setIsMobileNavigationCollapse((prev) => !prev)
                  }
                  onMouseLeave={() =>
                    setIsMobileNavigationCollapse((prev) => !prev)
                  }
                >
                  <Button design="navigation">
                    <div className="header-navigation-profile-wrapper">
                      <div className="header-navigation-profile-name-container">
                        {activeUserData.first_name ? (
                          <span>{activeUserData.first_name.toUpperCase()}</span>
                        ) : null}
                      </div>

                      <div className="header-navigation-profile-picture-container">
                        <Icons icon="face" size={30} />
                      </div>
                    </div>
                  </Button>

                  <div className="header-navigation-profile-menu-buttons-container">
                    <CollapsibleContainer open={isMobileNavigationCollapse}>
                      <div className="header-navigation-profile-collapsible-menu-buttons-container">
                        <div className="header-navigation-profile-collapsible-menu-buttons-wrapper">
                          {additionalNavigation.map((item, index) => (
                            <Button
                              design="navigation2"
                              key={index}
                              isActive={activeNavigation === item.label}
                              linkTo={item.link}
                            >
                              <div className="header-navigation-profile-collapsible-menu-button-container">
                                <Grid
                                  container
                                  spacing={1}
                                  sx={{
                                    alignItems: "center",
                                  }}
                                >
                                  <Grid>
                                    <Icons icon={item.icon} size={20} />
                                  </Grid>

                                  <Grid>
                                    <div className="header-navigation-profile-collapsible-menu-button-label-container">
                                      {item.label}
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                            </Button>
                          ))}

                          <Divider />

                          {Navigation2.map((item, index) => (
                            <Button
                              design="navigation2"
                              key={index}
                              isActive={activeNavigation === item.label}
                              linkTo={item.link}
                            >
                              <div className="header-navigation-profile-collapsible-menu-button-container">
                                <Grid
                                  container
                                  spacing={1}
                                  sx={{
                                    alignItems: "center",
                                  }}
                                >
                                  <Grid>
                                    <Icons icon={item.icon} size={20} />
                                  </Grid>

                                  <Grid>
                                    <div className="header-navigation-profile-collapsible-menu-button-label-container">
                                      {item.label}
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                            </Button>
                          ))}

                          <Button
                            design="navigation2"
                            onButtonClick={() => handleSignOut()}
                          >
                            <div className="header-navigation-profile-collapsible-menu-button-container">
                              <Grid
                                container
                                spacing={1}
                                sx={{
                                  alignItems: "center",
                                }}
                              >
                                <Grid>
                                  <Icons icon="logout" size={20} />
                                </Grid>

                                <Grid>
                                  <div className="header-navigation-profile-collapsible-menu-button-label-container">
                                    Logout
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContainer>
                  </div>
                </div>
              )}
            </Grid>

            <Grid display={{ xs: "block", lg: "none" }}>
              <div onClick={toggleMobileNav}>
                <Icons icon="menu" size={25} />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      {/* <CollapsibleContainer open={isMobileNavigationCollapse}>
        <div className="header-mobile-container">
          {Navigation1.map((item, index) => (
            <Grid display={{ xs: "block", lg: "none" }} key={index}>
              <div
                className="header-navigation-button-container"
                onClick={toggleMobileNav}
              >
                <Button design="navigation"
                  text={item.label}
                  isActive={activeNavigation === item.label.toUpperCase()}
                  linkTo={item.link}
                />
              </div>
            </Grid>
          ))}
        </div>
      </CollapsibleContainer> */}
    </>
  );
};

export default Header;

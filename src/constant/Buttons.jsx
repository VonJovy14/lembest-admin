import Facebook from "../assets/images/social/Facebook.svg";
import Instagram from "../assets/images/social/Instagram.svg";
import Messenger from "../assets/images/social/Messenger.svg";
import Twitter from "../assets/images/social/Twitter.svg";
import Viber from "../assets/images/social/Viber.png";
import Web from "../assets/images/social/Web.svg";
import WhatsApp from "../assets/images/social/WhatsApp.svg";
import Youtube from "../assets/images/social/Youtube.svg";

import GoogleMap from "../assets/images/social/Google Maps.png";
import Waze from "../assets/images/social/Waze.png";

export const Navigation1 = [
  { label: "home", link: "/" },
  { label: "product", link: "/product" },
  { label: "about", link: "/about" },
  { label: "franchise", link: "/franchise" },
  // { label: "gallery", link: "/gallery" },
];

export const Navigation2 = [
  { label: "Register Account", link: "/register-account", icon: "group" },
  { label: "Profile", link: "/profile", icon: "face" },
];

export const FooterAdditionalButton = [
  { label: "franchise", link: "/franchise" },
  { label: "career", link: "/career" },
  { label: "contact us", link: "/contact-us" },
];

export const SocialButton = [
  {
    label: "facebook",
    image: Facebook,
    link: "https://www.facebook.com/lembestlechonofficial/",
  },
  {
    label: "messenger",
    image: Messenger,
    link: "https://www.messenger.com/channel/lembestlechonofficial",
  },
  // { label: "instagram", image: Instagram, link: "/instagram" },
  // { label: "viber", image: Viber, link: "" },
  { label: "whatsapp", image: WhatsApp, link: "https://wa.me/+639602511133" },
  {
    label: "youtube",
    image: Youtube,
    link: "https://www.youtube.com/@LembestLechonOfficial",
  },
];

export const LogoButton = {
  GoogleMaps: {
    image: GoogleMap,
    color: "#bfbfbf",
    link: "https://maps.app.goo.gl/wcF5jnpuhDNfExJF7",
  },
  Waze: {
    image: Waze,
    color: "#31c4f5",
    link: "https://ul.waze.com/ul?place=ChIJxUd3qU-xlzMRh7sX8Z3_qqQ&ll=14.69865180%2C121.00111360&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
  },
};

export const SuperAdminNav = [
  { icon: "ap", link: "account-payable", label: "Account Payable" },
  { icon: "po", link: "purchase-order", label: "Purchase Order" },
  { icon: "key", link: "users", label: "Users" },
];

export const AccountingSupervisorNav = [
  { icon: "ap", link: "account-payable", label: "Account Payable" },
];

export const LogisticHeadNav = [
  { icon: "po", link: "purchase-order", label: "Purchase Order" },
];

export const LogisticAssistantNav = [
  { icon: "po", link: "purchase-order", label: "Purchase Order" },
];

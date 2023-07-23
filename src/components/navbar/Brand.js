import React from "react";
import navBarIcon from "../../assets/logo-desktop-.png";
import navBarIconMobile from "../../assets/logo-mobile.png";

const Brand = () => {
  return (
    <div className="brand">
      <img alt="desctop logo" className="desktop-icon" src={navBarIcon}></img>
      <img
        alt="mobile icon"
        className="mobile-icon"
        src={navBarIconMobile}
      ></img>
    </div>
  );
};

export default Brand;

import React from "react";
import { Helmet } from "react-helmet";
import FACEBOOK_PIXEL_1 from "./pixel-facebook/pixel_1";

export default ({ name }) => {
  return (
    <Helmet> {name === "FACEBOOK_PIXEL_1" && <FACEBOOK_PIXEL_1 />}</Helmet>
  );
};

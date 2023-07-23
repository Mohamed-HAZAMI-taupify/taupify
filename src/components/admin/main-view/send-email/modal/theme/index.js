import React from "react";
import { Container } from "reactstrap";

export default function TooltipTheme({ image, descr }) {
  return (
    <Container>
      <div className="image-tooltip-mail">
        <img alt="Everest Studio page" src={image}></img>
      </div>
      <div className="descr-mail-container">
        <div className="descr-mail">
          <span>{descr}</span>
        </div>
      </div>
    </Container>
  );
}

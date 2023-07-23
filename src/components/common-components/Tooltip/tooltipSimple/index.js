import React from "react";
import { Container } from "reactstrap";

export default function TooltipSimple({ text }) {
  return (
    <div className="tooltip">
      <Container className="tooltip-container">
        <div className="content-tooltip">
          <p className="tooltip-description">{text}</p>
        </div>
      </Container>
    </div>
  );
}

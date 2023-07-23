import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

export default function TooltipEv({
  image,
  name,
  givenName,
  description,
  linkTo,
}) {
  return (
    <div className="tooltip">
      <Container className="tooltip-container">
        <div className="image-tooltip">
          <img alt="image" src={image}></img>
        </div>
        <div className="title-tooltip">
          <span> {name} </span>
          {givenName}
        </div>
        <div className="content-tooltip">
          <p className="tooltip-description">{description}</p>
        </div>
        <button className="btn-ev btn-m hvr-line uppercase ">
          <Link to={linkTo ? linkTo : `/coach`} className="link-tooltip">
            <span className="planning-button">Plus de détails</span>
          </Link>
        </button>
      </Container>
    </div>
  );
}

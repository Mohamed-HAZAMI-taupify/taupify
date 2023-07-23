import React from "react";
import { Col, Row } from "reactstrap";
import ImageLoader from "../image-loader";
import { useMediaQuery } from "react-responsive";

const LocationOurClubActivity = (props) => {
  const el = props.el;
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 1224px)",
  });

  return (
    <section className="home-component">
      <section className="activity-studio activity">
        {isDesktop && <ImageLoader alt={el.title} src={el.image} />}

        {isMobile && <ImageLoader alt={el.title} src={el.imageMobile} />}
        <div className="description des-act">
          <h2 className="uppercase">{el.title} </h2>
          <p>{el.description}</p>
        </div>
      </section>

      <section className="tarif-section">
        <Row>
          <Col sm={6}>
            <h2 className="weight-semi-bold tarif-title">TARIFS</h2>
          </Col>

          <Col sm={6}>
            {el.tarifs.map((tarif, index) => (
              <div className="tarifs-container" key={index}>
                <h3 className="tarif-offre"> {tarif.offre} </h3>
                <h3 className="tarif-offre weight-semi-bold"> {tarif.tarif} </h3>
              </div>
            ))}
          </Col>
        </Row>
      </section>
    </section>
  );
};
export default LocationOurClubActivity;

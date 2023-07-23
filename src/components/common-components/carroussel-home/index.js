import React, { useState } from "react";
import { Card, Accordion } from "react-bootstrap";

const SectionActivities = ({ image, title, description, with_button }) => {
  const [showButton, setShowButton] = useState(true);

  return (
    <section className="caroussel-home">
      <img
        alt="NOS ACTIVITIES background"
        className="background-image"
        src={image}
      />
      <div className="description">
        <h3>{title}</h3>

        {with_button && (
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle
              onClick={() => setShowButton(!showButton)}
              className="bottom-direction-accordion"
              variant="link"
              eventKey="1"
            >
              {showButton ? (
                <img
                  alt="bottom direction"
                  className="bottom-direction bottom-direction-up"
                  src="https://i.ibb.co/YPHncCX/bottom-Direction.png"
                ></img>
              ) : (
                <img
                  alt="bottom direction"
                  className="bottom-direction"
                  src="https://i.ibb.co/YPHncCX/bottom-Direction.png"
                ></img>
              )}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {" "}
                <p>{description}</p>
              </Card.Body>
            </Accordion.Collapse>
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default SectionActivities;

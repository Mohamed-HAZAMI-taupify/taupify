import React, { useRef, useState } from "react";

const Accordion = (props) => {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");

  const toggleAccordion = () => {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  };

  return (
    <div className="accordion-section">
      <div
        className={`accordion ${active ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <p className="accordion-title">{props.title}</p>
        <span>{active ? "-" : "+"}</span>
      </div>

      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion-content"
      >
        {props.content}
      </div>
    </div>
  );
};

export default Accordion;

import React, { useEffect } from "react";

const CalendlyCalendar = (props) => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head.appendChild(script);
  }, []);

  return (
    <div className="calendly-container">
      <div
        className="calendly-inline-widget"
        data-url={props.url}
        id="calendly-calendar"
      />
    </div>
  );
};

export default CalendlyCalendar;
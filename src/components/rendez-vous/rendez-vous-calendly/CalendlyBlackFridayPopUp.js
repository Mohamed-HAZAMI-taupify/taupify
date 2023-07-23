import React from "react";

class CalendlyBlackFridayPopUp extends React.Component {
  componentDidMount() {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head.appendChild(script);
  }

  render() {
    return (
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/evereste945/black-friday-pop-up"
        style={{
          minWidth: "320px",
          height: "calc(100vh - 110px)",
          border: "solid",
          paddingTop: "35px",
        }}
      />
    );
  }
};


export default function RdvBlackFridayPopUp() {
    return (
      <div className="containerrs">
        <CalendlyBlackFridayPopUp />
      </div>
    );
  }


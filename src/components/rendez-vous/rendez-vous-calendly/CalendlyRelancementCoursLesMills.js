import React from "react";

class CalendlyRelancementCoursLesMills extends React.Component {
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
        data-url="https://calendly.com/evereste945/relancement-des-cours-lesmills"
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


export default function RdvRelancementCoursLesMills() {
    return (
      <div className="containerrs">
        <CalendlyRelancementCoursLesMills />
      </div>
    );
  }


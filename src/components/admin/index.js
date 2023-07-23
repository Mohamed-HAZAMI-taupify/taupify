import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import FadeIn from "react-fade-in";
import AnalyseProspect from "./analyse-prospect/";
import TopAccordion from "./top-accordion";

const Admin = () => {
  return (
    <FadeIn>
      <div className="admin-page">
        <div className="container-admin">
          <TopAccordion />
        </div>
        <div className="container-admin">
          <AnalyseProspect />
        </div>
      </div>
    </FadeIn>
  );
};

export default Admin;

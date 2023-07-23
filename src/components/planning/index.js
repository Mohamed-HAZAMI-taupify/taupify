import React from "react";
import PlanningList from "./sessions";

const Planning = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="planning-body">
      <section className="page-intro content">
        <div className="w_grid limited-content no-gutter planning-title">
          <h1 className="title-xl">RÉSERVEZ VOTRE SESSION</h1>
     
        </div>
      </section>
      <section className="planning-list content">
        <PlanningList />
      </section>
    </div>
  );
};

export default Planning;

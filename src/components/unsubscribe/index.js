import React from "react";
import Unsubscribe from "./content";

const index = (props) => {
  var getId = props.location.search;
  var id = getId.replace("?", "");

  return (
    <section className="unsubscription-section">
      <div className="unsubscription-box">
        <Unsubscribe id={id} />
      </div>
    </section>
  );
};
export default index;

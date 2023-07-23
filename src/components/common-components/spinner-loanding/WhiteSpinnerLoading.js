import React from "react";
import logo from "../../../assets/logo-small.png";

function WhiteSpinnerLoading(props) {
  return props.loading ? (
    <div className="spinner-row">
      <div className="spinner-loading">
        <img className="logo-planning" src={logo}></img>
      </div>
    </div>
  ) : null;
}
export default WhiteSpinnerLoading;

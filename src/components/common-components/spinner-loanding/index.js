import React from "react";
import logo from "../../../assets/montagne-logo.png";

function SpinnerLoadings(props) {
  return props.loading ? (
    <tbody>
      <tr className="spinner-row">
        <td>
          <div className="spinner-loading">
            <img className="logo-planning" src={logo}></img>
          </div>
        </td>
      </tr>
    </tbody>
  ) : null;
}
export default SpinnerLoadings;

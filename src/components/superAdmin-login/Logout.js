import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { data } from "../../data/routes/routesData";
class Logout extends Component {
  constructor() {
    localStorage.removeItem("tokenn");
  }
  render() {
    return <Redirect to={data.login_admin} />;
  }
}

export default Logout;

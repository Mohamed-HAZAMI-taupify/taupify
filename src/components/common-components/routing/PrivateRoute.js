import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { data } from "../../../data/routes/routesData";
const PrivateRoute = ({
  component: Component,
  authReducer: { tokenEverest },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !tokenEverest ? (
        <Redirect to={data.login_admin} />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const mapStateToProps = (state) => {
  return {
    authReducer: state.AuthReducer,
  };
};
const ConnectedPrivateRoute = connect(mapStateToProps, null)(PrivateRoute);
export default ConnectedPrivateRoute;

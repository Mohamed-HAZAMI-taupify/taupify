import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/common-components/routing/PrivateRoute";
import { routesSideBar } from "./data/routes/routesSidebar";
import ConnectedAdmin from "./components/admin";
import { data } from "./data/routes/routesData";
const Routes = () => {
  return (
    <Switch>
      {routesSideBar.map((el, index) => (
        <Route key={index} exact path={el.path} component={el.component} />
      ))}
      <PrivateRoute exact path={data.admin_path} component={ConnectedAdmin} />
    </Switch>
  );
};

export default Routes;

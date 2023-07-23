import React, { useState } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { routes } from "../../../data/routes/routes";
import ConnexionModal from "../pop-up/pop-up-container/connexion-modal";
import Member from "../../member";
import * as s from "../../../App.styles";
import MainView from "../../admin/main-view";
import { connect } from "react-redux";
import Aside from "../sidebar";
import WrongRoutePage from "../not-found";
import { useMediaQuery } from "react-responsive";

import { data } from "../../../data/routes/routesData";
const Content = (props) => {
  const { tokenEverest } = props.authReducer;
  const isSmallScreen = useMediaQuery({ query: "(max-width: 800px)" });

  const [collapsed, setCollapsed] = useState(isSmallScreen ? true : false);
  const [toggled, setToggled] = useState(false);
  const location = useLocation();

  const background = location.state && location.state.background;

  const handleCollapsedChange = (checked) => {
    if (!isSmallScreen) setCollapsed(checked);
    return;
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  if (!tokenEverest && window.location.pathname.startsWith(data.admin_path)) {
    return <Redirect to={data.login_admin} />;
  }

  if (
    !tokenEverest &&
    window.location.pathname.endsWith("/edit") &&
    window.location.pathname.startsWith(
      `${data.journal}${data.article}/`
    )
  ) {
    return <Redirect to={data.journal} />;
  }

  return (
    <>
      {window.location.pathname.startsWith(data.admin_path) ? (
        <s.App>
          {/* ///// NEW SIDEBAR ///// */}
          <div className={`app ${toggled ? "toggled" : ""}`}>
            <Aside
              isSmallScreen={isSmallScreen}
              collapsed={collapsed}
              toggled={toggled}
              handleToggleSidebar={handleToggleSidebar}
              handleCollapsedChange={handleCollapsedChange}
            />
          </div>
          {/* ///// NEW SIDEBAR ///// */}

          <div className="content-sidebar">
            <MainView />
          </div>
        </s.App>
      ) : null}
      {/* ///// SIDEBAR ENDS ///// */}

      <Switch location={background || location}>
        {routes.map((el, index) => (
          <Route exact key={index} path={el.path} component={el.component} />
        ))}
        <Route exact path={data.member} component={Member} />
        {window.location.pathname.startsWith(data.admin_path) ? null : (
          <Route
            exact
            path={window.location.pathname}
            component={WrongRoutePage}
          />
        )}
        {background && (
          <Route path={data.login} children={<ConnexionModal />} />
        )}
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.AuthReducer,
  };
};

export default connect(mapStateToProps, null)(Content);
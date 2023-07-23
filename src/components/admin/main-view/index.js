import React from "react";
import * as s from "./MainView.styles";
import Routes from "../../../Routes";

const MainView = () => {
  return (
    <div className="main-view-conatainer">
      <s.MainViewContainer>
        <Routes />
      </s.MainViewContainer>
    </div>
  );
};
 
export default MainView;

import React from "react";
import { toggle } from "../../../redux/actions/AdminActions";
import { connect } from "react-redux";

const Burgermenu = (props) => {
  const { navbarState } = props.adminReducer.modal;

  return (
    <div
      className="wrapper"
      onClick={() => props.toggle("navbarState", !navbarState)}
    >
      <div className={navbarState ? "open" : ""}>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};
const ConnectedBurgermenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(Burgermenu);
export default ConnectedBurgermenu;

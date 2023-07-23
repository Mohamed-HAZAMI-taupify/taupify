import React from "react";
import { connect } from "react-redux";
import { toggle } from "../../../redux/actions/AdminActions";

const AddAdminComponentButton = (props) => {
  return (
    <div id="" className="btn-div-add-admin">
      <button
        className="icon-btn add-btn"
        onClick={() => {
          props.toggle(props.toggleName, true);
        }}
      >
        <div className="add-icon"></div>
        <div className="btn-txt">Ajouter {props.toggleName}</div>
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});

export default connect(null, mapDispatchToProps)(AddAdminComponentButton);

import React from "react";
import { connect } from "react-redux";
import PopUpEverest from "../../../../../../common-components/pop-up-everest";

const UpdatePopUpModal = (props) => {
  const { updatePopup } = props.adminReducer.modal;

  return (
    <PopUpEverest
      modalToggle={"updatePopup"}
      modalIsOpen={updatePopup}
      showResult={false}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};
export default connect(mapStateToProps, null)(UpdatePopUpModal);

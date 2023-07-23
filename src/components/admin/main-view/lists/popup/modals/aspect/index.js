import React from "react";
import { connect } from "react-redux";
import PopUpEverest from "../../../../../../common-components/pop-up-everest";

const AspectPopUpModal = (props) => {
  const { aspectPopup } = props.adminReducer.modal;

  return (
    <PopUpEverest
      modalToggle={"aspectPopup"}
      modalIsOpen={aspectPopup}
      showResult={true}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};
export default connect(mapStateToProps, null)(AspectPopUpModal);

import React from "react";
import { connect } from "react-redux";
import PopUpEverest from "../../../../../common-components/pop-up-everest";

const AddPopUpModal = (props) => {
  const { addPopup } = props.adminReducer.modal;

  return (
    <PopUpEverest
    modalToggle={"addPopup"}
      modalIsOpen={addPopup}
      showResult={false}

    />
  );
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};
export default connect(
  mapStateToProps,
  null
)(AddPopUpModal);;

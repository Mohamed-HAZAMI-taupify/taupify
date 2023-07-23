import React from "react";
import { connect } from "react-redux";
import ModalInput from "../../../../../../common-components/modals/inputs";
import EditContactEverest from "./content"
const UpdateContactEverestModal = (props) => {
  const { updateContactEverestModal } = props.adminReducer.modal;

  return (
    <ModalInput
      modalToggle={"updateContactEverestModal"}
      modalIsOpen={updateContactEverestModal}
       content={<EditContactEverest />}
      modalName={"Modifier contact Everest"}
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
)(UpdateContactEverestModal);

import React from "react";
import { connect } from "react-redux";
import ModalInput from "../../../../../common-components/modals/inputs";
import ConnecteAddCoachModalContentContent from "./content";

const AddCoachModal = (props) => {
  
  const { coach } = props.adminReducer.modal;

  return (
    <ModalInput
      modalToggle={"coach"}
      modalIsOpen={coach}
      withImage={true}
      content={<ConnecteAddCoachModalContentContent />}
      modalTitle={"Ajouter un Coach"}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};
export default connect(mapStateToProps, null)(AddCoachModal);

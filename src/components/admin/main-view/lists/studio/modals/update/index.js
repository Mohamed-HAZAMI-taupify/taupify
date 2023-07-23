import React from "react";
import { connect } from "react-redux";
import ModalInput from "../../../../../../common-components/modals/inputs";
import EditStudio from "./content/index";

const UpdateStudioModal = (props) => {
  const { updateStudioModal } = props.adminReducer.modal;

  return (
    <ModalInput
      modalToggle={"updateStudioModal"}
      modalIsOpen={updateStudioModal}
      content={<EditStudio />}
      modalTitle={"Modifier ce Studio"}
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
)(UpdateStudioModal);

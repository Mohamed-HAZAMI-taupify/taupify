import React from "react";
import { connect } from "react-redux";
import ModalInput from "../../../../../../common-components/modals/inputs";
import EditNewCoach from "./content";

const UpdateNewCoach = (props) => {
  const { updateCoachModal } = props.adminReducer.modal;

  return (
    <ModalInput
      modalToggle={"updateCoachModal"}
      modalIsOpen={updateCoachModal}
      withImage={true}
      content={<EditNewCoach />}
      modalTitle={"Modifier ce coach"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};


export default  connect(mapStateToProps, null)(UpdateNewCoach);

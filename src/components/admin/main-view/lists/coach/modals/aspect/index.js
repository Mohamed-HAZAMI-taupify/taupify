import React from "react";
import { connect } from "react-redux";
import ModalDetails from "../../../../../../common-components/modals/aspect";
import DetailsContentCoach from "./content";

const CoachModal = (props) => {
  const { coachDetailsModal } = props.adminReducer.modal;

  return (
    <ModalDetails
      modalToggle={"coachDetailsModal"}
      modalIsOpen={coachDetailsModal}
      content={<DetailsContentCoach />}
      withImage={true}
      modalTitle={"Détails du Coach"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};

export default connect(mapStateToProps, null)(CoachModal);

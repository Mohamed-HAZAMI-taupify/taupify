import React from "react";
import { connect } from "react-redux";
import ModalInput from "../../../../../../common-components/modals/inputs";
import ReplyNewMessageModalContent from "./content/index";

const ReplyNewMessageModal = (props) => {
  const { replyContactUsModal } = props.adminReducer.modal;

  return (
    <ModalInput
      modalToggle={"replyContactUsModal"}
      modalIsOpen={replyContactUsModal}
      content={<ReplyNewMessageModalContent />}
      modalTitle={"Répondre"}
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
)(ReplyNewMessageModal);

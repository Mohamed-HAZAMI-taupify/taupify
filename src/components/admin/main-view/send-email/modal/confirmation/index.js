import React from "react";
import { Button, Modal, ModalHeader, ModalBody, Container } from "reactstrap";
import { sendEmail } from "../../../../../../redux/actions/EmailActions";
import { connect } from "react-redux";
import { toggle } from "../../../../../../redux/actions/AdminActions";

function SendEmailConfirmationModal(props) {
  var objet = props.objet;
  var selectedDestinataireListDistincts =
    props.selectedDestinataireListDistincts;
  var selectedThemeName = props.selectedThemeName;
  var test = props.test;
  var sendEmailConfirmationModal = props.adminReducer.modal;

  return (
    <Modal
      isOpen={sendEmailConfirmationModal}
      toggle={() => props.toggle("sendEmailConfirmationModal", false)}
    >
      <ModalHeader
        className="prospect-header"
        toggle={() => props.toggle("sendEmailConfirmationModal", false)}
      ></ModalHeader>
      <ModalBody className="body-details-prospect body-details-archive ">
        <div className="modal-title header-prospect header-confirmation">
          Voulez-vous confirmer cet aux destinataires que vous avez choisi
        </div>
        <Container className="container-confirmation">
          <Button
            className="confirmation-button"
            onClick={() => {
              props.toggle("sendEmailConfirmationModal", false);
              props.sendEmail(
                { objet },
                { selectedDestinataireListDistincts },
                { selectedThemeName },
                { test }
              );
            }}
          >
            <span> Confirmer </span>
          </Button>
          <Button
            className="annulation-button"
            onClick={() => props.toggle("sendEmailConfirmationModal", false)}
          >
            <span>Annuler </span>
          </Button>
        </Container>
      </ModalBody>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (mailObjet, mailDestinataire, mailTheme, mailTest) => {
    dispatch(sendEmail(mailObjet, mailDestinataire, mailTheme, mailTest));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendEmailConfirmationModal);

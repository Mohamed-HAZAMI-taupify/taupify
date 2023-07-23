import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { Card } from "react-bootstrap";
import { toggle } from "../../../../../../../redux/actions/AdminActions";
import { ContactUsDetails } from "../../../../../../../redux/actions/MessageProspectAction";

const NewMessageModal = (props) => {
  const { contactUsDetails } = props.contactUsProspectReducer;
  const { contactUsDetailsModal } = props.adminReducer.modal;

  return (
    <Modal
      isOpen={contactUsDetailsModal}
      toggle={() => props.toggle("contactUsDetailsModal", false)}
      contentClassName="modalDetailStyle"
      size="md"
      centered
    >
      <ModalHeader
        toggle={() => props.toggle("contactUsDetailsModal", false)}
        className="prospect-header"
      ></ModalHeader>
      <ModalBody className="body-details-prospect">
        <div className="modal-title header-prospect">Message</div>
        <Card className="card-details-prospect">
          <Card.Body>
            <Row xs="1" sm="2">
              <Col>
                <span className="text-prospect-detail"> Prénom </span>
              </Col>
              <Col>
                <span className="text-prospect-detail-content">
                  {contactUsDetails.firstname}
                </span>
              </Col>
            </Row>
            <Row xs="1" sm="2">
              <Col>
                <span className="text-prospect-detail"> Nom </span>
              </Col>
              <Col>
                <span className="text-prospect-detail-content">
                  {contactUsDetails.lastname}
                </span>
              </Col>
            </Row>
            <Row xs="1" sm="2">
              <Col>
                <span className="text-prospect-detail"> Téléphone </span>
              </Col>
              <Col>
                <span className="text-prospect-detail-content">
                  {contactUsDetails.phone}
                </span>
              </Col>
            </Row>
            <Row xs="1" sm="2">
              <Col>
                <span className="text-prospect-detail"> E-mail </span>
              </Col>
              <Col>
                <span className="text-prospect-detail-content">
                  {contactUsDetails.email}
                </span>
              </Col>
            </Row>
            <Row xs="1" sm="2">
              <Col>
                <span className="text-prospect-detail"> Message </span>
              </Col>
              <Col>
                <span className="text-prospect-detail-content">
                  {contactUsDetails.message ? contactUsDetails.message : "--"}
                </span>
              </Col>
            </Row>
            <Row xs="1" sm="2">
              <Col>
                <span className="text-prospect-detail">
                  {" "}
                  Date d'inscription{" "}
                </span>
              </Col>
              <Col>
                <span className="text-prospect-detail-content">
                  {contactUsDetails.date && contactUsDetails.date.split("T")[0]}
                </span>
              </Col>
            </Row>
            <Row xs="1" sm="2">
              <Col>
                <span className="text-prospect-detail">
                  {" "}
                  Temps d'inscription{" "}
                </span>
              </Col>
              <Col>
                <span className="text-prospect-detail-content">
                  {contactUsDetails.date &&
                    contactUsDetails.date.split("T")[1].split(".")[0]}
                </span>
              </Col>
            </Row>
            <Row xs="1" sm="2">
              <Col>
                <span className="text-prospect-detail">Réponse</span>
              </Col>
              <Col>
                <span className="text-prospect-detail-content">
                  {contactUsDetails.replied ? (
                    <span className="isReplied">✔</span>
                  ) : (
                    <span className="isNotReplied">X</span>
                  )}
                </span>
              </Col>
            </Row>
            {contactUsDetails.replied ? (
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Réponse </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {contactUsDetails.response
                      ? contactUsDetails.response
                      : "--"}
                  </span>
                </Col>
              </Row>
            ) : null}
          </Card.Body>
        </Card>
      </ModalBody>
    </Modal>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  ContactUsDetails: (contact) => {
    dispatch(ContactUsDetails(contact));
  },
});
const mapStateToProps = (state) => {
  return {
    contactUsProspectReducer: state.ContactUsProspectReducer,
    adminReducer: state.AdminReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageModal);


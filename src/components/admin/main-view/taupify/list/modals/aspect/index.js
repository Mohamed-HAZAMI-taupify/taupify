import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { Card } from "react-bootstrap";
import { toggle } from "../../../../../../../redux/actions/AdminActions";

const TaupifyContactModal = (props) => {
  const taupifyContactDetails = props.TaupifyContactReducer
    .taupifyContactDetails
    ? props.TaupifyContactReducer.taupifyContactDetails
    : {};

  var everfit_modal = props.adminReducer.modal.taupifyContactDetails;

  return (
    <>
      <Modal
        isOpen={everfit_modal}
        toggle={() => props.toggle("taupifyContactDetails", false)}
        contentClassName="modalDetailStyle"
        size="md"
        centered
      >
        <ModalHeader
          toggle={() => props.toggle("taupifyContactDetails", false)}
          className="prospect-header"
        ></ModalHeader>
        <ModalBody className="body-details-prospect">
          <div className="modal-title header-prospect">Taupify Contact</div>
          <Card className="card-details-prospect">
            <Card.Body>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Prénom </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {taupifyContactDetails.givenName}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Nom </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {taupifyContactDetails.familyName}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Téléphone </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {taupifyContactDetails.phone}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> E-mail </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {taupifyContactDetails.email}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Message </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {taupifyContactDetails.message}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail">
                    {" "}
                    Date d'envoie{" "}
                  </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {taupifyContactDetails.date &&
                      taupifyContactDetails.date.split("T")[0]}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail">
                    {" "}
                    Temps d'envoie
                  </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {taupifyContactDetails.date &&
                      taupifyContactDetails.date.split("T")[1].split(".")[0]}
                  </span>
                </Col>
              </Row>
             
            </Card.Body>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    TaupifyContactReducer: state.TaupifyContactReducer,
    adminReducer: state.AdminReducer,
    alertReducer: state.AlertReducer,
  };
};
const ConnectedTaupifyContactModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaupifyContactModal);

export default ConnectedTaupifyContactModal;

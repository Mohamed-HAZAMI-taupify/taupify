import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { Card } from "react-bootstrap";
import { toggle } from "../../../../../../../redux/actions/AdminActions";

const EverfitContactModal = (props) => {
  const { everfitContactDetails } = props.contactReducer;
  const { everfitContactDetail } = props.adminReducer.modal;

  return (
      <Modal
        isOpen={everfitContactDetail}
        toggle={() => props.toggle("everfitContactDetail", false)}
        contentClassName="modalDetailStyle"
        size="md"
        centered
      >
        <ModalHeader
          toggle={() => props.toggle("everfitContactDetail", false)}
          className="prospect-header"
        ></ModalHeader>
        <ModalBody className="body-details-prospect">
          <div className="modal-title header-prospect">Everfit Contact</div>
          <Card className="card-details-prospect">
            <Card.Body>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Prénom </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {everfitContactDetails.firstname}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Nom </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {everfitContactDetails.lastname}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Téléphone </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {everfitContactDetails.phone}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> E-mail </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {everfitContactDetails.email}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> comment </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {everfitContactDetails.message ? everfitContactDetails.message : "--"}
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
                    {everfitContactDetails.date &&
                      everfitContactDetails.date.split("T")[0]}
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
                    {everfitContactDetails.date &&
                      everfitContactDetails.date.split("T")[1].split(".")[0]}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> BPJEPSAF </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {!everfitContactDetails.BPJEPSAF
                      ? "--"
                      : everfitContactDetails.BPJEPSAF}
                  </span>
                </Col>
              </Row>
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
});
const mapStateToProps = (state) => {
  return {
    contactReducer: state.EverfitContactReducer,
    adminReducer: state.AdminReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EverfitContactModal);;

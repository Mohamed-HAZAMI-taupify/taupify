import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import { rendezVousToggle } from "../../../../../redux/actions/RdvActions";
import { rendezVousToggle } from "../../../../../../../redux/actions/RdvActions";
import { Col, Row, Container } from "reactstrap";
import { Card } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 40,
    transform: "translateZ(0px)",
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    "& .MuiFab-primary": {
      backgroundColor: "black",
    },
  },
}));

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const actions = [
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <FavoriteIcon />, name: "Like" },
];

const RendezVousModal = (props) => {
  const { modal } = props.rendezVousReducer.rendezVousToggle;
  const { toggle } = props.rendezVousToggle;
  const { rendezVousDetails } = props.rendezVousReducer;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      contentClassName="modalDetailStyle"
      size="md"
      centered
    >
      <ModalHeader toggle={toggle} className="prospect-header"></ModalHeader>
      <ModalBody className="body-details-prospect body-details-rendezVous ">
        <div className="modal-title header-prospect">rendez-vous</div>
        <Container className="c ²ontainer-details-prospect">
          <Card className="card-details-prospect">
            <Card.Body>
              <Row xs="1" sm="2">
                <Col>
                  {" "}
                  <span className="text-prospect-detail"> Prénom : </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {rendezVousDetails.prenom}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Nom : </span>{" "}
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {rendezVousDetails.nom}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  <span className="text-prospect-detail"> Téléphone : </span>{" "}
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {rendezVousDetails.phone}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  {" "}
                  <span className="text-prospect-detail"> E-mail : </span>{" "}
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {rendezVousDetails.email}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  {" "}
                  <span className="text-prospect-detail">Date : </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {new Date(rendezVousDetails.datee).toLocaleDateString(
                      "fr",
                      DATE_OPTIONS
                    )}
                  </span>
                </Col>
              </Row>
              <Row xs="1" sm="2">
                <Col>
                  {" "}
                  <span className="text-prospect-detail">heure : </span>
                </Col>
                <Col>
                  <span className="text-prospect-detail-content">
                    {rendezVousDetails.temps}
                  </span>
                </Col>
              </Row>
              {rendezVousDetails.deleted ? (
                <Row xs="1" sm="2">
                  <Col>
                    {" "}
                    <span className="text-prospect-detail">DELETED </span>
                  </Col>
                  <Col>
                    <span className="text-prospect-detail-content">
                      {rendezVousDetails.motifAnnulation}
                    </span>
                  </Col>
                </Row>
              ) : null}
              <div className={classes.root}>
                <SpeedDial
                  FabProps={{ size: "small" }}
                  ariaLabel="SpeedDial openIcon example"
                  className={classes.speedDial}
                  hidden={hidden}
                  icon={<EditIcon />}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  open={open}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={handleClose}
                    />
                  ))}
                </SpeedDial>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </ModalBody>
    </Modal>
  );
};
const mapDispatchToProps = (dispatch) => ({
  rendezVousToggle: (modal) => {
    dispatch(rendezVousToggle(modal));
  },
});
const mapStateToProps = (state) => {
  return {
    rendezVousReducer: state.RendezVousReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RendezVousModal);

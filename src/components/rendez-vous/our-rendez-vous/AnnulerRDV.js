import React, { useState } from "react";
import { TextareaAutosize } from "@material-ui/core";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import "react-day-picker/lib/style.css";
import { cancelrdv } from "../../../redux/actions/RdvActions";
import { connect } from "react-redux";
import PublicIcon from "@material-ui/icons/Public";
import CancelIcon from "@material-ui/icons/Cancel";
import { data } from "../../../data/routes/routesData";
var curr = new Date();
curr.setDate(curr.getDate() + 2);

const DATE_OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const AnnulerRDV = (props) => {
  const [annuler, setannuler] = useState("");

  var getId = props.location.search;
  var id = getId.replace("?", "");
  const rdvsss = props.rendezVousReducer.rdvFilteredList.filter(
    (t) => t._id === id
  );
  const rdvsssver = props.rendezVousReducer.rdvFilteredList.filter(
    (t) => t._id === id && t.isCanceled === true
  );

  const handleAnnulerChange = (event) => {
    setannuler(event.target.value);
  };
  return (
    <div className="containerrrs">
      <div className="galllery">
        <div className="thumbnailsss">
          {rdvsssver.length > 0 ? (
            <Card className="thumbnaillll">
              <CardBody className="card">
                <div className="div-card-thumbnail">
                  <div className="first-part-annulation">
                    <CancelIcon className="cancelButton" />
                    <div>
                      <span className="upper-text upper-text-weight">
                        Annulation Confirmé
                      </span>
                    </div>
                    <p className="paragraph-grey">
                      Votre réunion avec EVEREST a été annulée.
                    </p>
                  </div>

                  <br />

                  <div className="second-part-confirmation">
                    <div>
                      {" "}
                      <span className="upper-text">Jours privilèges </span>
                    </div>
                    {rdvsssver.map((t) => (
                      <h2 className="date-time-text-annulation display-color-text-annulation">
                        {" "}
                        <EventIcon />{" "}
                        {new Date(t.plannedForDate).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}{" "}
                        {t.plannedForTime}{" "}
                      </h2>
                    ))}

                    <h3 className="footer-text">
                      <PublicIcon /> Heure d'Europe centrale{" "}
                    </h3>

                    <h3 className="footer-text">
                      <RoomIcon /> 4 rue de l'Escale 25000 Besancon
                    </h3>

                    <a href={data.rendez_vous} className="text-deco-link">
                      <Button className="btn-conf"> Replanifier </Button>
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card className="thumbnaillll">
              <CardBody>
                <Row>
                  <Col sm={4} className="card-body-fisrt-row">
                    <h4 className="prdv">EVEREST</h4>
                    <h2 className="lefth2 lefth2-font-size">
                      {" "}
                      Jours privilèges{" "}
                    </h2>
                    <br />
                    <h3 className="paragraph-grey">
                      <RoomIcon /> 4 rue de l'Escale 25000 Besancon
                    </h3>
                    {rdvsss.map((t) => (
                      <div>
                        <h2 className="prdv prdv-color">
                          {" "}
                          <EventIcon />{" "}
                          {new Date(t.plannedForDate).toLocaleDateString(
                            "fr",
                            DATE_OPTIONS
                          )}{" "}
                          {t.plannedForTime}{" "}
                        </h2>
                        <h2 className="prdv prdv-color">
                          {" "}
                          <ScheduleIcon /> 30 min{" "}
                        </h2>
                        <h3 className="heurec">
                          {" "}
                          <PublicIcon /> Heure d'Europe centrale{" "}
                        </h3>
                      </div>
                    ))}
                  </Col>
                  <Col sm={8}>
                    <div className="margin-second-col-annulation">
                      <div className="div-annulation">
                        <span className="prdv span">Motif d'annulation</span>
                        <br />

                        <TextareaAutosize
                          className="textarea"
                          aria-label="minimum height"
                          rowsMin={4}
                          required
                          fullWidth
                          autoFocus
                          value={annuler}
                          onChange={handleAnnulerChange}
                        />
                      </div>

                      {rdvsss.map((t) => (
                        <div className="rdv-div-btn-annuler">
                          <Button
                            variant="contained"
                            color="info"
                            onClick={async () => {
                              await props.cancelrdv(id, annuler, t);
                            }}
                            fullWidth
                            className="rdv-btn"
                          >
                            {"Annuler l'événement"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  cancelrdv: (t, a, k) => {
    dispatch(cancelrdv(t, a, k));
  },
});
const mapStateToProps = (state) => {
  return {
    rendezVousReducer: state.RendezVousReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnulerRDV);

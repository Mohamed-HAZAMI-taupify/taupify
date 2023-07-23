import React, { useEffect } from "react";
import { TextField, IconButton } from "@material-ui/core";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import EventIcon from "@material-ui/icons/Event";
import { toggle } from "../../../redux/actions/AdminActions";
import RoomIcon from "@material-ui/icons/Room";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import MuiAlert from "@material-ui/lab/Alert";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import { addToRdvs, getfilteredRdvs } from "../../../redux/actions/RdvActions";
import { connect } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PublicIcon from "@material-ui/icons/Public";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const tempsss = [
  { tt: "08:00" },
  { tt: "08:30" },
  { tt: "09:00" },
  { tt: "09:30" },
  { tt: "10:00" },
  { tt: "10:30" },
  { tt: "11:00" },
  { tt: "11:30" },
  { tt: "12:00" },
  { tt: "12:30" },
  { tt: "13:00" },
  { tt: "13:30" },
  { tt: "14:00" },
  { tt: "14:30" },
  { tt: "15:00" },
  { tt: "15:30" },
  { tt: "16:00" },
  { tt: "16:30" },
  { tt: "17:00" },
  { tt: "17:30" },
  { tt: "18:00" },
  { tt: "18:30" },
  { tt: "19:00" },
  { tt: "19:30" },
];

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "May",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

var curr = new Date();
curr.setDate(curr.getDate() + 2);
var date = curr.toISOString().substr(0, 10);

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const TakeRendezVous = (props) => {
  const {
    searching,
    searchDate,
    searchMonth,
    searchDateState,
    page,
    switched,
  } = props.searchingResult.searching;

  useEffect(() => {
    props.getfilteredRdvs({
      switched,
      searching,
      searchDate,
      searchMonth,
      searchDateState,
    });
  }, []);

  const [showOne, setShowOne] = React.useState(true);
  const [showTwo, setShowTwo] = React.useState(false);
  const [showThree, setShowThree] = React.useState(false);

  //// one ////////////////
  const [valueTwo, handlevalChange] = React.useState(new Date());

  ////two ////////////////
  const [sixrdvs, setsixrdvs] = React.useState([]);

  const [calc0800, setcalc0800] = React.useState(0);
  const [calc0830, setcalc0830] = React.useState(0);
  const [calc, setcalc] = React.useState(0);
  const [calc930, setcalc930] = React.useState(0);
  const [calc1000, setcalc1000] = React.useState(0);
  const [calc1030, setcalc1030] = React.useState(0);
  const [calc1100, setcalc1100] = React.useState(0);
  const [calc1130, setcalc1130] = React.useState(0);
  const [calc1200, setcalc1200] = React.useState(0);
  const [calc1230, setcalc1230] = React.useState(0);
  const [calc1300, setcalc1300] = React.useState(0);
  const [calc1330, setcalc1330] = React.useState(0);
  const [calc1400, setcalc1400] = React.useState(0);
  const [calc1430, setcalc1430] = React.useState(0);
  const [calc1500, setcalc1500] = React.useState(0);
  const [calc1530, setcalc1530] = React.useState(0);
  const [calc1600, setcalc1600] = React.useState(0);
  const [calc1630, setcalc1630] = React.useState(0);
  const [calc1700, setcalc1700] = React.useState(0);
  const [calc1730, setcalc1730] = React.useState(0);
  const [calc1800, setcalc1800] = React.useState(0);
  const [calc1830, setcalc1830] = React.useState(0);
  const [calc1900, setcalc1900] = React.useState(0);
  const [calc1930, setcalc1930] = React.useState(0);

  const [activeStep, setActiveStep] = React.useState(0);

  const nextTwo = () => {
    setShowOne(false);
    setShowTwo(true);
    setShowThree(false);
    handlevalChange(plannedForDate);
    setActiveStep(1);
  };

  const backOne = () => {
    setShowOne(true);
    setShowTwo(false);
    setShowThree(false);
    handlevalChange(plannedForDate);
    setActiveStep(0);
  };

  const currentYear = new Date().getFullYear();
  const fromMonth = new Date(currentYear, 3);
  const toMonth = new Date(currentYear, 3);

  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState(null);
  const [plannedForDate, setPlannedForDate] = React.useState(undefined);
  const [plannedForTime, setPlannedForTime] = React.useState(undefined);
  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePlannedForDateChange = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    setPlannedForDate(modifiers.selected ? undefined : day);

    const sixrdvss = props.rendezVousReducer.filteredRdvs.filter(
      (el) =>
        new Date(el.plannedForDate).toISOString().substr(0, 10) ===
          new Date(day).toISOString().substr(0, 10) && el.isCanceled === false
    );
    setrdvsCount(sixrdvss.length);
    setsixrdvs(sixrdvss);

    setcalc0800(sixrdvss.filter((el) => el.plannedForTime === "08:00").length);

    setcalc0830(sixrdvss.filter((el) => el.plannedForTime === "08:30").length);

    setcalc(sixrdvss.filter((el) => el.plannedForTime === "09:00").length);

    setcalc930(sixrdvss.filter((el) => el.plannedForTime === "09:30").length);

    setcalc1000(sixrdvss.filter((el) => el.plannedForTime === "10:00").length);

    setcalc1030(sixrdvss.filter((el) => el.plannedForTime === "10:30").length);

    setcalc1100(sixrdvss.filter((el) => el.plannedForTime === "11:00").length);

    setcalc1130(sixrdvss.filter((el) => el.plannedForTime === "11:30").length);

    setcalc1200(sixrdvss.filter((el) => el.plannedForTime === "12:00").length);

    setcalc1230(sixrdvss.filter((el) => el.plannedForTime === "12:30").length);

    setcalc1300(sixrdvss.filter((el) => el.plannedForTime === "13:00").length);

    setcalc1330(sixrdvss.filter((el) => el.plannedForTime === "13:30").length);

    setcalc1400(sixrdvss.filter((el) => el.plannedForTime === "14:00").length);

    setcalc1430(sixrdvss.filter((el) => el.plannedForTime === "14:30").length);

    setcalc1500(sixrdvss.filter((el) => el.plannedForTime === "15:00").length);

    setcalc1530(sixrdvss.filter((el) => el.plannedForTime === "15:30").length);

    setcalc1600(sixrdvss.filter((el) => el.plannedForTime === "16:00").length);

    setcalc1630(sixrdvss.filter((el) => el.plannedForTime === "16:30").length);

    setcalc1700(sixrdvss.filter((el) => el.plannedForTime === "17:00").length);

    setcalc1730(sixrdvss.filter((el) => el.plannedForTime === "17:30").length);

    setcalc1800(sixrdvss.filter((el) => el.plannedForTime === "18:00").length);

    setcalc1830(sixrdvss.filter((el) => el.plannedForTime === "18:30").length);

    setcalc1900(sixrdvss.filter((el) => el.plannedForTime === "19:00").length);

    setcalc1930(sixrdvss.filter((el) => el.plannedForTime === "19:30").length);
  };
  const handlePlannedForTimeChange = (event) => {
    setPlannedForTime(event);
    setcalc(sixrdvs.filter((el) => el.plannedForTime === event).length);

    setcalc0800(sixrdvs.filter((el) => el.plannedForTime === "08:00").length);

    setcalc0830(sixrdvs.filter((el) => el.plannedForTime === "08:30").length);

    setcalc(sixrdvs.filter((el) => el.plannedForTime === "09:00").length);

    setcalc930(sixrdvs.filter((el) => el.plannedForTime === "09:30").length);

    setcalc1000(sixrdvs.filter((el) => el.plannedForTime === "10:00").length);

    setcalc1030(sixrdvs.filter((el) => el.plannedForTime === "10:30").length);

    setcalc1100(sixrdvs.filter((el) => el.plannedForTime === "11:00").length);

    setcalc1130(sixrdvs.filter((el) => el.plannedForTime === "11:30").length);

    setcalc1200(sixrdvs.filter((el) => el.plannedForTime === "12:00").length);

    setcalc1230(sixrdvs.filter((el) => el.plannedForTime === "12:30").length);

    setcalc1300(sixrdvs.filter((el) => el.plannedForTime === "13:00").length);

    setcalc1330(sixrdvs.filter((el) => el.plannedForTime === "13:30").length);

    setcalc1400(sixrdvs.filter((el) => el.plannedForTime === "14:00").length);

    setcalc1430(sixrdvs.filter((el) => el.plannedForTime === "14:30").length);

    setcalc1500(sixrdvs.filter((el) => el.plannedForTime === "15:00").length);

    setcalc1530(sixrdvs.filter((el) => el.plannedForTime === "15:30").length);

    setcalc1600(sixrdvs.filter((el) => el.plannedForTime === "16:00").length);

    setcalc1630(sixrdvs.filter((el) => el.plannedForTime === "16:30").length);

    setcalc1700(sixrdvs.filter((el) => el.plannedForTime === "17:00").length);

    setcalc1730(sixrdvs.filter((el) => el.plannedForTime === "17:30").length);

    setcalc1800(sixrdvs.filter((el) => el.plannedForTime === "18:00").length);

    setcalc1830(sixrdvs.filter((el) => el.plannedForTime === "18:30").length);

    setcalc1900(sixrdvs.filter((el) => el.plannedForTime === "19:00").length);

    setcalc1930(sixrdvs.filter((el) => el.plannedForTime === "19:30").length);
  };

  const [rdvsCount, setrdvsCount] = React.useState(0);

  let confirmRdv = props.adminReducer.modal.confirmRdv;

  const rdvReTake = () => {
    window.location.reload();
  };

  const addRDV = () => {
    props.addToRdvs({
      lastname,
      firstname,
      email,
      plannedForDate,
      plannedForTime,
      phone,
    });
  };

  const alert = props.alertReducer.alerts;

  return (
    <div className="containerrrs">
      <div className="galllery">
        <div className="thumbnailsss">
          {confirmRdv ? (
            <Card className="thumbnaillll">
              <CardBody className="card">
                <div className="div-card-thumbnail">
                  <div className="first-part-confirmation">
                    <CheckCircleIcon className="cancelButton" />
                    <div>
                      {" "}
                      <span className="upper-text upper-text-weight">
                        Confirmé
                      </span>{" "}
                    </div>
                    <p className="paragraph-grey">
                      Vous avez un rendez vous avec EVEREST
                    </p>
                    <Button className="btn-conf" onClick={rdvReTake}>
                      {" "}
                      Planifier un autre RDV{" "}
                    </Button>
                  </div>

                  <br />

                  <div className="second-part-confirmation">
                    <div>
                      {" "}
                      <span className="upper-text">Jours privilèges </span>{" "}
                    </div>

                    <h2 className="date-time-text display-color-text-confirmation">
                      {" "}
                      <EventIcon />{" "}
                      {new Date(plannedForDate).toLocaleDateString(
                        "fr",
                        DATE_OPTIONS
                      )}{" "}
                      {plannedForTime}{" "}
                    </h2>

                    <h3 className="footer-text">
                      {" "}
                      <PublicIcon /> Heure d'Europe centrale{" "}
                    </h3>

                    <h3 className="footer-text">
                      <RoomIcon /> 4 rue de l'Escale 25000 Besancon
                    </h3>
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card className="thumbnaillll">
              <CardBody>
                <div>
                  <Row>
                    <Col sm={2}>
                      {showTwo ? (
                        <IconButton onClick={backOne}>
                          <ArrowBackIcon className="ArrowBackIcon-size" />
                        </IconButton>
                      ) : null}
                    </Col>
                    <Col sm={10}></Col>
                  </Row>
                  <Row className="card-body-row">
                    <Col sm={4} className="card-body-fisrt-col">
                      <h4 className="prdv">EVEREST</h4>
                      <h2 className="lefth2 lefth2-font-size">
                        {" "}
                        Jours privilèges{" "}
                      </h2>
                      <br />
                      <h3 className="side-bar-rendez-vous paragraph-grey">
                        <AccessTimeIcon /> &nbsp;30&nbsp;min
                      </h3>
                      <h3 className="side-bar-rendez-vous paragraph-grey">
                        <RoomIcon />
                        &nbsp; 4 rue de l'Escale 25000 Besancon
                      </h3>
                      {showTwo ? (
                        <h2 className="prdv prdv-take-rdv">
                          {" "}
                          <EventIcon />{" "}
                          {new Date(plannedForDate).toLocaleDateString(
                            "fr",
                            DATE_OPTIONS
                          )}{" "}
                          {plannedForTime} <br />
                        </h2>
                      ) : null}
                      <br />
                      <p className="prdv">Attention, offre limitée ! </p>
                    </Col>
                    <Col sm={8}>
                      {/* //////////// one /////////////// */}
                      {showOne ? (
                        <div>
                          <div>
                            <p className="prdv prdv-take-rdv">
                              {" "}
                              {plannedForDate
                                ? new Date(plannedForDate).toLocaleDateString(
                                    "fr",
                                    DATE_OPTIONS
                                  )
                                : "Sélectionnez la date et l'heure"}{" "}
                              {plannedForTime}{" "}
                            </p>
                            <div>
                              <div className="row-time row-time-overflow">
                                {plannedForDate !== undefined ? (
                                  <Row>
                                    <Col sm={7}>
                                      <div>
                                        <DayPicker
                                          selectedDays={plannedForDate}
                                          onDayClick={
                                            handlePlannedForDateChange
                                          }
                                          disabledDays={[
                                            { daysOfWeek: [0] },
                                            (day) => day < new Date(),
                                          ]}
                                          fromMonth={fromMonth}
                                          toMonth={toMonth}
                                          weekdaysShort={[
                                            "DIM",
                                            "LUN",
                                            "MAR",
                                            "MER",
                                            "JEU",
                                            "VEN",
                                            "SAM",
                                          ]}
                                          months={MONTHS}
                                        />
                                      </div>
                                    </Col>

                                    <Col sm={5}>
                                      <div className="scrolltemps">
                                        {tempsss.map((t, index) => (
                                          <Button
                                            outline={
                                              plannedForTime === t.tt
                                                ? false
                                                : true
                                            }
                                            color="info"
                                            key={t.tt}
                                            className="time-rdv-btn button-margin"
                                            disabled={
                                              (calc >= 5 && t.tt === "09:00") ||
                                              (calc930 >= 5 &&
                                                t.tt === "09:30") ||
                                              (calc0800 >= 5 &&
                                                t.tt === "08:00") ||
                                              (calc0830 >= 5 &&
                                                t.tt === "08:30") ||
                                              (calc1000 >= 5 &&
                                                t.tt === "10:00") ||
                                              (calc1030 >= 5 &&
                                                t.tt === "10:30") ||
                                              (calc1100 >= 5 &&
                                                t.tt === "11:00") ||
                                              (calc1130 >= 5 &&
                                                t.tt === "11:30") ||
                                              (calc1200 >= 5 &&
                                                t.tt === "12:00") ||
                                              (calc1230 >= 5 &&
                                                t.tt === "12:30") ||
                                              (calc1300 >= 5 &&
                                                t.tt === "13:00") ||
                                              (calc1330 >= 5 &&
                                                t.tt === "13:30") ||
                                              (calc1400 >= 5 &&
                                                t.tt === "14:00") ||
                                              (calc1430 >= 5 &&
                                                t.tt === "14:30") ||
                                              (calc1500 >= 5 &&
                                                t.tt === "15:00") ||
                                              (calc1530 >= 5 &&
                                                t.tt === "15:30") ||
                                              (calc1600 >= 5 &&
                                                t.tt === "16:00") ||
                                              (calc1630 >= 5 &&
                                                t.tt === "16:30") ||
                                              (calc1700 >= 5 &&
                                                t.tt === "17:00") ||
                                              (calc1730 >= 5 &&
                                                t.tt === "17:30") ||
                                              (calc1800 >= 5 &&
                                                t.tt === "18:00") ||
                                              (calc1830 >= 5 &&
                                                t.tt === "18:30") ||
                                              (calc1900 >= 5 &&
                                                t.tt === "19:00") ||
                                              (calc1930 >= 5 &&
                                                t.tt === "19:30")
                                                ? true
                                                : false
                                            }
                                            onClick={() =>
                                              handlePlannedForTimeChange(t.tt)
                                            }
                                          >
                                            {" "}
                                            {t.tt}{" "}
                                          </Button>
                                        ))}
                                      </div>
                                    </Col>
                                  </Row>
                                ) : (
                                  <Row>
                                    <Col sm={7}>
                                      <div>
                                        <DayPicker
                                          selectedDays={plannedForDate}
                                          onDayClick={
                                            handlePlannedForDateChange
                                          }
                                          disabledDays={[
                                            { daysOfWeek: [0] },
                                            (day) => day < new Date(),
                                          ]}
                                          fromMonth={fromMonth}
                                          toMonth={toMonth}
                                          weekdaysShort={[
                                            "DIM",
                                            "LUN",
                                            "MAR",
                                            "MER",
                                            "JEU",
                                            "VEN",
                                            "SAM",
                                          ]}
                                          months={MONTHS}
                                        />
                                      </div>
                                    </Col>
                                    <Col sm={5}></Col>
                                  </Row>
                                )}
                              </div>
                            </div>

                            <div className="rdv-div-btn">
                              <Button
                                variant="contained"
                                className="rdv-btn"
                                color="info"
                                onClick={nextTwo}
                                disabled={
                                  plannedForTime === undefined ||
                                  plannedForTime === "" ||
                                  plannedForDate === null ||
                                  plannedForDate === undefined
                                    ? true
                                    : false
                                }
                                fullWidth
                              >
                                {"Confirmer"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {/* /////////// Two //////////////// */}
                      {showTwo ? (
                        <div>
                          <div className="row-form">
                            <Row>
                              <Col sm={2}></Col>
                              <Col sm={8}>
                                <Row className="marg marg-top">
                                  <Col>
                                    <h3 className="text-bold">
                                      Veuillez remplir le formulaire
                                    </h3>
                                  </Col>
                                </Row>
                                <br />
                                <Row className="marg">
                                  <Col>
                                    <TextField
                                      autoComplete="fname"
                                      name="lastname"
                                      variant="outlined"
                                      required
                                      fullWidth
                                      id="nom"
                                      label="Nom"
                                      autoFocus
                                      value={lastname}
                                      onChange={handleLastnameChange}
                                    />
                                    <label className="alert alert-font-size">
                                      {alert.firstname && alert.firstname}
                                    </label>
                                  </Col>
                                </Row>
                                <Row className="marg">
                                  <Col>
                                    <TextField
                                      variant="outlined"
                                      required
                                      fullWidth
                                      id="prenom"
                                      label="Prénom"
                                      name="firstname"
                                      autoComplete="prenom"
                                      value={firstname}
                                      onChange={handleFirstnameChange}
                                    />
                                    <label className="alert alert-font-size">
                                      {alert.lastname && alert.lastname}
                                    </label>
                                  </Col>
                                </Row>
                                <Row className="marg">
                                  <Col>
                                    <TextField
                                      variant="outlined"
                                      required
                                      fullWidth
                                      id="email"
                                      label="Email"
                                      name="email"
                                      autoComplete="email"
                                      value={email}
                                      onChange={handleEmailChange}
                                    />
                                    <label className="alert alert-font-size">
                                      {alert.email && alert.email}
                                    </label>
                                  </Col>
                                </Row>

                                <Row className="marg">
                                  <Col>
                                    <TextField
                                      variant="outlined"
                                      required
                                      fullWidth
                                      id="telephone"
                                      label="Télephone"
                                      name="telephone"
                                      autoComplete="telephone"
                                      value={phone}
                                      onChange={handlePhoneChange}
                                      type="number"
                                    />
                                    <label className="alert alert-font-size">
                                      {alert.phone && alert.phone}
                                    </label>
                                  </Col>
                                </Row>

                                <div className="rdv-div-btn-submit">
                                  <Button
                                    variant="contained"
                                    className="rdv-btn rdv-div-btn-margin"
                                    color="info"
                                    onClick={() => {
                                      addRDV();
                                    }}
                                    fullWidth
                                  >
                                    <span>Enregistrer</span>
                                  </Button>
                                </div>
                              </Col>
                              <Col sm={2}></Col>
                            </Row>
                          </div>
                          <br />
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getfilteredRdvs: (filter, skip) => {
    dispatch(getfilteredRdvs(filter, skip));
  },
  addToRdvs: (rdv) => {
    dispatch(addToRdvs(rdv));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    adminReducer: state.AdminReducer,
    rendezVousReducer: state.RendezVousReducer,
    searchingResult: state.SearchingReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TakeRendezVous);

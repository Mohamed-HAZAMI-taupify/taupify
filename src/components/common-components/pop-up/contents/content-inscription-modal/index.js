import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { toggle } from "../../../../../redux/actions/AdminActions";
import { addPopUpNbre } from "../../../../../redux/actions/PopUpClickActions";
import { addContactEverest } from "../../../../../redux/actions/ContactEverestActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "10ch",
    },
  },
  joinInput: {
    width: "100%",
    height: "16.666%",

    "& .MuiInputBase-multiline": {
      lineHeight: "40px",
      padding: "0px",
      height: "27px",
    },
    "& .MuiInputBase-input": {
      fontSize: "1.5em",
      lineHeight: "20px",
      height: "27px",
      padding: "0px",
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "1px solid #a8cfbd",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid rgb(0 0 0)",
    },
  },
}));
function ConetntInscriptionModal(props) {
  const { alerts } = props.alertReducer;

  const classes = useStyles();
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    email: "",
    mobile: "",
    sourceId: "pop_up",
    subscribe: true,
    state: "prospect",
  });
  const onChange = (e) => {
    let el = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: el });
  };
  const { givenName, familyName, email, mobile, subscribe } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    await props.addPopUpNbre(1);
    await props.addContactEverest(formData, "pop_up");
  };

  return (
    <section className="modal-right-inscri">
      <img
        className="img-logo"
        src="https://i.ibb.co/qF62zhh/logo-everest.png"
      />

      <h2 className="promo-modal-title">
        COMMENCEZ L'EXPERIENCE EVEREST AUJOURD'HUI
      </h2>

      <p className="promo-description-modal">
        Inscrivez-vous simplement à notre newsletter et profitez d'une offre de
        bienvenue
      </p>

      {/* ////////////// form///////////// */}
      <form onSubmit={(e) => onSubmit(e)}>
        <div id="1" className="form">
          <div className="inputs">
            <div className="input">
              <h3 className="label-input-f">PRÉNOM</h3>
              <TextField
                className={classes.joinInput}
                name="givenName"
                value={givenName}
                onChange={(e) => onChange(e)}
              />
              <label className="alert">
                {alerts.givenName && alerts.givenName}
              </label>

              <h3 className="label-input-f">ADRESSE MAIL</h3>

              <TextField
                className={classes.joinInput}
                value={email}
                name="email"
                onChange={(e) => onChange(e)}
              />
              <label className="alert">{alerts.email && alerts.email}</label>
            </div>
            <div className="input">
              <h3 className="label-input-f">NOM</h3>
              <TextField
                className={classes.joinInput}
                value={familyName}
                name="familyName"
                onChange={(e) => onChange(e)}
              />
              <label className="alert">
                {alerts.familyName && alerts.familyName}
              </label>

              <h3 className="label-input-f">TÉLÉPHONE</h3>
              <TextField
                className={classes.joinInput}
                type="number"
                value={mobile}
                name="mobile"
                onChange={(e) => onChange(e)}
              />
              <label className="alert">{alerts.mobile && alerts.mobile}</label>
            </div>
          </div>
          <div className="input-checkbox-form">
            <input
              color="black"
              checked={subscribe}
              type="checkbox"
              name="subscribe"
              onChange={(e) => onChange(e)}
              className="ckeck-box-input"
            ></input>
            <span className="input-label">
            Envoyez-moi des offres et des conseils d'entraînement, de nutrition et de fitness par e-mail, sms, WhatsApp et RCS.
            </span>
          </div>
          <button type="submit" className=" btn-ev hvr-transparent uppercase">
            <span>J'en profite</span>
          </button>
        </div>
      </form>
    </section>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addContactEverest: (prospect, state) => {
    dispatch(addContactEverest(prospect, state));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  addPopUpNbre: (nbr) => {
    dispatch(addPopUpNbre(nbr));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    adminReducer: state.AdminReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConetntInscriptionModal);

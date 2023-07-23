import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import ImageLoader from "../common-components/image-loader";
import { addContactForm } from "../../redux/actions/contact-formulaire/ContactActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "10ch",
    },
  },
  joinInput: {
    width: "100%",
    "& .MuiInputBase-multiline": {
      fontSize: "2em",
      lineHeight: "40px",
    },
    "& .MuiInputBase-input": {
      fontSize: "2em",
      lineHeight: "40px",
      height: "40px",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #a8cfbd",
    },
  },
}));
const FormulaireEverest = (props) => {
  const { alerts } = props.alertReducer;

  const classes = useStyles();
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    email: "",
    mobile: "",
    subscribe: true,
  });
  const { givenName, familyName, email, mobile, subscribe } = formData;

  const onChange = (e) => {
    let el = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: el });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await props.addContactForm(formData);
  };

  return (
    <section className="rejoignez-nous">
      <section className="first-section">
        <ImageLoader
          alt="rejoignez nous"
          className="rejoignez-nous-image"
          src="https://i.ibb.co/FqgVHKD/Whats-App-Image-2023-02-08-at-14-47-15.jpg"
        />
        <h1 className="join-us-title">

        Séance découverte gratuite à Everest à l’occasion de la Saint Valentin  <br />

        </h1>
        <a href="#formulaire" className="bottom-direction">
        Inscrivez-vous
        </a>
      </section>
      <section className="inscription">
        <form onSubmit={(e) => onSubmit(e)}>
          <div id="formulaire" className="form">
            <h2 className=" inscription-description">
              Remplissez le formulaire
            </h2>
            <p>
            Nous vous contacterons pour fixer la date de votre séance découverte
            </p>
            <div className="inputs">
              <div className="input">
                <h3>
                  PRÉNOM <span className="required-label">*</span>
                </h3>
                <TextField
                  className={classes.joinInput}
                  name="givenName"
                  value={givenName}
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">
                  {alerts.givenName && alerts.givenName}
                </label>
              </div>
              <div className="input">
                <h3>
                  NOM <span className="required-label">*</span>
                </h3>
                <TextField
                  style={{ height: "50px" }}
                  className={classes.joinInput}
                  id="join-input1"
                  value={familyName}
                  name="familyName"
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">
                  {alerts.familyName && alerts.familyName}
                </label>
              </div>
              <div className="input">
                <h3>
                  ADRESSE MAIL <span className="required-label">*</span>
                </h3>
                <TextField
                  className={classes.joinInput}
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">{alerts.email && alerts.email}</label>
              </div>
              <div className="input">
                <h3>
                  TÉLÉPHONE <span className="required-label">*</span>
                </h3>
                <TextField
                  className={classes.joinInput}
                  type="number"
                  value={mobile}
                  name="mobile"
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">
                  {alerts.mobile && alerts.mobile}
                </label>
              </div>
            </div>
            <p> Il est temps de découvrir les cours Everest</p>
            <div className="input-checkbox">
              <input
                color="black"
                checked={subscribe}
                type="checkbox"
                name="subscribe"
                onChange={(e) => onChange(e)}
              ></input>
              <span className="input-label">
              Envoyez-moi des offres et des conseils d'entraînement, de nutrition et de fitness par e-mail, sms, WhatsApp et RCS.
              </span>
            </div>
            <button className="rejoignez-nous-button" type="submit">
              <span className="rejoignez-nous-button-span">Envoyer</span>
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addContactForm: (data) => {
    dispatch(addContactForm(data));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormulaireEverest);
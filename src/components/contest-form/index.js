import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import ImageLoader from "../common-components/image-loader";
import { addContactGame } from "../../redux/actions/contact-game/ContactActions";
import { useMediaQuery } from "react-responsive";

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
const ContestForm = (props) => {
  const { alerts } = props.alertReducer;
  const DesktopImage = ({ children }) => {
    const isDesktop = useMediaQuery({ maxWidth: 2500, minWidth: 970 });
    return isDesktop ? children : null;
  };
  const ResponsiveImageTablette = ({ children }) => {
    const isDesktop = useMediaQuery({ maxWidth: 970, minWidth: 560 });
    return isDesktop ? children : null;
  };

  const ResponsiveImageMobile = ({ children }) => {
    const isTablette = useMediaQuery({ maxWidth: 560 });
    return isTablette ? children : null;
  };

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

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData });
    props.addContactGame(formData);
  };

  return (
    <section className="global-container-form">
      <section className="header-section">
        <DesktopImage>
          <ImageLoader
            alt="rejoignez nous"
            className="contest-image"
            src="https://i.ibb.co/GTp4k8j/320542614-532567001917099-8196536563422196522-n-1.jpg"
          />
        </DesktopImage>

        <ResponsiveImageTablette>
          <ImageLoader
            alt="rejoignez nous-become-coach"
            className="contest-image-tablette"
            src="https://i.ibb.co/pXzFySf/version-tablette.png"
          />
        </ResponsiveImageTablette>
        <ResponsiveImageMobile>
          <ImageLoader
            alt="rejoignez nous-become-coach"
            className="contest-image-mobile"
            src="https://i.ibb.co/0rgBdnh/version-mobile.png"
          />
        </ResponsiveImageMobile>
      </section>
      <section className="inscription">
        <form onSubmit={(e) => onSubmit(e)}>
          <div id="1" className="form">
            <h2 className="weight-medium inscription-description">
              Remplissez le formulaire
            </h2>
            <p>Laissez vos coordonnées pour participer au jeu concours</p>
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
            <p>COMMENCEZ AUJOURD'HUI</p>
            <div className="input-checkbox">
              <input
                color="black"
                checked={subscribe}
                type="checkbox"
                name="subscribe"
                onChange={(e) => onChange(e)}
              ></input>
              <span className="input-label">
                Envoyez-moi des offres et des conseils d'entraînement, de
                nutrition et de fitness par e-mail, sms, WhatsApp et RCS.
              </span>
            </div>
            <button className="rejoignez-nous-button" type="submit">
              <span className="rejoignez-nous-button-span">ENVOYER</span>
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addContactGame: (data) => {
    dispatch(addContactGame(data));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContestForm);

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toggle } from "../../../../../redux/actions/AdminActions";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import {
  logoutEverest,
  memberSignIn,
} from "../../../../../redux/actions/authActions";
import { data } from "../../../../../data/routes/routesData";
function ConetntConnexionModal(props) {
  const { isAuthenticatedEverest } = props.authReducer;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { alerts } = props.alertReducer;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    isAuthenticatedEverest && (await props.logoutEverest());
    await props.memberSignIn(formData);
  };

  return (
    <section className="modal-right-cnx">
      <form onSubmit={(e) => onSubmit(e)}>
        <div id="1" className="form">
          <h2 className="cnx-title">CONNEXION</h2>
          <div className="cnx-inputs">
            <div className="cnx-input">
              <p>
                ADRESSE MAIL <span className="required-label">*</span>
              </p>
              <TextField
               
                value={email}
                name="email"
                onChange={(e) => onChange(e)}
              />
              <label className="alert-login">
                {alerts.email &&
                alerts.email === "Invalid username and password combination"
                  ? ""
                  : alerts.email}
              </label>
            </div>
            <div className="cnx-input">
              <p>
                MOT DE PASSE <span className="required-label">*</span>
              </p>
              <TextField
                id="standard-password-input"
                type="password"
                autoComplete="current-password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
              <label className="alert-login">
                {alerts.password &&
                (alerts.email === "Invalid username and password combination" ||
                  alerts.password ===
                    "Invalid username and password combination")
                  ? "Adresse email ou Mot de passe incorrect !"
                  : alerts.password}
              </label>
            </div>
            <button className="btn-ev btn-s" type="submit">
              <span>Me connecter</span>
            </button>
            
          </div>
          <div className="subscribe-link">
            <Link
              to={data.reset_password}
              onClick={() => {
                props.toggle("connexionModal", false);
              }}
              className="cnx-extra-link"
            >
              <span>Mot de passe oublié?</span>
            </Link>
            <Link
              to={data.rejoignez_nous}
              onClick={() => {
                props.toggle("connexionModal", false);
              }}
              className="cnx-extra-link"
            >
              <span> Vous n'avez pas de compte?</span>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  memberSignIn: (auth) => {
    dispatch(memberSignIn(auth));
  },
  logoutEverest: () => {
    dispatch(logoutEverest());
  },
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
    alertReducer: state.AlertReducer,
    authReducer: state.AuthReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConetntConnexionModal);
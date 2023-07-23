import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { toggle } from "../../../../redux/actions/AdminActions";

function RestorePassword(props) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
  };
  const alert = props.alertReducer.alerts;
  let modal_foget_password = props.adminReducer.modal.forgetPassword;
  return (
    <Modal
      isOpen={modal_foget_password}
      modalTransition={{ timeout: 800 }}
      transitionentertimeout={{ timeout: 10000 }}
      backdropTransition={{ timeout: 1000 }}
      toggle={() => {
        props.toggle("forgetPassword", false);
      }}
      className="main-modal home-page-modal"
    >
      <ModalBody className="home-page-modal-body">
        <section className="rejoignez-nous">
          <i
            className="fas fa-times home-page-x-icon"
            onClick={() => {
              props.toggle("connexionModal", false);
              history.goBack();
            }}
          ></i>
          <img
            className="rejoignez-nous-image modal-home-image"
            src="https://i.ibb.co/82md9GC/spirit.jpg"
          />
          <section className="inscription">
            <h2 className="connexion-title">
              Réinitialisation de mot de passe
            </h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div id="1" className="form">
                <div className="connexion-inputs">
                  <div className="connexion-input">
                    <p>ADRESSE MAIL</p>
                    <TextField
                     
                      value={email}
                      name="email"
                      onChange={(e) => onChange(e)}
                    />
                    <label className="alert">
                      {alert.email && alert.email}
                    </label>
                  </div>
                </div>
                <button type="submit">
                  <span>Réinitialiser</span>
                </button>
              </div>
            </form>
          </section>
        </section>
      </ModalBody>
    </Modal>
  );
}
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
    alertReducer: state.AlertReducer,
    authReducer: state.AuthReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword);

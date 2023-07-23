import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { resetPassword } from "../../redux/actions/ResetPasswordActions";

const useStyles = makeStyles((theme) => ({
  joinInput: {
    width: "auto",
    minWidth: "350px",
    padding: "0px",
    paddingRight: "45px",
    paddingLeft: "45px",
    "& .MuiInputBase-multiline": {
      fontSize: "4 em",
      lineHeight: "40px",
    },
    "& .MuiInputBase-input": {
      fontSize: "1.5em",
      fontFamily: "poppins",
      color: "#727272",
      lineHeight: "40px",
      height: "40px",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #a8cfbd",
    },
    "& .Mui-focused": {},
    "& .MuiInputLabel-shrink": {
      color: "black",
    },
  },
}));

const ResetPassword = (props) => {
  const {alerts} = props.alertReducer;

  const [formData, setFormData] = useState({
    email: "",
  });
  const classes = useStyles();

  const { email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.resetPassword(formData);
  };

  return (
    <section className="unsubscription-section">
      <div className="reset-password-box unsubscription-box ">
        <img
          src="https://i.ibb.co/3kbWYMZ/rotation-lock.png"
          className="logo"
          height="72"
          width="72"
        />
        <h2 className="reset-password-title">
          Réinitialisation de mot de passe
        </h2>
        <form className="reset-password-form" onSubmit={(e) => onSubmit(e)}>
          <h3 className="reset-password-label">
            Veuillez entrer votre adresse e-mail
          </h3>

          <TextField
            className={classes.joinInput}
           
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => onChange(e)}
          />
          <label className="alert">{alerts.email && alerts.email}</label>
          <button className="important-btn" type="submit">
            <span>envoyer</span>
          </button>
        </form>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (data) => {
    dispatch(resetPassword(data));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

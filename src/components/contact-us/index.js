import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { addContactUsMessage } from "../../redux/actions/MessageProspectAction";
import { addContactEverest } from "../../redux/actions/ContactEverestActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  joinInput: {
    width: "100%",
    "& .MuiInputBase-multiline": {
      fontSize: "2² em",
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
    "& .Mui-focused": {},
    "& .MuiInputLabel-shrink": {
      color: "black",
    },
  },
}));
const Contactus = (props) => {
  const { alerts } = props.alertReducer;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    email: "",
    mobile: "",
    state: "prospect",
    sourceId: "contact_us",
    subscribe: true,
    message: [""],
  });

  const { givenName, familyName, email, mobile, message } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.addContactEverest(formData, "contact_us")
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <section className="contact-us">
      <section className="inscription">
        <div id="1" className="form">
          <h2>VISITEZ LE CLUB</h2>
          <p>Un coach vous contactera pour prendre RDV</p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="inputs">
              <div className="input">
                <h3>
                  PRENOM <span className="required-label">*</span>
                </h3>
                <TextField
                  className={classes.joinInput}
                  multiline
                  rowsMax={4}
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
                  multiline
                  rowsMax={4}
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
                  multiline
                  rowsMax={4}
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">{alerts.email && alerts.email}</label>
              </div>
              <div className="input">
                <h3>
                  TELEPHONE <span className="required-label">*</span>
                </h3>
                <TextField
                  className={classes.joinInput}
                  type="number"
                  value={mobile}
                  name="mobile"
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">{alerts.mobile && alerts.mobile}</label>
              </div>
              <div className="input message">
                <h3>MESSAGE</h3>
                <TextField
                  id="outlined-multiline-static"
                  className={classes.joinInput}
                  label="MESSAGE"
                  multiline
                  rows={4}
                  placeholder=""
                  variant="outlined"
                  value={message}
                  name="message"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <p>COMMENCER AUJOURD'HUI</p>
            <div className="button-container">
              <button className="rejoignez-nous-button" type="submit">
                <span className="rejoignez-nous-button-span">ENVOYER</span>
              </button>
            </div>
          </form>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Demande envoyer
            </Alert>
          </Snackbar>
        </div>
      </section>
    </section>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addContactUsMessage: (contactUsProspect) => {
    dispatch(addContactUsMessage(contactUsProspect));
  },
  addContactEverest: (contact, state) => {
    dispatch(addContactEverest(contact, state));
  }
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contactus);

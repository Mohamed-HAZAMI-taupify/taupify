import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import ImageLoader from "../common-components/image-loader";
import { addContactEverest } from "../../redux/actions/ContactEverestActions";

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
const ContestGame = (props) => {
  const { alerts } = props.alertReducer;

  const classes = useStyles();
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    email: "",
    mobile: "",
    sourceId: "contest_game",
    state: "prospect",
  });
  const { givenName, familyName, email, mobile } = formData;

  const onChange = (e) => {
    let el = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: el });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await props.addContactEverest(formData, "contest_game");
  };

  return (
    <section className="rejoignez-nous">
      <section className="first-section">
        <ImageLoader
          alt="jeu concours everest"
          className="rejoignez-nous-image background-image-contest-game"
          src="https://i.ibb.co/rcjNnnc/photo2.png"
        />

        <ImageLoader
          alt="jeu concours everest"
          className="rejoignez-nous-image background-image-contest-game-mobile"
          src="https://i.ibb.co/ZL8d8St/IMG-MOBILE-2.png"
        />
        <h1 className="contest-game-title uppercase">
          fêtons ensemble le premier anniversaire everest !
        </h1>
      </section>
      <section className="inscription">
        <form onSubmit={(e) => onSubmit(e)}>
          <div id="1" className="form">
            <h2 className="contest-game-description uppercase weight-semi-bold">
              participez au grand jeu-concours et gagnez une mini cooper à
              l'occasion d'un an everest !
            </h2>
            <p>
              Il vous suffit d’acheter un pull Everest et vous serez
              automatiquement inscrit dans le tirage qui aura lieu le 18 juin !
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

            <button className="contest-game-button" type="submit">
              <span className="contest-game-span uppercase">Je participe</span>
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addContactEverest: (contact, state) => {
    dispatch(addContactEverest(contact, state));
  },
});

const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};
const ConnectedContestGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContestGame);
export default ConnectedContestGame;

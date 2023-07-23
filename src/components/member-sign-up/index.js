import {
  Card,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { post } from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Col, Row } from "react-bootstrap";
import { addMember } from "../../redux/actions/ClientActions";
import ConnexionModal from "../common-components/pop-up/pop-up-container/connexion-modal";
import { Alert } from "react-bootstrap";

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
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MemberSignUp = (props) => {
  const classes = useStyles();

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const [inscrit, setInscrit] = useState(false);
  const changeInscrit = () => {
    setInscrit(true);
  };

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [birthday, setBirthday] = React.useState("1990-01-01");

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [alertFirstName, setAlertFirstName] = React.useState("");
  const [alertLastName, setAlertLastName] = React.useState("");
  const [alertEmail, setAlertEmail] = React.useState("");
  const [alertPassword, setAlertPassword] = React.useState("");

  const [alertPhone, setAlertPhone] = React.useState("");
  const [subscribe, setSubscribe] = useState(true);

  const [civilite, setCivilite] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [file, setFile] = React.useState(
    "https://i.ibb.co/GHCw38g/unnamed22.png"
  );

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [alertConfirmedPassword, setAlertConfirmedPassword] = useState("");

  const changeConfirmedPassword = (event) => {
    setConfirmedPassword(event.target.value);
  };

  const changeCivilite = (event) => {
    setCivilite(event.target.value);
  };

  const changeBirthday = (event) => {
    setBirthday(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeSubscribe = () => {
    setSubscribe(!subscribe);
  };
  const changeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const changeLastName = (event) => {
    setLastName(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePhone = (event) => {
    setPhone(event.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    var existanceEmail = props.membersReducer.membersList
      .map((element) => element.email.toLowerCase())
      .includes(email.toLowerCase());
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailTest = re.test(String(email).toLowerCase());

    if (!firstName) {
      setAlertFirstName("Ce champs est obligatoire");
      email && setAlertEmail("");
      phone && setAlertPhone("");
      lastName && setAlertLastName("");
      password && setAlertPassword("");
    }
    if (!lastName) {
      setAlertLastName("Ce champs est obligatoire");
      firstName && setAlertFirstName("");
      email && setAlertEmail("");
      phone && setAlertPhone("");
      password && setAlertPassword("");
    }
    if (!email) {
      setAlertEmail("Ce champs est obligatoire");
      firstName && setAlertFirstName("");
      lastName && setAlertLastName("");
      phone && setAlertPhone("");
      password && setAlertPassword("");
    }
    if (!phone) {
      setAlertPhone("Ce champs est obligatoire");
      firstName && setAlertFirstName("");
      lastName && setAlertLastName("");
      email && setAlertEmail("");
      password && setAlertPassword("");
    }
    if (email && !emailTest) {
      setAlertEmail("Veuillez entrer une adresse e-mail valide");
      firstName && setAlertFirstName("");
      lastName && setAlertLastName("");
      phone && setAlertPhone("");
    }
    if (email && existanceEmail) {
      setAlertEmail("L'adresse e-mail existe déjà!!");
      firstName && setAlertFirstName("");
      lastName && setAlertLastName("");
      phone && setAlertPhone("");
    }
    if (!password) {
      setAlertPassword("Ce champs est obligatoire");
      firstName && setAlertFirstName("");
      lastName && setAlertLastName("");
      phone && setAlertPhone("");
      email && setAlertEmail("");
    }
    if (!confirmedPassword) {
      setAlertConfirmedPassword("Ce champs est obligatoire");
      firstName && setAlertFirstName("");
      lastName && setAlertLastName("");
      phone && setAlertPhone("");
      email && setAlertEmail("");
    }
    if (password && confirmedPassword && password !== confirmedPassword) {
      setAlertConfirmedPassword("Mot de passe incorrect");
      setAlertPassword("");
      firstName && setAlertFirstName("");
      lastName && setAlertLastName("");
      phone && setAlertPhone("");
      email && setAlertEmail("");
    }
    if (password && confirmedPassword && password === confirmedPassword) {
      setAlertConfirmedPassword("");
      setAlertPassword("");
      firstName && setAlertFirstName("");
      lastName && setAlertLastName("");
      phone && setAlertPhone("");
      email && setAlertEmail("");
    }

    if (
      firstName &&
      lastName &&
      email &&
      phone &&
      emailTest &&
      !existanceEmail &&
      password &&
      confirmedPassword &&
      password === confirmedPassword
    ) {
      fileUpload(file).then((response) => {
        props.addMember({
          civilite: civilite,
          image: response.data.data.display_url,
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
          password: password,
          birtday: birthday,
        });

        setTimeout(() => {
          changeInscrit();
        }, 1000);

        setTimeout(() => {
          toggle();
        }, 3000);

        firstName && setAlertFirstName("");
        lastName && setAlertLastName("");
        email && setAlertEmail("");
        phone && setAlertPhone("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
      });
    } else {
      console.log("something went wrong!");
    }
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    const [file] = e.target.files;
    if (file && file.size < 614400) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert(
        "fichier trés volumineux,Veuillez télécharger un fichier ne dépassant pas 300 K0"
      );
    }
  };

  const fileUpload = (file) => {
    const url = `https://api.imgbb.com/1/upload`;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "881f6a30630e96747675ad6aa76cb50b");

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  return (
    <section className="sign-up-container">
      {inscrit ? (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="member-inscrit">
            <Alert
              variant="success"
              style={{ color: "green", padding: "10px", marginBottom: "10px" }}
            >
              Vous êtes inscrit avec succès
            </Alert>

            <h3>
              {" "}
              Bienvenu chez EVEREST {firstName} {lastName}{" "}
            </h3>
          </div>
        </div>
      ) : (
        <section className="inscription">
          <div id="1" className="form">
            <div
              style={{
                textAlign: "center",
                borderBottom: "solid",
                width: "100%",
              }}
            >
              <h1
                className="title-xl"
                style={{ color: "black", fontSize: "30px" }}
              >
                INSCRIPTION
              </h1>
              <p>
                Afin d’accéder aux services EVEREST, merci de bien vouloir vous
                inscrire.
              </p>
            </div>
            <br />
            <Card>
              <form onSubmit={onFormSubmit}>
                <Row>
                  <Col sm={4}>
                    <div className="inputs">
                      <div className="upload-div">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            color: "grey",
                          }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={onChange}
                            ref={imageUploader}
                            style={{
                              display: "none",
                            }}
                          />
                          <div
                            style={{
                              height: "250px",
                              width: "250px",
                              border: "1px dashed black",
                              // borderRadius: "50%",
                            }}
                            onClick={() => imageUploader.current.click()}
                          >
                            <img
                              src="https://i.ibb.co/GHCw38g/unnamed22.png"
                              ref={uploadedImage}
                              style={{
                                width: "100%",
                                height: "100%",
                                position: "acsolute",
                                padding: "5px",
                                // borderRadius: "50%",
                              }}
                            />
                          </div>
                          Télécharger une photo de profil
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col sm={8}>
                    <div className="inputs">
                      <div className="input-large">
                        <div style={{ position: "relative", left: "0%" }}>
                          <h3>Civilité</h3>
                        </div>

                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={civilite}
                            onChange={changeCivilite}
                            className={classes.joinInput}
                          >
                            <MenuItem value={"Homme"}>Homme</MenuItem>
                            <MenuItem value={"Femme"}>Femme</MenuItem>
                            <MenuItem value={"Autre"}>Autre</MenuItem>
                          </Select>
                        </FormControl>
                      </div>

                      <div className="input">
                        <h3>Prenom</h3>
                        <TextField
                          className={classes.joinInput}
                         
                          value={firstName}
                          onChange={changeFirstName}
                        />
                        <label className="alert">{alertFirstName}</label>
                      </div>
                      <div className="input">
                        <h3>Nom</h3>
                        <TextField
                          style={{ height: "50px" }}
                          className={classes.joinInput}
                          id="standard-basic"
                          value={lastName}
                          onChange={changeLastName}
                        />
                        <label className="alert">{alertLastName}</label>
                      </div>
                      <div className="input">
                        <h3>Date de Naissance</h3>
                        {/* <BirthdayInput className={classes.joinInput} /> */}
                        <TextField
                          id="date"
                          // label="Birthday"
                          type="date"
                          // defaultValue="1990-01-01"
                          className={classes.joinInput}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={birthday}
                          onChange={changeBirthday}
                        />
                      </div>

                      <div className="input">
                        <h3>Téléphone</h3>
                        <TextField
                          className={classes.joinInput}
                          type="number"
                          value={phone}
                          onChange={changePhone}
                        />
                        <label className="alert">{alertPhone}</label>
                      </div>

                      <div className="input-large">
                        <h3>Adresse Mail</h3>
                        <TextField
                          className={classes.joinInput}
                         
                          value={email}
                          type="email"
                          onChange={changeEmail}
                        />
                        <label className="alert">{alertEmail}</label>
                      </div>

                      <div className="input">
                        <h3>Mot de passe</h3>
                        <TextField
                          className={classes.joinInput}
                         
                          value={password}
                          type="password"
                          onChange={changePassword}
                        />
                        <label className="alert">{alertPassword}</label>
                      </div>

                      <div className="input">
                        <h3>Confirmer mot de passe</h3>
                        <TextField
                          className={classes.joinInput}
                          id="standard-password-input"
                          type="password"
                          autoComplete="current-password"
                          onChange={changeConfirmedPassword}
                        />
                        <label className="alert">
                          {alertConfirmedPassword}
                        </label>
                      </div>

                      {/* <p>COMMENCEZ AUJOURD'HUI</p> */}
                      <div className="input-large">
                        <FormControlLabel
                          style={classes}
                          control={
                            <Checkbox
                              checked={subscribe}
                              onChange={changeSubscribe}
                              color="default"
                              name="checkedB"
                            />
                          }
                          label="Envoyez-moi des offres et des conseils d'entraînement, de nutrition et de fitness par e-mail, sms, WhatsApp et RCS."
                        />
                      </div>
                      <div className="button-large">
                        <button
                          style={{
                            backgroundColor: "black",
                            border: "none",
                            height: "40px",
                            width: "100%",
                            margin: "0px",
                            maxWidth: "800px",
                          }}
                        >
                          <span style={{ color: "white", fontSize: "20px" }}>
                            Je m'inscris
                          </span>
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </form>
            </Card>
          </div>
        </section>
      )}

      <ConnexionModal toggle={toggle} modal={modal} />
    </section>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addMember: (member) => {
    dispatch(addMember(member));
  },
});
const mapStateToProps = (state) => {
  return {
    membersReducer: state.MembersReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberSignUp);

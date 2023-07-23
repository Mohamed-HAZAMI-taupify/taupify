import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import {
  editMemberProfile,
  editPassword,
} from "../../redux/actions/ClientActions";
import NotFound from "../common-components/not-found";
import { genderData } from "../../data/data";
import SpinnerLoadings from "../common-components/spinner-loanding";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "10ch",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  joinInput: {
    width: "95%",
    "& .MuiInputBase-multiline": {
      fontSize: "2² em",
      lineHeight: "40px",
    },
    "& .MuiInputBase-input": {
      fontSize: "2em",
      lineHeight: "40px",
      height: "40px",
    },
    joinInputSmall: {
      width: "auto",
      maxWidth: "7em",
      "& .MuiInputBase-multiline": {
        fontSize: "2² em",
        lineHeight: "40px",
      },
      "& .MuiInputBase-input": {
        fontSize: "1.5em",
        lineHeight: "40px",
        height: "40px",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "2px solid #a8cfbd",
      },
    },
  },

  filledInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },

  filledInputt: {
    width: "95%",

    "& .MuiFilledInput-root": {
      position: "relative",
      backgroundColor: "transparent",
    },
  },
}));

const MemberProfil = (props) => {
  const classNamees = useStyles();
  const { contactId, contactUserId, user } = props.authReducer;
  const [values, setValues] = React.useState({
    password: "",
    newPassword: "",
    showPassword: false,
    showNewPassword: false,
  });
  const [formData, setFormData] = useState(props.membersReducer.contactData);
  const { gender, givenName, familyName, birthDate, mobile, address, email } =
    formData;
  const { password, newPassword } = values;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onChangeAdress = (e) => {
    setFormData({ ...formData });
    if (e.target.name === "streetAddress") {
      formData.address.streetAddress = e.target.value;
    }
    if (e.target.name === "postalCode") {
      formData.address.postalCode = e.target.value;
    }
  };

  const onChangeMdp = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitPersonelInfo = async (e) => {
    e.preventDefault();
    props.editMemberProfile(formData, contactId);
  };

  const onSubmitMdp = async (e) => {
    e.preventDefault();
    props.editPassword(contactUserId, { password, newPassword });
  };

  const handleClickShowPassword = (event) => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowNewPassword = (event) => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const civiltyChange = (event) => {
    setFormData({ ...formData, gender: event.value });
  };
  const { alerts } = props.alertReducer;
  const { loading } = props.membersReducer;

  if (loading) {
    return <SpinnerLoadings loading={loading} />;
  }
  return !formData ? (
    <NotFound />
  ) : (
    <div>
      <div className="member-page">
        <div className="profile-content">
          <span className="member-name weight-black">
            Bonjour &nbsp; {user.givenName}
          </span>
        </div>

        <div className="container-fluid">
          <Container className="container-form-member-profile">
            <form onSubmit={(e) => onSubmitPersonelInfo(e)}>
              <div className="inputs-info">
                <div className="input-info">
                  <h3 className="h3-info">Civilité</h3>
                  <Select
                    onChange={(e) => civiltyChange(e)}
                    inputProps={{
                      name: "gender",
                    }}
                    name="gender"
                    options={genderData}
                    value={gender}
                    placeholder={
                      gender === "male"
                        ? "Monsieur"
                        : gender === "female"
                        ? "Madame"
                        : null
                    }
                    className="civilite-select-input"
                  ></Select>
                  <label className="alert">
                    {alerts.gender && alerts.gender}
                  </label>
                </div>
                <div className="input-info">
                  <h3 className="h3-info">
                    Prénom
                    <span className="required-input"> &#42; </span>
                  </h3>
                  <TextField
                    name="givenName"
                    className={classNamees.joinInput}
                    value={givenName}
                    placeholder={givenName}
                    onChange={(e) => onChange(e)}
                  />
                  <label className="alert">
                    {alerts.givenName && alerts.givenName}
                  </label>
                </div>

                <div className="input-info">
                  <h3 className="h3-info">
                    Nom <span className="required-input"> &#42; </span>{" "}
                  </h3>
                  <TextField
                    className={classNamees.joinInput}
                    value={familyName}
                    name="familyName"
                    onChange={(e) => onChange(e)}
                  />
                  <label className="alert">
                    {alerts.familyName && alerts.familyName}
                  </label>
                </div>

                <div className="input-info">
                  <h3 className="h3-info">
                    Date de naissance
                    <span className="required-input"> &#42; </span>
                  </h3>
                  <TextField
                    id="date"
                    type="date"
                    value={birthDate}
                    name="birthDate"
                    onChange={(e) => onChange(e)}
                    className={classNamees.joinInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <label className="alert">
                    {alerts.birthDate && alerts.birthDate}
                  </label>
                </div>

                <div className="input-info">
                  <h3 className="h3-info">Téléphone</h3>
                  <TextField
                    className={classNamees.joinInput}
                    value={mobile && mobile}
                    onChange={(e) => onChange(e)}
                    name="mobile"
                  />
                  <label className="alert">
                    {alerts.mobile && alerts.mobile}
                  </label>
                </div>

                <div className="input-info">
                  <h3 className="h3-info">Adresse postale</h3>
                  <TextField
                    className={classNamees.joinInput}
                    name="streetAddress"
                    value={(address && address.streetAddress) || ""}
                    onChange={(e) => onChangeAdress(e)}
                  />
                </div>

                <div className="input-info">
                  <h3 className="h3-info">
                    Code postal
                    <span className="required-input"> (FR) </span>
                  </h3>
                  <TextField
                    className={classNamees.joinInput}
                    value={(address && address.postalCode) || ""}
                    onChange={(e) => onChangeAdress(e)}
                    name="postalCode"
                  />
                  {/* <label className="alert">
                        {alerts.postalCode && alerts.postalCode}
                      </label> */}
                </div>
              </div>
              <div className="btn-edit">
                <button
                  className="btn-ev btn-m btn-hvr-content uppercase btn-black"
                  type="submit"
                  onMouseDown={handleMouseDownPassword}
                >
                  <span className="hvr-content">Enregistrer</span>
                </button>
              </div>
            </form>

            <form onSubmit={(e) => onSubmitMdp(e)}>
              <span className="subtitle-member">Sécurité</span>
              <div className="inputs-info">
                <div className="input-info">
                  <h3 className="h3-info">Mot de passe</h3>
                  <FilledInput
                    type={values.showPassword ? "text" : "password"}
                    className={classNamees.filledInputt}
                    onChange={(event) => onChangeMdp(event)}
                    name="password"
                    value={password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <label className="alert">
                    {alerts.password && alerts.password}
                  </label>
                </div>
                <div className="input-info">
                  <h3 className="h3-info">Nouveau mot de passe</h3>
                  <FilledInput
                    type={values.showNewPassword ? "text" : "password"}
                    className={classNamees.filledInputt}
                    onChange={(event) => onChangeMdp(event)}
                    name="newPassword"
                    value={newPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showNewPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <label className="alert">
                    {alerts.newPassword && alerts.newPassword}
                  </label>
                </div>
                <div className="input-info">
                  <h3 className="h3-info">Email</h3>
                  <TextField
                    disabled
                    className={classNamees.joinInput}
                    type="email"
                    value={email && email}
                  />
                </div>
              </div>
              <div className="btn-edit">
                <button
                  className="btn-ev btn-m btn-hvr-content uppercase btn-black"
                  type="submit"
                  onMouseDown={handleMouseDownPassword}
                >
                  <span className="hvr-content">Enregistrer</span>
                </button>
              </div>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  editMemberProfile: (profile, contact) => {
    dispatch(editMemberProfile(profile, contact));
  },
  editPassword: (contactUserId, password) => {
    dispatch(editPassword(contactUserId, password));
  },
});
const mapStateToProps = (state) => {
  return {
    membersReducer: state.MembersReducer,
    alertReducer: state.AlertReducer,
    authReducer: state.AuthReducer,
  };
};
const ConnectedMemberProfil = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberProfil);
export default ConnectedMemberProfil;

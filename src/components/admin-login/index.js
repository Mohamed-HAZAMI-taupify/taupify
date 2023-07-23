import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginEverest, logout } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { data } from "../../data/routes/routesData";
const AdminLogin = (props) => {
  const { isAuthenticated, isAuthenticatedEverest } = props.authReducer;
  const { alerts } = props.alertReducer;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  useEffect(() => {
    if (isAuthenticatedEverest) {
      window.location.href = data.admin_path;
    }
  }, [isAuthenticatedEverest]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    isAuthenticated && props.logout();
    props.loginEverest(formData);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <CssBaseline />
        <img src="https://i.ibb.co/dD89SRC/logo.png" />
        <LockOutlinedIcon />
        <form className="login-form" noValidate onSubmit={(e) => onSubmit(e)}>
          <TextField
            className="login-input"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nom utilisateur"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <label className="alert-login-admin">
            {alerts.email && alerts.email}
          </label>
          <TextField
            className="login-input"
            variant="outlined"
            fullWidth
            value={password}
            name="password"
            onChange={(e) => onChange(e)}
            label="Mot de passe"
            type="password"
          />
          <label className="alert-login-admin">
            {alerts.password && alerts.password}
          </label>

          <button type="submit" className="btn-ev btn-s btn-black uppercase">
            Log-in
          </button>
        </form>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  loginEverest: (email, password) => {
    dispatch(loginEverest(email, password));
  },
  logout: () => {
    dispatch(logout());
  },
});
const mapStateToProps = (state) => {
  return {
    authReducer: state.AuthReducer,
    alertReducer: state.AlertReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);

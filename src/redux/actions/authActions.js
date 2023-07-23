import axios from "axios";
import { toggle } from "./AdminActions";
import { alert, handleSnackbar, handleWaitSnackbar } from "./AlertActions";
import {
  USER_LOADED,
  AUTH_MEMBER,
  AUTH_ERROR,
  AUTH_MEMBER_ERROR,
  LOGOUT,
  LOGIN_FAIL_EVEREST,
  LOGIN_SUCCESS_EVEREST,
  USER_LOADED_EVEREST,
  LOGOUT_EVEREST,
  AUTH_ERROR_EVEREST,
  GET_CONTACT_PROFIL,
} from "../../data/actionTypes";
import jwt_decode from 'jwt-decode';
import setAuthTokenEverest from "../../data/utils/setAuthentification";
import { _member_auth, _base_url_auth, _admin_auth, delete_cache , _superAdmin_auth } from "../../data/config";
import { data } from "../../data/routes/routesData";
export const memberSignIn = (body) => {
  return async (dispatch) => {
    try {
      dispatch(handleWaitSnackbar("Connexion en cours ", "info", true));
      await axios.get(delete_cache);
      const res = await axios.post(_member_auth, body);

      if (res.status === 200) {
        dispatch(handleWaitSnackbar("Connexion en cours ", "info", false));
        dispatch(handleSnackbar("Vous êtes les bienvenues", "success", true));
      } else {
        dispatch(handleWaitSnackbar("Connexion en cours ", "info", false));
        dispatch(
          handleSnackbar(
            "Problème de connexion! authentification refusée",
            "error",
            true
          )
        );
      }
      await dispatch({
        type: AUTH_MEMBER,
        payload: res.data,
      });
      await dispatch(loadUser());
      await dispatch(toggle("connexionModal", false));
      dispatch(alert([]));
    } catch (err) {
      dispatch({
        type: AUTH_MEMBER_ERROR,
      });
      dispatch(alert(err.response.data.errors));
      console.error(err.response.data.errors);
      dispatch(handleWaitSnackbar("Connexion en cours ", "info", false));
      dispatch(
        handleSnackbar(
          "Problème de connexion! authentification refusée",
          "error"
        )
      );
    }
  };
};
export const loadUser = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem("token")) {
        //const res = await axios.get(_member_auth);
        const res = await axios.get(_member_auth, {
          params: {
            param: jwt_decode(localStorage.getItem('token')).targetId
          }
        })
        dispatch({
          type: USER_LOADED,
          payload: res.data.contact_user,
        });
        dispatch({
          type: GET_CONTACT_PROFIL,
          payload: res.data.contact,
        });
      } else {
        dispatch({
          type: AUTH_ERROR,
        });
      }
    } catch (err) {
      dispatch(
        handleSnackbar(
          "Problème de connexion! authentification refusée",
          "error"
        )
      );
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
};
export const loadUserEverest = () => async (dispatch) => {
  if (localStorage.tokenEverest) {
    setAuthTokenEverest(localStorage.tokenEverest);
  }
  try {
    if (localStorage.tokenEverest) {
      const res = await axios.get(_admin_auth);

      dispatch({
        type: USER_LOADED_EVEREST,
        payload: res.data,
      });
    } else {
      dispatch({
        type: AUTH_ERROR_EVEREST,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR_EVEREST,
    });
  }
};

export const loginEverestSuperAdmin = (credentials) => async (dispatch) => {
  const config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(handleWaitSnackbar("Connexion en cours ", "info", true));
    const res = await axios.post(_superAdmin_auth, credentials, config);
    dispatch({
      type: LOGIN_SUCCESS_EVEREST,
      payload: res.data,
    });
    if (res.status === 200) {
      dispatch(handleSnackbar("Bienvenue dans votre espace", "success"));
    } else {
      dispatch(
        handleSnackbar(
          "Problème de connexion! authentification refusée",
          "error"
        )
      );
      dispatch(alert([]));
    }
    await dispatch(loadUserEverest());
    dispatch(toggle("connexionModal", false));
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(alert(errors));
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          handleSnackbar(
            "Problème de connexion! authentification refusée",
            "error"
          )
        )
      );
    }
    dispatch({
      type: LOGIN_FAIL_EVEREST,
    });
    console.error(err.response.data.errors);
  }
};


export const loginEverest = (credentials) => async (dispatch) => {
  const config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(handleWaitSnackbar("Connexion en cours ", "info", true));
    const res = await axios.post(_admin_auth, credentials, config);
    dispatch({
      type: LOGIN_SUCCESS_EVEREST,
      payload: res.data,
    });
    if (res.status === 200) {
      dispatch(handleSnackbar("Bienvenue dans votre espace", "success"));
    } else {
      dispatch(
        handleSnackbar(
          "Problème de connexion! authentification refusée",
          "error"
        )
      );
      dispatch(alert([]));
    }
    await dispatch(loadUserEverest());
    dispatch(toggle("connexionModal", false));
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(alert(errors));
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          handleSnackbar(
            "Problème de connexion! authentification refusée",
            "error"
          )
        )
      );
    }
    dispatch({
      type: LOGIN_FAIL_EVEREST,
    });
    console.error(err.response.data.errors);
  }
};
export const generateCredential = (credentials) => async (dispatch) => {
  const config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(handleWaitSnackbar("Connexion en cours ", "info", true));
    const res = await axios.get(_admin_auth, credentials, config);
    dispatch({
      type: LOGIN_SUCCESS_EVEREST,
      payload: res.data,
    });
    if (res.status === 200) {
      dispatch(handleSnackbar("Bienvenue dans votre espace", "success"));
    } else {
      dispatch(
        handleSnackbar(
          "Problème de connexion! authentification refusée",
          "error"
        )
      );
      dispatch(alert([]));
    }
    await dispatch(loadUserEverest());
    dispatch(toggle("connexionModal", false));
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(alert(errors));
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          handleSnackbar(
            "Problème de connexion! authentification refusée",
            "error"
          )
        )
      );
    }
    dispatch({
      type: LOGIN_FAIL_EVEREST,
    });
    console.error(err.response.data.errors);
  }
};
export const logoutEverest = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_EVEREST,
  });
};
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  window.location.href = data.accueil;
};
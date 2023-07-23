import axios from "axios";
import {
  GET_POPUP_LIST,
  POPUP_DETAILS,
  UPDATE_POPUP,
  CREATE_POPUP,
  UPDATE_STATE_POPUP,
  GET_HOME_POPUP,
} from "../../data/actionTypes";
import { _base_url_popup } from "../../data/config";
import { handleSnackbar, handleWaitSnackbar } from "./AlertActions";
import qs from "qs";

export const getPopUps = (filter) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(_base_url_popup + "?" + qs.stringify(filter));
      dispatch({
        type: GET_POPUP_LIST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getHomePopUp = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(_base_url_popup + "/home");
      await dispatch({
        type: GET_HOME_POPUP,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const popUpDetails = (popupDetail) => {
  return (dispatch) => {
    dispatch({
      type: POPUP_DETAILS,
      payload: popupDetail,
    });
  };
};

export const createPopUp = (popUp) => {
  return async (dispatch) => {
    try {
      dispatch(handleWaitSnackbar("enregistrement en cours", "info", true));
      const res = await axios.post(_base_url_popup, popUp);
      await dispatch({
        type: CREATE_POPUP,
        payload: res.data,
      });
      if (res.status == 200) {
        dispatch(
          handleSnackbar("modifications enregistrés avec succès", "success")
        );
        dispatch(getPopUps());
      }
    } catch (err) {
      console.log(err);
      dispatch(
        handleSnackbar(
          "Un erreur de serveur s'est produit, veuillez vérifier la connxion internet ou contacter l'équipe IT",
          "error"
        )
      );
    }
  };
};

export const editPopUp = (id, popUp) => {
  return async (dispatch) => {
    try {
      dispatch(handleWaitSnackbar("enregistrement en cours", "info", true));
      const res = await axios.put(_base_url_popup + "/" + id, popUp);
      await dispatch({
        type: UPDATE_POPUP,
        payload: res.data,
      });

      if (res.status == 200) {
        dispatch(
          handleSnackbar("modifications enregistrés avec succès", "success")
        );
        dispatch(getPopUps());
      }
    } catch (err) {
      console.log(err);
      dispatch(
        handleSnackbar(
          "Un erreur de serveur s'est produit, veuillez vérifier la connxion internet ou contacter l'équipe IT",
          "error"
        )
      );
    }
  };
};

export const editStatePopUp = (id) => {
  return async (dispatch) => {
    try {
      dispatch(handleWaitSnackbar("enregistrement en cours", "info", true));
      const res = await axios.put(_base_url_popup + "/state/" + id);
      await dispatch({
        type: UPDATE_STATE_POPUP,
        payload: res.data,
      });

      if (res.status == 200) {
        dispatch(
          handleSnackbar("modifications enregistrés avec succès", "success")
        );
        dispatch(getPopUps());
      }
    } catch (err) {
      console.log(err);
      dispatch(
        handleSnackbar(
          "Un erreur de serveur s'est produit, veuillez vérifier la connxion internet ou contacter l'équipe IT",
          "error"
        )
      );
    }
  };
};
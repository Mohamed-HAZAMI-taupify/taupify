import axios from "axios";
import qs from "qs";
import {
  GET_CONTACT_OPEN_DAY,
  DELETE_CONTACT_OPEN_DAY,
  ADD_CONTACT_OPEN_DAY,
} from "../../../data/actionTypes";
import {_base_url_contact_open_day } from "../../../data/config";
import { alert, handleSnackbar } from "../AlertActions";
import { data } from "../../../data/routes/routesData";

export const getContactOpenDay = (filter) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        _base_url_contact_open_day + "?" + qs.stringify(filter)
      );
      dispatch({
        type: GET_CONTACT_OPEN_DAY,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteContactOpenDay = (ContactID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));

      const res = await axios.delete(_base_url_contact_open_day +"/" + ContactID);
      dispatch({
        type: DELETE_CONTACT_OPEN_DAY,
        payload: res.data,
      });

      res.status === 200
        ? dispatch(
            handleSnackbar("Contact Game supprimé avec succès", "success")
          )
        : dispatch(handleSnackbar("Contact Game non supprimé", "error"));

      dispatch(getContactOpenDay());
    } catch (err) {
      dispatch(handleSnackbar(`erreur 404`, "error"));
    }
  };
};

export const addContactOpenDay = (Contact) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const res = await axios.post(_base_url_contact_open_day, Contact, config);
      if (res.status === 200) {
        await dispatch(
          handleSnackbar("Demande envoyée avec succès", "success")
        );
        setTimeout((window.location.href = data.accueil), 2500);
      } else {
        dispatch(handleSnackbar("Demande non envoyée", "error"));
      }
      dispatch({
        type: ADD_CONTACT_OPEN_DAY,
      });
      dispatch(getContactOpenDay());
    } catch (err) {
      dispatch(alert(err.response.data.errors));
      dispatch(
        handleSnackbar(
          "oups!! un erreur s'est produi! Demande non envoyée",
          "error"
        )
      );
    }
  };
};

import axios from "axios";
import qs from "qs";
import {
  GET_CONTACT_GAME,
  DELETE_CONTACT_GAME,
  ADD_CONTACT_GAME,
} from "../../../data/actionTypes";
import { _base_url_contact_game } from "../../../data/config";
import { alert, handleSnackbar } from "../AlertActions";
import { data } from "../../../data/routes/routesData";

export const getContactGame = (filter) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        _base_url_contact_game + "?" + qs.stringify(filter)
      );
      dispatch({
        type: GET_CONTACT_GAME,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteContactGame = (ContactGameID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));

      const res = await axios.delete(_base_url_contact_game +"/" + ContactGameID);
      dispatch({
        type: DELETE_CONTACT_GAME,
        payload: res.data,
      });

      res.status === 200
        ? dispatch(
            handleSnackbar("Contact Game supprimé avec succès", "success")
          )
        : dispatch(handleSnackbar("Contact Game non supprimé", "error"));

      dispatch(getContactGame());
    } catch (err) {
      dispatch(handleSnackbar(`erreur 404`, "error"));
    }
  };
};

export const addContactGame = (ContactGame) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const res = await axios.post(_base_url_contact_game, ContactGame, config);
      if (res.status === 200) {
        await dispatch(
          handleSnackbar("Demande envoyée avec succès", "success")
        );
        setTimeout((window.location.href = data.accueil), 2500);
      } else {
        dispatch(handleSnackbar("Demande non envoyée", "error"));
      }
      dispatch({
        type: ADD_CONTACT_GAME,
      });
      dispatch(getContactGame());
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

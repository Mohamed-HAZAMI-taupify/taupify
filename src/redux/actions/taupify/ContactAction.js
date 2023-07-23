import axios from "axios";
import {
  GET_TAUPIFY_CONTACT_SEARCH,
  DELETE_TAUPIFY_CONTACT,
  UPDATE_TAUPIFY_CONTACT,
  DETAILS_TAUPIFY_CONTACT,
  ADD_TAUPIFY_CONTACT,
} from "../../../data/actionTypes";
import { _base_url_taupify_contact } from "../../../data/config";
import { toggle } from "../AdminActions";
import { alert, handleSnackbar, spinnerLoading } from "../AlertActions";

export const getTaupifyContacts = (filter) => {
  return async (dispatch) => {
    await dispatch(spinnerLoading(true));
    const res = await axios.get(_base_url_taupify_contact);
    dispatch({
      type: GET_TAUPIFY_CONTACT_SEARCH,
      payload: res.data,
    });
    dispatch(spinnerLoading(false));
  };
};

export const deleteTaupifyContact = (taupifyContactID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));

      const res = await axios.delete(
        _base_url_taupify_contact + taupifyContactID
      );
      dispatch({
        type: DELETE_TAUPIFY_CONTACT,
        payload: res.data,
      });

      res.status === 200
        ? dispatch(
            handleSnackbar("Contact Taupify supprimé avec succès", "success")
          )
        : dispatch(handleSnackbar("Contact Taupify non supprimé", "error"));

      dispatch(getTaupifyContacts());
    } catch (err) {
      dispatch(handleSnackbar(`erreur 404`, "error"));
    }
  };
};

export const addTaupifyContact = (taupifyContact) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const body = JSON.stringify(taupifyContact);
      const res = await axios.post(_base_url_taupify_contact, body, config);
      if (res.status === 200) {
        await dispatch(
          handleSnackbar("Demande envoyée avec succès", "success")
        );
      } else {
        dispatch(handleSnackbar("Demande non envoyée", "error"));
      }

      dispatch({
        type: ADD_TAUPIFY_CONTACT,
      });

      await dispatch(toggle("everfitContact", false)); ////////badelni
      await dispatch(alert([]));
      dispatch(getTaupifyContacts());
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
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

export const taupifyContactDetails = (taupifyContact) => {
  return (dispatch) => {
    dispatch({
      type: DETAILS_TAUPIFY_CONTACT,
      payload: taupifyContact,
    });
  };
};

export const editEverfitContact = (taupifyContact) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.put(
        _base_url_taupify_contact + taupifyContact._id,
        taupifyContact
      );
      res.status === 200
        ? dispatch(
            handleSnackbar("Taupify contact modifié avec succès", "success")
          )
        : dispatch(handleSnackbar("Taupify contact non modifié", "error"));

      dispatch({
        type: UPDATE_TAUPIFY_CONTACT,
        payload: res.data,
      });

      await dispatch(alert([]));
      await dispatch(toggle("everfitContactEdit", false)); ///badelni
      dispatch(getTaupifyContacts());
    } catch (err) {
      if (err.response.status === 400) {
        dispatch(alert(err.response.data.errors));
        dispatch(
          handleSnackbar(
            "Veillez remplir tous les champs obligatoires",
            "error"
          )
        );
      } else if (err.response.status === 404) {
        dispatch(handleSnackbar("erreur 404 lors de la modification", "error"));
      } else {
        dispatch(handleSnackbar(`erruer 404`, "error"));
      }
    }
  };
};

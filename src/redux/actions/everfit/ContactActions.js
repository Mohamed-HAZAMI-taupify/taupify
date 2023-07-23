import axios from "axios";
import qs from "qs";
import {
  ADD_EVERFIT_CONTACT,
  DELETE_EVERFIT_CONTACT,
  EDIT_EVERFIT_CONTACT,
  EVERFIT_CONTACT_DETAILS,
  GET_EVERFIT_CONTACT,
  GET_EVERFIT_TRAINING,
} from "../../../data/actionTypes";
import {
  everfit_contact,
  everfit_training,
  _send_email_everest_become_coach,
} from "../../../data/config";
import { toggle } from "../AdminActions";
import { alert, handleSnackbar, spinnerLoading } from "../AlertActions";
import { data } from "../../../data/routes/routesData";

export const getEverfitContacts = (filter) => {
  return async (dispatch) => {
    await dispatch(spinnerLoading(true));
    const res = await axios.get(everfit_contact + "?" + qs.stringify(filter));
    dispatch({
      type: GET_EVERFIT_CONTACT,
      payload: res.data,
    });
    dispatch(spinnerLoading(false));
  };
};

export const getTrainings = (filter) => {
  return async (dispatch) => {
    await dispatch(spinnerLoading(true));
    const res = await axios.get(everfit_training);
    dispatch({
      type: GET_EVERFIT_TRAINING,
      payload: res.data,
    });
    dispatch(spinnerLoading(false));
  };
};

export const deleteEverfitContact = (everfitContactID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));

      const res = await axios.delete(everfit_contact + "/" + everfitContactID);
      dispatch({
        type: DELETE_EVERFIT_CONTACT,
        payload: res.data,
      });

      res.status === 200
        ? dispatch(
            handleSnackbar("Contact Everfit supprimé avec succès", "success")
          )
        : dispatch(handleSnackbar("Contact Everfit non supprimé", "error"));

      dispatch(getEverfitContacts());
    } catch (err) {
      dispatch(handleSnackbar(`erreur 404`, "error"));
    }
  };
};

export const addEverfitContact = (everfitContact) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const res = await axios.post(everfit_contact, everfitContact, config);
      if (res.status === 200) {
        await dispatch(
          handleSnackbar("Demande envoyée avec succès", "success")
        );
        setTimeout((window.location.href = data.accueil), 2500);
      } else {
        dispatch(handleSnackbar("Demande non envoyée", "error"));
      }
      dispatch({
        type: ADD_EVERFIT_CONTACT,
      });

      await dispatch(toggle("everfitContact", false));
      await dispatch(alert([]));
      const { firstName } = everfitContact;
      await axios.post(
        _send_email_everest_become_coach,
        {
          firstName,
        },
        config
      );

      dispatch(getEverfitContacts());
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

export const everfitContactDetails = (everfitContact) => {
  return (dispatch) => {
    dispatch({
      type: EVERFIT_CONTACT_DETAILS,
      payload: everfitContact,
    });
  };
};

export const editEverfitContact = (everfitContact) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.put(
        everfit_contact + everfitContact._id,
        everfitContact
      );
      res.status === 200
        ? dispatch(
            handleSnackbar("Everfit contact modifié avec succès", "success")
          )
        : dispatch(handleSnackbar("Everfit contact non modifié", "error"));

      dispatch({
        type: EDIT_EVERFIT_CONTACT,
        payload: res.data,
      });

      await dispatch(alert([]));
      await dispatch(toggle("everfitContactEdit", false));
      dispatch(getEverfitContacts());
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

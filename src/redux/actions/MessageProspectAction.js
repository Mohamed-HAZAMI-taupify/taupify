import axios from "axios";
import {
  ADD_CONTACT_US_PROSPECT,
  CONTACT_US_DETAILS,
  DELETE_CONTACT_US,
  GET_CONTACT_US_PROSPECTS,
  GET_CONTACT_US_PROSPECTS_SEARCH,
} from "../../data/actionTypes";
import { contact_us_prospect, _send_reply_contact_us } from "../../data/config";
import { alert, handleSnackbar, spinnerContactUs } from "./AlertActions";
import qs from "qs";
import { toggle } from "./AdminActions";
import { data } from "../../data/routes/routesData";
export const addContactUsMessage = (contactUsProspect) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const res = await axios.post(
        contact_us_prospect,
        contactUsProspect,
        config
      );
      if (res.status === 200) {
        await dispatch(handleSnackbar("Message envoyé avec succès", "success"));
        setTimeout((window.location.href = data.accueil), 2500);
      } else {
        dispatch(handleSnackbar("Demande non envoyée", "error"));
      }
      dispatch({
        type: ADD_CONTACT_US_PROSPECT,
      });
      await dispatch(alert([]));
    } catch (err) {
      dispatch(alert(err.response.data.errors));
      dispatch(handleSnackbar("Demande non envoyée", "error"));
      console.error(err.response.data);
    }
  };
};
export const getContactUsProspects = (filter, showSearch) => {
  return async (dispatch) => {
    try {
      await dispatch(spinnerContactUs(true));

      const res = await axios.get(
        contact_us_prospect + "?" + qs.stringify(filter)
      );
      showSearch
        ? dispatch({
            type: GET_CONTACT_US_PROSPECTS,
            payload: res.data,
          })
        : dispatch({
            type: GET_CONTACT_US_PROSPECTS_SEARCH,
            payload: res.data,
          });
      await dispatch(spinnerContactUs(false));
    } catch (err) {
      console.log(err);
      await dispatch(spinnerContactUs(false));
    }
  };
};

export const deleteContactUsProspects = (contactUsID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));

      const res = await axios.delete(contact_us_prospect + "/" + contactUsID);
      dispatch({
        type: DELETE_CONTACT_US,
        payload: res.data,
      });

      res.status === 200
        ? dispatch(handleSnackbar("Message supprimé avec succès", "success"))
        : dispatch(handleSnackbar("Message non supprimé", "error"));

      dispatch(getContactUsProspects());
    } catch (err) {
      dispatch(handleSnackbar(`erruer 404`, "error"));
    }
  };
};

export const ContactUsDetails = (contactUsProspect) => {
  return (dispatch) => {
    dispatch({
      type: CONTACT_US_DETAILS,
      payload: contactUsProspect,
    });
  };
};

export const ReplyContactUs = (contactUs) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      dispatch(handleSnackbar("Téléchargment des données ...  ", "info"));
      const { firstname, lastname, email, message } = contactUs;

      const res = await axios.post(
        _send_reply_contact_us,
        {
          firstname,
          lastname,
          email,
          message,
        },
        config
      );
      await axios.put(
        contact_us_prospect + "/" + contactUs._id,
        {
          replied: true,
          response: message,
        },
        config
      );
      res.status === 200
        ? dispatch(handleSnackbar("Réponse envoyé succès", "success"))
        : dispatch(handleSnackbar("Réponse non envoyée", "error"));

      dispatch(toggle("replyContactUsModal", false));
      dispatch(getContactUsProspects());
    } catch (err) {
      console.error(err);
      dispatch(handleSnackbar(`erruer 404`, "error"));
    }
  };
};

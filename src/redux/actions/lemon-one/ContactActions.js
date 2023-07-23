import axios from "axios";
import qs from "qs";
import {
  GET_LEMON_ONE_CONTACT,
  GET_LEMON_ONE_CONTACT_SEARCH,
  DELETE_LEMON_ONE_CONTACT,
} from "../../../data/actionTypes";
import { handleSnackbar } from "../AlertActions";
import { lemon_one_contact } from "../../../data/config";

export const getLemonOneContacts = (filter) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        lemon_one_contact + "?" + qs.stringify(filter)
      );
      dispatch({
        type: GET_LEMON_ONE_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteLemonOneContact = (lemonOneContactID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));

      const res = await axios.delete(
        lemon_one_contact + "/" + lemonOneContactID
      );
      dispatch({
        type: DELETE_LEMON_ONE_CONTACT,
        payload: res.data,
      });

      res.status === 200
        ? dispatch(
            handleSnackbar("Contact Lemon one supprimé avec succès", "success")
          )
        : dispatch(handleSnackbar("Contact Lemon one non supprimé", "error"));

      dispatch(getLemonOneContacts());
    } catch (err) {
      dispatch(handleSnackbar(`erreur 404`, "error"));
    }
  };
};

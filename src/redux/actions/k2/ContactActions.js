import axios from "axios";
import qs from "qs";
import { GET_K2_CONTACT, 
  DELETE_K2_CONTACT 
} from "../../../data/actionTypes";

import { _base_url_k2_contact } from "../../../data/config";

import { handleSnackbar } from "../AlertActions";

export const getK2Contacts = (filter) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        _base_url_k2_contact + "?" + qs.stringify(filter)
      );
      dispatch({
        type: GET_K2_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteK2Contact = (k2ContactID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));

      const res = await axios.delete(_base_url_k2_contact + k2ContactID);
      dispatch({
        type: DELETE_K2_CONTACT,
        payload: res.data,
      });

      res.status === 200
        ? dispatch(handleSnackbar("Contact K2 supprimé avec succès", "success"))
        : dispatch(handleSnackbar("Contact K2 non supprimé", "error"));

      dispatch(getK2Contacts());
    } catch (err) {
      dispatch(handleSnackbar(`erreur 404`, "error"));
    }
  };
};
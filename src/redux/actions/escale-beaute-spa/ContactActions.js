import axios from "axios";
import qs from "qs";
import {
  GET_ESCALE_SPA_CONTACT,
  GET_ESCALE_SPA_SEARCH,
  DELETE_ESCALE_SPA_CONTACT,
} from "../../../data/actionTypes";
import { escale_spa_contact } from "../../../data/config";

export const getEscaleSpaContacts = (filter, showSearch) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        escale_spa_contact + "?" + qs.stringify(filter)
      );
      showSearch
        ? dispatch({
            type: GET_ESCALE_SPA_CONTACT,
            payload: res.data,
          })
        : dispatch({
            type: GET_ESCALE_SPA_SEARCH,
            payload: res.data,
          });
    } catch (err) {
      console.error(err);
    }
  };
};
export const getEscaleSpaContactById = (escaleSpaContactID) => {
  return async (dispatch) => {
    const res = await axios.get(escale_spa_contact + escaleSpaContactID);
    dispatch({
      type: DELETE_ESCALE_SPA_CONTACT,
      payload: res.data,
    });
  };
};

export const deleteEscaleSpaContact = (escaleSpaContactID) => {
  return async (dispatch) => {
    const res = await axios.delete(escale_spa_contact + escaleSpaContactID);
    dispatch({
      type: DELETE_ESCALE_SPA_CONTACT,
      payload: res.data,
    });
    console.log(
      "escale_spa_contact + escaleSpaContactID" +
        escale_spa_contact +
        escaleSpaContactID
    );
  };
};

import axios from "axios";
import {
  GET_POPUP,
  GET_POPUP_SEARCH,
  COUNT_POPUP_NBRE,
  ADD_POP_UP_NBRE,
} from "../../data/actionTypes";
import { show_popup } from "../../data/config";
import qs from "qs";

var showNbreProfile = true;
const showNbreProfiles = () => {
  showNbreProfile = !showNbreProfile;
};

export const getNbrePopUp = (filter, showSearch) => {
  return async (dispatch) => {
    try {
      if (showNbreProfile) {
        const res = await axios.get(show_popup + "?" + qs.stringify(filter));
        showSearch
          ? dispatch({
              type: GET_POPUP,
              payload: res.data,
            })
          : dispatch({
              type: GET_POPUP_SEARCH,
              payload: res.data,
            });
        showNbreProfiles();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addPopUpNbre = (popUpNbr) => {
  return async (dispatch) => {
    try {
      await axios.post(show_popup, { nbreClick: popUpNbr });

      dispatch({
        type: ADD_POP_UP_NBRE,
      });

      dispatch(getNbrePopUp());
    } catch (err) {
      console.error(err.response.data);
    }
  };
};

export const countPopupClick = () => {
  return async (dispatch) => {
    const res = await axios.get(show_popup + "/count");
    dispatch({
      type: COUNT_POPUP_NBRE,
      payload: res.data,
    });
  };
};

import axios from "axios";
import qs from "qs"; //passes information from back to front
import { alert, handleSnackbar } from "./AlertActions";
import { toggle } from "./AdminActions";
import { _base_url_event_calender } from "../../data/config";
import {
  ADD_EVENT_CALENDAR,
  GET_CALENDAR_EVENTS_LIST,
} from "../../data/actionTypes";
export const addCalendarEvent = (event) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.post(_base_url_event_calender, event);
      res.data === "event added"
        ? dispatch(handleSnackbar("event ajouté avec succès", "success"))
        : dispatch(handleSnackbar("event non ajouté", "error"));
      dispatch({
        type: ADD_EVENT_CALENDAR,
      });
      await dispatch(toggle("calendarEvents", false));
      dispatch(getCalendarEvents());
    } catch (err) {
      console.error(err.response.data);
      if (err.response.status === 400) {
        dispatch(alert(err.response.data.errors));
        dispatch(
          handleSnackbar(
            "Veuillez remplir tous les champs obligatoires",
            "error"
          )
        );
      } else if (err.response.status === 500) {
        dispatch(handleSnackbar("erreur 500 lors de l'ajout", "error"));
      } else {
        dispatch(handleSnackbar("access token expiré", "error"));
      }
    }
  };
};
export const getCalendarEvents = (filter) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        _base_url_event_calender + "?" + qs.stringify(filter)
      );
      dispatch({
        type: GET_CALENDAR_EVENTS_LIST,
        payload: res.data,
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };
};

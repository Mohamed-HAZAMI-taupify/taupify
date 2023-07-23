import axios from "axios";
import {
  GET_ALL_EVENTS,
  GET_EVENTS,
  GET_EVENTS_SEARCH,
} from "../../data/actionTypes";
import { _base_url_event } from "../../data/config";
import { notFoundData, spinnerEvent } from "./AlertActions";

var show = true;
var showAll = true;
const showAllPlanings = () => {
  show = !show;
};
const showAllEvents = () => {
  showAll = !showAll;
};

export const getEvents = (
  searchActivity,
  coach,
  studio,
  weekDay,
  showSearch
) => {
  return async (dispatch) => {
    try {
      await dispatch(spinnerEvent(true));
      const res = await axios.get(
        _base_url_event +
          "?activity=" +
          searchActivity +
          "&coach=" +
          coach +
          "&studio=" +
          studio +
          "&startedAt=" +
          weekDay
      );
      if (res.data == "error") {
        await dispatch(spinnerEvent(false));
        dispatch(notFoundData(true));
      }
      if (showSearch) {
        await dispatch({
          type: GET_EVENTS_SEARCH,
          payload: res.data,
        });
        dispatch(spinnerEvent(false));
      }
      if (!showSearch) {
        await dispatch({
          type: GET_EVENTS,
          payload: res.data,
        });
        dispatch(spinnerEvent(false));
      }
    } catch (err) {
      await dispatch(spinnerEvent(false));
      dispatch(notFoundData(true));
    }
  };
};
export const getAllEvents = () => {
  return async (dispatch) => {
    try {
      if (showAll) {
        const res = await axios.get(_base_url_event);
        dispatch({
          type: GET_ALL_EVENTS,
          payload: res.data,
        });
        showAllEvents();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

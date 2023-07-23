import {
  SEARCHING,
  SEARCH_DATE,
  SEARCH_TYPE,
  SEARCH_MONTH,
  SEARCH_DATE_STATE,
  HANDLE_SCROLL,
  SEARCHING_ACTIVITY,
  SWITCH_BUTTON,
  SEARCHING_PROSPECT_TYPE,
  SEARCHING_STATE_CONTACT,
  SEARCHING_SOURCE_CONTACT,
} from "../../data/actionTypes";
export const searching = (event) => {
  return (dispatch) => {
    dispatch({
      type: SEARCHING,
      payload: event,
    });
  };
};

export const searchingProspectType = (event) => {
  return (dispatch) => {
    dispatch({
      type: SEARCHING_PROSPECT_TYPE,
      payload: event,
    });
  };
};

export const searchingStateContact = (event) => {
  return (dispatch) => {
    dispatch({
      type: SEARCHING_STATE_CONTACT,
      payload: event,
    });
  };
};

export const searchingSourceContact = (event) => {
  return (dispatch) => {
    dispatch({
      type: SEARCHING_SOURCE_CONTACT,
      payload: event,
    });
  };
};

export const searchingActivity = (event) => {
  return (dispatch) => {
    dispatch({
      type: SEARCHING_ACTIVITY,
      payload: event,
    });
  };
};

export const searchDate = (date) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_DATE,
      payload: date,
    });
  };
};

export const searchType = (type) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_TYPE,
      payload: type,
    });
    dispatch({
      type: SEARCH_DATE,
      payload: new Date(),
    });
  };
};
export const searchMonth = (month) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_MONTH,
      payload: month,
    });
  };
};
export const searchDateState = (etat) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_DATE_STATE,
      payload: etat,
    });
  };
};
export const handleScrollPage = (page) => {
  return (dispatch) => {
    dispatch({
      type: HANDLE_SCROLL,
      payload: page,
    });
  };
};
export const handleSwitch = (switched) => {
  return (dispatch) => {
    dispatch({
      type: SWITCH_BUTTON,
      payload: switched,
    });
  };
};

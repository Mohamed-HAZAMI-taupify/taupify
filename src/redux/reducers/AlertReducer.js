import {
  ALERT,
  DATA_NOT_FOUND,
  MESSAGE_MESSAGE,
  START_SNACKBAR,
  START_SPINNER_LOADING,
  STOP_SPINNER_LOADING,
  STOP_SNACKBAR,
  DATA_UNTROUVABLE,
  SPINNER_EVENT,
  SPINNER_SUBSCRIPTION,
  SUBSCRIPTION_NOT_FOUND,
  SPINNER_MEMBER_RESERVATION,
  MEMBER_RESERVATION_NOT_FOUND,
  SPINNER_ACTIVITY,
  SPINNER_STUDIO,
  SPINNER_COACH,
  SPINNER_CONTACT_US,
  SPINNER_LEMON_ONE_CONTACT,
  SPINNER_MEMBER_OWN_EVENTS,
  SPINNER_COACH_SEARCH,
  PROSPECT_TYPE,
  SPINNER_RESERVATION,
  SPINNER_COACH_WITH_FILTER,
  SET_LOADING,
} from "../../data/actionTypes";

const initialState = {
  alerts: {},
  snackbar: false,
  message: "",
  color: "",
  spinner: false,
  eventSpinner: true,
  data: false,
  msg: "",
  notfound: false,
  subscriptionSpinner: true,
  subscriptionData: false,
  reservationMemberSpinner: true,
  reservationMemberData: false,
  activitySpinner: true,
  studioSpinner: true,
  coachSpinner: true,
  contactUsSpinner: true,
  lemonOneContactSpinner: true,
  memberOwnEventsSpinner: true,
  coachSearchSpinner: true,
  reservationSpinner: true,
  coachWithFilterSpinner: true,
  prsopectType: "Pop up inscription",
  alertCnx: [],
  loadingMemberEvents: false,
};
const AlertReducer = (state = initialState, action) => {
  const { type, payload, color } = action;

  switch (type) {
    case ALERT:
      return {
        ...state,
        alerts: payload,
      };
    case START_SNACKBAR:
      return { ...state, snackbar: true, message: payload, color: color };
    case STOP_SNACKBAR:
      return { ...state, snackbar: false };
    case START_SPINNER_LOADING:
      return { ...state, spinner: payload };
    case STOP_SPINNER_LOADING:
      return { ...state, spinner: payload };
    case DATA_NOT_FOUND:
      return { ...state, data: payload };
    case MESSAGE_MESSAGE:
      return { ...state, msg: payload };
    case DATA_UNTROUVABLE:
      return { ...state, notfound: payload };
    case SPINNER_EVENT:
      return { ...state, eventSpinner: payload };
    case SPINNER_SUBSCRIPTION:
      return { ...state, subscriptionSpinner: payload };
    case SUBSCRIPTION_NOT_FOUND:
      return { ...state, subscriptionData: payload };
    case SPINNER_MEMBER_RESERVATION:
      return { ...state, reservationMemberSpinner: payload };
    case MEMBER_RESERVATION_NOT_FOUND:
      return { ...state, reservationMemberData: payload };
    case SPINNER_ACTIVITY:
      return { ...state, activitySpinner: payload };
    case SPINNER_STUDIO:
      return { ...state, studioSpinner: payload };
    case SPINNER_COACH:
      return { ...state, coachSpinner: payload };
    case SPINNER_CONTACT_US:
      return { ...state, contactUsSpinner: payload };
    case SPINNER_LEMON_ONE_CONTACT:
      return { ...state, lemonOneContactSpinner: payload };
    case SPINNER_MEMBER_OWN_EVENTS:
      return { ...state, memberOwnEventsSpinner: payload };
    case SPINNER_COACH_SEARCH:
      return { ...state, coachSearchSpinner: payload };
    case PROSPECT_TYPE:
      return { ...state, prsopectType: payload };
    case SPINNER_RESERVATION:
      return { ...state, reservationSpinner: payload };
    case SPINNER_COACH_WITH_FILTER:
      return { ...state, coachWithFilterSpinner: payload };
    case SET_LOADING:
      return { ...state, loadingMemberEvents: payload };
    default:
      return state;
  }
};
export default AlertReducer;

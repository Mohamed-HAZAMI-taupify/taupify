import {
  ALERT,
  DATA_NOT_FOUND,
  MESSAGE_MESSAGE,
  SPINNER_LEMON_ONE_CONTACT,
  LEMON_ONE_CONTACT_NOT_FOUND,
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
  SPINNER_MEMBER_OWN_EVENTS,
  SPINNER_COACH_SEARCH,
  PROSPECT_TYPE,
  SPINNER_RESERVATION,
  SPINNER_COACH_WITH_FILTER,
  SET_LOADING,
} from "../../data/actionTypes";
import Swal from "sweetalert2/src/sweetalert2";
export const alert = (errors) => {
  return (dispatch) => {
    const alert = {};
    errors && errors.map((e) => (alert[e.param] = e.msg));
    dispatch({
      type: ALERT,
      payload: alert,
    });
  };
};
export const handleSnackbar = (msg, color_icon, isShort) => {
  return async () => {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: isShort ? 1500 : 3000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: color_icon,
      title: msg,
    });
  };
};

export const handleWaitSnackbar = (msg, color_icon, leave) => {
  return async () => {
    Swal.mixin({
      toast: leave,
      position: "top-end",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: color_icon,
      title: msg,
    });
  };
};

export const spinnerLoading = (spinner) => {
  return (dispatch) => {
    // ? dispatch({
    //     type: START_SPINNER_LOADING,
    //     payload: false,
    //   })
    // : dispatch({
    //     type: STOP_SPINNER_LOADING,
    //     payload: spinner,
    //   });
  };
};

export const notFoundData = (found) => {
  return (dispatch) => {
    dispatch({
      type: DATA_UNTROUVABLE,
      payload: found,
    });
  };
};

export const dataNotFound = (data) => {
  return (dispatch) => {
    dispatch({
      type: DATA_NOT_FOUND,
      payload: data,
    });
  };
};

export const handleMessage = (msg) => {
  return (dispatch) => {
    dispatch({
      type: MESSAGE_MESSAGE,
      payload: msg,
    });
  };
};

export const spinnerEvent = (spinner) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_EVENT,
      payload: spinner,
    });
  };
};

export const spinnerSubscription = (spinnerSub) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_SUBSCRIPTION,
      payload: spinnerSub,
    });
  };
};

export const SubscriptioNotFound = (subscriptionData) => {
  return (dispatch) => {
    dispatch({
      type: SUBSCRIPTION_NOT_FOUND,
      payload: subscriptionData,
    });
  };
};

export const spinnerMemberEventReservation = (spinnerRes) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_MEMBER_RESERVATION,
      payload: spinnerRes,
    });
  };
};

export const MemberEventReservationNotFound = (memberReservationData) => {
  return (dispatch) => {
    dispatch({
      type: MEMBER_RESERVATION_NOT_FOUND,
      payload: memberReservationData,
    });
  };
};

export const spinnerGetLemonOneContact = (spinnerLemonOne) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_LEMON_ONE_CONTACT,
      payload: spinnerLemonOne,
    });
  };
};
export const LemonOneContactNotFound = (notFound) => {
  return (dispatch) => {
    dispatch({
      type: LEMON_ONE_CONTACT_NOT_FOUND,
      payload: notFound,
    });
  };
};
export const spinnerActivity = (spinnerA) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_ACTIVITY,
      payload: spinnerA,
    });
  };
};

export const spinnerStudio = (spinnerSt) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_STUDIO,
      payload: spinnerSt,
    });
  };
};

export const spinnerCoach = (spinnerCoa) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_COACH,
      payload: spinnerCoa,
    });
  };
};

export const spinnerContactUs = (spinnerContUs) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_CONTACT_US,
      payload: spinnerContUs,
    });
  };
};

export const spinnerMemberOwnEvents = (spinnerMemberEvents) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_MEMBER_OWN_EVENTS,
      payload: spinnerMemberEvents,
    });
  };
};

export const spinnerCoachSearch = (coach) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_COACH_SEARCH,
      payload: coach,
    });
  };
};

export const handleProspectType = (prospectType) => {
  return (dispatch) => {
    dispatch({
      type: PROSPECT_TYPE,
      payload: prospectType,
    });
  };
};

export const spinnerReservation = (spinner) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_RESERVATION,
      payload: spinner,
    });
  };
};

export const spinnerCoachWithFilter = (spinner) => {
  return (dispatch) => {
    dispatch({
      type: SPINNER_COACH_WITH_FILTER,
      payload: spinner,
    });
  };
};

export const setLoading = (loading) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: loading,
    });
  };
};

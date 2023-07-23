import axios from "axios";
import { LOAD_MEMBER_OWN_EVENTS } from "../../components/graphQL/Queries";
import {
  ADD_RESERVATION,
  CANCEL_MEMBER_EVENT,
  GET_CLASS_EVENT_BY_ID,
  GET_MEMBER_OWN_EVENTS,
  GET_MEMBER_OWN_EVENTS_GQL_SUCCESS,
} from "../../data/actionTypes";
import { _base_url_member_own_events } from "../../data/config";
import {
  dataNotFound,
  handleSnackbar,
  handleWaitSnackbar,
  setLoading,
  spinnerMemberOwnEvents,
  spinnerReservation,
} from "./AlertActions";
import jwt_decode from "jwt-decode";

export const getMemberOwnEvents = (page, eventState) => {
  return async (dispatch) => {
    try {
      await dispatch(spinnerMemberOwnEvents(true));
      const res = await axios.get(
        _base_url_member_own_events + "?page=" + page + "&state=" + eventState, {
          params: {
            param: jwt_decode(localStorage.getItem('token')).targetId
          }
        });
      dispatch({
        type: GET_MEMBER_OWN_EVENTS,
        payload: res.data["hydra:member"],
        totalItems: res.data["hydra:totalItems"],
      });
      await dispatch(spinnerMemberOwnEvents(false));
    } catch (err) {
      dispatch(spinnerMemberOwnEvents(false));
      dispatch(dataNotFound(true));
    }
  };
};

export const getMemberOwnEventsGraphQL =
  (memberOwnEventsArgs) => (dispatch, getState, client) => {
    dispatch(setLoading(true));
    client
      .query({
        query: LOAD_MEMBER_OWN_EVENTS,
        fetchPolicy: "no-cache",
        variables: {
          memberOwnEventsArgs: memberOwnEventsArgs,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_MEMBER_OWN_EVENTS_GQL_SUCCESS,
          payload: res.data.memberOwnEvents[0].memberOwnEventsList,
          itemslength: res.data.memberOwnEvents[0].totalItems,
        });
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const CancelMemberEvent = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      await axios.post(_base_url_member_own_events + "/" + eventId);
      await dispatch(
        handleSnackbar("Réservation annulée avec succès", "success")
      );
      await dispatch({
        type: CANCEL_MEMBER_EVENT,
      });
    } catch (err) {
      dispatch(
        handleSnackbar(
          "erreur lors de l'annulation de cette réservation",
          "error"
        )
      );
    }
  };
};

export const GetClassEventById = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch(spinnerReservation(true));
      const res = await axios.get(_base_url_member_own_events + "/" + eventId);
      await dispatch({
        type: GET_CLASS_EVENT_BY_ID,
        payload: res.data,
      });
      dispatch(spinnerReservation(false));
    } catch (err) {
      console.log(err);
      dispatch(spinnerReservation(false));
    }
  };
};
export const Reserver = (event, eventId) => {
  return async (dispatch) => {
    try {
      dispatch(
        handleWaitSnackbar("Téléchargment des données ... ", "info", true)
      );
      const res = await axios.post(_base_url_member_own_events, event);
      if (res.data === "Reservation added") {
        await dispatch(
          handleWaitSnackbar("Téléchargment des données ... ", "info", false)
        );

        await dispatch(
          handleSnackbar("Réservation ajoutée avec succès", "success")
        );
        await dispatch(GetClassEventById(eventId));
      } else if (res.data === "api.error.attendee.already-attending") {
        await dispatch(
          handleWaitSnackbar("Téléchargment des données ... ", "info", false)
        );
        dispatch(handleSnackbar("Vous avez déjà réservé ce cours", "error"));
      } else {
        await dispatch(
          handleWaitSnackbar("Téléchargment des données ... ", "info", false)
        );
        dispatch(
          handleSnackbar(
            "Oups!!, une erreur se produit lors de l'ajout de cette réservation",
            "error"
          )
        );
      }
      await dispatch({
        type: ADD_RESERVATION,
      });
    } catch (err) {
      await dispatch(
        handleWaitSnackbar("Téléchargment des données ... ", "info", false)
      );
      dispatch(
        handleSnackbar(
          "Oups!!, une erreur se produit lors de l'ajout de cette réservation",
          "error"
        )
      );
    }
  };
};

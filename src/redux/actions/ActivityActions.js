import axios from "axios";
import {
  ADD_ACTIVITY,
  GET_ACTIVITIES,
  ACTIVITY_DETAILS,
  PUT_ACTIVITY,
  GET_ACTIVITY,
  DELETE_ACTIVITY,
} from "../../data/actionTypes";
import { toggle } from "./AdminActions";
import { alert, handleSnackbar, spinnerActivity } from "./AlertActions";
import { _base_url_activity } from "../../data/config";
import qs from "qs";

var showActivity = true;

const showActtivities = () => {
  showActivity = !showActivity;
};

export const getActivity = (filter) => {
  return async (dispatch) => {
    if (showActivity) {
      await dispatch(spinnerActivity(true));
      await axios
        .get(_base_url_activity + "?" + qs.stringify(filter))
        .then(async (res) => {
          await dispatch({
            type: GET_ACTIVITIES,
            payload: res.data,
          });
        });
      await dispatch(spinnerActivity(false));
      showActtivities();
    }
  };
};
export const getActivityById = (id, modal) => {
  return async (dispatch) => {
    const res = await axios.get(_base_url_activity + "/" + id);
    await dispatch({
      type: GET_ACTIVITY,
      payload: res.data,
    });
    if (modal) {
      dispatch(toggle(modal, true));
    }
  };
};
export const activityDetails = (activity) => {
  return (dispatch) => {
    dispatch({
      type: ACTIVITY_DETAILS,
      payload: activity,
    });
  };
};
export const addActivity = (activity) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.post(_base_url_activity, activity);
      if (res.data === "activity added") {
        dispatch(handleSnackbar("activité ajoutée avec succès", "success"));
        dispatch({
          type: ADD_ACTIVITY,
        });
        await dispatch(getActivity());
        await dispatch(toggle("activity", false));
      } else {
        dispatch(handleSnackbar(res.data, "error"));
        dispatch(alert(""));
      }
    } catch (err) {
      console.error(err.response.data);
      if (err.response.status === 400) {
        dispatch(
          handleSnackbar("veuillez remplir les champs obligatoires", "error")
        );
        dispatch(alert(err.response.data.errors));
      } else {
        dispatch(
          handleSnackbar("oups!! erreur lors de l'ajout de l'activité", "error")
        );
      }
    }
  };
};
export const editActivity = (id, activity) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.put(_base_url_activity + "/" + id, activity);

      if (res.data === "updated successfully") {
        dispatch(handleSnackbar("activité modifié avec succès", "success"));
        dispatch({
          type: PUT_ACTIVITY,
        });
        await dispatch(toggle("updateActivityModal", false));
      } else {
        dispatch(handleSnackbar(res.data, "error"));
        dispatch(alert(""));
      }

      dispatch(getActivity());
    } catch (err) {
      console.error(err.response.data);
      dispatch(
        handleSnackbar(
          "oups!! erreur lors de la modification de l'activité",
          "error"
        )
      );
    }
  };
};
export const deleteActivity = (activity) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(_base_url_activity + activity);
      if (res.data === "activity deleted") {
        dispatch(handleSnackbar("activité supprimés avec succès", "success"));
        dispatch({
          type: DELETE_ACTIVITY,
        });

        dispatch(getActivity());
      }
    } catch (err) {
      console.error(err);
      dispatch(
        handleSnackbar(
          `oups!! erreur lors de suppression de l'activité`,
          "error"
        )
      );
    }
  };
};

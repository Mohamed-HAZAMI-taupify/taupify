import axios from "axios";
import {
  ADD_STUDIO,
  DELETE_STUDIO,
  GET_STUDIO,
  PUT_STUDIO,
  STUDIOS_DETAILS,
} from "../../data/actionTypes";
import { _base_url_studio } from "../../data/config";
import { toggle } from "./AdminActions";
import { alert, handleSnackbar, spinnerStudio } from "./AlertActions";
import qs from "qs";

var showStudio = true;
const showStudios = () => {
  showStudio = !showStudio;
};

export const getStudio = (filter) => {
  return async (dispatch) => {
    try {
      if (showStudio) {
        await dispatch(spinnerStudio(true));
        const res = await axios.get(
          _base_url_studio + "?" + qs.stringify(filter)
        );
        await dispatch({
          type: GET_STUDIO,
          payload: res.data,
        });
        dispatch(spinnerStudio(false));
        showStudios();
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };
};
export const addStudio = (studio) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.post(_base_url_studio, studio);
      if (res.data === "added") {
        dispatch(handleSnackbar("studio ajouté avec succès", "success"));
        dispatch({
          type: ADD_STUDIO,
        });
        await dispatch(toggle("studio", false));
      } else {
        dispatch(handleSnackbar(res.data, "error"));
        dispatch(alert(""));
      }
      dispatch(getStudio());
    } catch (err) {
      console.error(err.response.data);
      if (err.response.status === 400) {
        dispatch(alert(err.response.data.errors));
        handleSnackbar(err.response.data.errors, "error");
      } else {
        dispatch(
          handleSnackbar("oups!! erreur lors de l'ajout de studio", "error")
        );
      }
    }
  };
};
export const editStudio = (idUrl, studio) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.put(_base_url_studio + "/" + idUrl, studio);
      if (res.data === "updated successfully") {
        dispatch(handleSnackbar("studio modifié avec succès", "success"));
        dispatch({
          type: PUT_STUDIO,
        });
        await dispatch(toggle("updateStudioModal", false));
      } else {
        dispatch(handleSnackbar(res.data, "error"));
        dispatch(alert(""));
      }
      dispatch(getStudio());
    } catch (err) {
      console.error(err.response.data);
      if (err.response.status === 400) {
        dispatch(alert(err.response.data.errors));
      } else
        dispatch(
          handleSnackbar(
            "oups!! erreur lors de la modification de studio",
            "error"
          )
        );
    }
  };
};
export const deleteStudio = (studio) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));
      await axios.delete(_base_url_studio + studio);
      dispatch(handleSnackbar("studio supprimé avec succès", "success"));
      dispatch({
        type: DELETE_STUDIO,
      });
      dispatch(getStudio());
    } catch (err) {
      console.error(err);
      dispatch(
        handleSnackbar(`oups!! erreur lors de suppression de studio`, "error")
      );
    }
  };
};
export const StudioDetails = (studio) => {
  return (dispatch) => {
    dispatch({
      type: STUDIOS_DETAILS,
      payload: studio,
    });
  };
};

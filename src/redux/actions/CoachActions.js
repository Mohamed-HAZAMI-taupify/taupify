import {
  GET_COACH_LIST_SEARCH,
  GET_COACH_LIST,
  DELETE_NEW_COACH,
  EDIT_COACH_LIST,
  ADD_COACH,
  COACH_DETAILS_LIST,
  GET_COACH_NO_FILTER,
  GET_COACH_WITH_FILTER,
  GET_COACH_BY_ID,
  GET_ALL_COACHES,
  GET_COACH_IMAGE,
} from "../../data/actionTypes";
import {
  _base_url_coach,
  _coach_filtered,
  _get_coach_image,
} from "../../data/config";
import axios from "axios";
import qs from "qs";
import {
  alert,
  handleSnackbar,
  spinnerCoach,
  spinnerCoachWithFilter,
} from "./AlertActions";
import { toggle } from "./AdminActions";

var show = true;
var showCoachsfiltred = true;
const showCoachs = () => {
  show = !show;
};
const showCoachsWithFilter = () => {
  showCoachsfiltred = !showCoachsfiltred;
};

export const addCoach = (coach) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.post(_base_url_coach, coach);
      res.data === "coach added"
        ? dispatch(handleSnackbar("coach ajouté avec succès", "success"))
        : dispatch(handleSnackbar("coach non ajouté", "error"));
      dispatch({
        type: ADD_COACH,
      });
      await dispatch(toggle("coach", false));
      dispatch(getCoachList());
    } catch (err) {
      console.error(err.response.data);
      if (err.response.status === 400) {
        dispatch(alert(err.response.data.errors));
        dispatch(
          handleSnackbar(
            "Veillez remplir tous les champs obligatoires",
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

export const getCoachList = (filter, showSearch) => {
  return async (dispatch) => {
    if (show) {
      await dispatch(spinnerCoach(true));
      await axios
        .get(_base_url_coach + "?" + qs.stringify(filter))
        .then((res) => {
          showSearch
            ? dispatch({
                type: GET_COACH_LIST,
                payload: res.data,
              })
            : dispatch({
                type: GET_COACH_LIST_SEARCH,
                payload: res.data,
              });
        });
      dispatch(spinnerCoach(false));
      showCoachs();
    }
  };
};
export const getAllCoachList = () => {
  return (dispatch) => {
    axios.get(_base_url_coach).then((res) => {
      dispatch({
        type: GET_ALL_COACHES,
        payload: res.data,
      });
    });
  };
};
export const deleteNewCoach = (coachID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));

      const res = await axios.delete(_base_url_coach + "/" + coachID);
      dispatch({
        type: DELETE_NEW_COACH,
        payload: res.data,
      });
      res.status === 200
        ? dispatch(handleSnackbar("coach supprimé avec succès", "success"))
        : dispatch(handleSnackbar("coach non supprimé", "error"));
      dispatch(getCoachList());
    } catch (err) {
      dispatch(handleSnackbar(`erruer 404`, "error"));
    }
  };
};
export const coachListDetails = (coach) => {
  return (dispatch) => {
    dispatch({
      type: COACH_DETAILS_LIST,
      payload: coach,
    });
  };
};
export const editCoachList = (coach) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.put(
        _base_url_coach + "/" + coach._id,
        {
          givenName: coach.givenName,
          familyName: coach.familyName,
          alternateName: coach.alternateName,
          activities: coach.activities,
          image: {
            _url: coach.image._url,
            _delete_url: coach.image._delete_url,
          },
          description: coach.description,
          socialmedia: coach.socialmedia,
          email: coach.email,
          phone: coach.phone,
          date: coach.date,
        },
        config
      );
      res.status === 200
        ? dispatch(handleSnackbar("coach modifié avec succès", "success"))
        : dispatch(handleSnackbar("coach non modifié", "error"));

      dispatch({
        type: EDIT_COACH_LIST,
      });
      await dispatch(alert([]));
      await dispatch(toggle("updateCoachModal", false));
      dispatch(getCoachList());
    } catch (err) {
      console.error(err.response.data);
      if (err.response.status === 400) {
        dispatch(alert(err.response.data.errors));
        dispatch(
          handleSnackbar(
            "Veillez remplir tous les champs obligatoires",
            "error"
          )
        );
      } else if (err.response.status === 404) {
        dispatch(handleSnackbar("erreur 404 lors de la modification", "error"));
      } else {
        dispatch(handleSnackbar("access token expiré", "error"));
      }
    }
  };
};
export const getCoachsNoFilter = () => {
  return (dispatch) => {
    axios.get(_base_url_coach).then((res) => {
      dispatch({
        type: GET_COACH_NO_FILTER,
        payload: res.data,
      });
    });
  };
};

export const getCoachWithFilter = (coachFilter) => {
  return async (dispatch) => {
    try {
      await dispatch(spinnerCoachWithFilter(true));
      const res = await axios.get(
        _coach_filtered + "?" + qs.stringify(coachFilter)
      );
      dispatch({
        type: GET_COACH_WITH_FILTER,
        payload: res.data,
      });
      dispatch(spinnerCoachWithFilter(false));
    } catch (err) {
      dispatch(spinnerCoachWithFilter(false));
      console.log(err);
    }
  };
};

export const getCoachImage = (coachId) => {
  return (dispatch) => {
    axios.get(_get_coach_image + coachId).then((res) => {
      dispatch({
        type: GET_COACH_IMAGE,
        payload: res.data,
      });
    });
  };
};

import axios from "axios";
import {
  SHOW_ALL_RDV,
  CREATE_RDV,
  CANCEL_RDV,
  GET_FILTERED_RDVS,
  GET_FILTERED_RDVS_SEARCH,
  GET_ALL_CANCELED_FILTERED_RDVS,
  GET_ALL_NOT_CANCELED_FILTERED_RDVS,
} from "../../data/actionTypes";
import {
  _base_url_rdv,
  _filtered_rdvs,
  _canceled_rdv,
  _active_rdv,
  _confirmation_rdv_mail
} from "../../data/config";
import qs from "qs";
import { alert, handleSnackbar } from "./AlertActions";
import { toggle } from "./AdminActions";
import { sendAnnulationMail, sendConfirmationEmailRDVs } from "./EmailActions";
export const addToRdvs = (rdv) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const body = JSON.stringify(rdv);
      const res = await axios.post(_base_url_rdv, body, config);
      dispatch({
        type: CREATE_RDV,
      });
      dispatch(alert([]));
      dispatch(toggle("confirmRdv", true));
      const {
        _id,
        firstname,
        lastname,
        email,
        plannedForDate,
        plannedForTime,
      } = rdv;
      await dispatch(
        sendConfirmationEmailRDVs(
          {
            _id,
            firstname,
            lastname,
            email,
            plannedForDate,
            plannedForTime,
          },
          config
        )
      );
      dispatch(handleSnackbar("Rendez-vous planifié avec succès!!"));
    } catch (err) {
      dispatch(handleSnackbar("un probléme !!!!!!", "error"));
      dispatch(alert(err.response.data.errors));
      console.error(err.response.data);
    }
  };
};
export const cancelrdv = (rdvId, reason, rdv) => {
  return async (dispatch) => {
    try {
      await dispatch(handleSnackbar("loading dat ....", "info"));
      const res = await axios.put(_base_url_rdv + rdvId, {
        isCanceled: true,
        cancelReason: reason,
      });
      await dispatch({
        type: CANCEL_RDV,
        payload: res.data,
      });
      dispatch(toggle("canceledRdv", true));
      await dispatch(sendAnnulationMail(rdv));
      await dispatch(handleSnackbar("anuulé avec sucées", "success"));
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      dispatch(handleSnackbar("un probléme !!!!!!", "error"));
      dispatch(alert(err.response.data.errors));
      console.error(err.response.data);
    }
  };
};
export const deleteRdv = (RdvID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));
      const res = await axios.delete(_base_url_rdv + RdvID);
      dispatch({
        type: SHOW_ALL_RDV,
        payload: res.data,
      });
      res.status === 200
        ? dispatch(handleSnackbar("rendez-vous annulé avec succès", "success"))
        : dispatch(
            handleSnackbar(
              "Oups! rendez-vous non annulé.. veuillez réessayer",
              "error"
            )
          );
      dispatch(getfilteredRdvs());
    } catch (err) {
      dispatch(handleSnackbar(`erreur 404`, "error"));
    }
  };
};
export const getfilteredRdvs = (filter, showSearch) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(_filtered_rdvs + "?" + qs.stringify(filter));
      showSearch
        ? dispatch({
            type: GET_FILTERED_RDVS,
            payload: res.data,
          })
        : dispatch({
            type: GET_FILTERED_RDVS_SEARCH,
            payload: res.data,
          });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getAllCanceledRdvs = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(_canceled_rdv);
      dispatch({
        type: GET_ALL_CANCELED_FILTERED_RDVS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getAllNotCanceledRdvs = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(_active_rdv);
      dispatch({
        type: GET_ALL_NOT_CANCELED_FILTERED_RDVS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
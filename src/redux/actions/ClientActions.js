import axios from "axios";
import {
  ADD_MEMBER,
  DELETE_MEMBER,
  MEMBER_DETAILS,
  EDIT_MEMBER,
  PUT_MEMBER_PROFILE,
  GET_CONTACT_PROFIL,
} from "../../data/actionTypes";
import {
  _base_url_member,
  affiche_all_members,
  _base_url_contact,
  _update_in_resa_db_contact,
  _base_url_contact_resamania,
} from "../../data/config";
import { toggle } from "./AdminActions";
import { alert, handleSnackbar, handleWaitSnackbar } from "./AlertActions";
import { loadUser } from "./authActions";

export const editMemberProfile = (profil, contactId) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.put(
        _base_url_contact_resamania + "/" + contactId,
        profil
      );
      if (res.data === "updated successfully") {
        dispatch(handleSnackbar("contact modifié avec succès", "success"));
        dispatch({
          type: PUT_MEMBER_PROFILE,
        });
      } else {
        await dispatch(
          handleSnackbar("oups! une erreur arrête votre modification!", "error")
        );
        await dispatch(alert([]));
      }
      dispatch(loadUser());
    } catch (err) {
      console.error(err.response.data);
      dispatch(
        handleSnackbar("oups! une erreur arrête votre modification!", "error")
      );
      dispatch(alert(err.response.data.errors));
    }
  };
};
export const editPassword = (contactId, password) => {
  return async (dispatch) => {
    try {
      dispatch(
        handleWaitSnackbar("Téléchargment des données ... ", "info", true)
      );
      const res = await axios.put(
        _base_url_contact_resamania + `/${contactId}/change-password`,
        password
      );
      if (res.data === "updated successfully") {
        await dispatch(
          handleWaitSnackbar("Téléchargment des données ... ", "info", false)
        );
        await dispatch(
          handleSnackbar("Mot de passe modifié avec succès", "success")
        );
        dispatch({
          type: PUT_MEMBER_PROFILE,
        });
      } else {
        await dispatch(
          handleWaitSnackbar("Téléchargment des données ... ", "info", false)
        );
        await dispatch(
          handleSnackbar(
            "Erreur lors du changement de votre mot de passe",
            "error"
          )
        );
        dispatch(alert(""));
      }
      dispatch(loadUser());
    } catch (err) {
      console.error(err.response.data);
      dispatch(
        handleWaitSnackbar("Téléchargment des données ... ", "info", false)
      );
      dispatch(
        handleSnackbar(
          "Erreur lors du changement de votre mot de passe",
          "error"
        )
      );
    }
  };
};
export const addMember = (member) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const body = JSON.stringify(member);
      const res = await axios.post(_base_url_member, body, config);
      res.status === 200
        ? dispatch(handleSnackbar("Membre ajouté avec succès", "success"))
        : dispatch(handleSnackbar("Demande non envoyée", "error"));
      dispatch({
        type: ADD_MEMBER,
      });
      await dispatch(toggle("member", false));
      await dispatch(alert([]));
    } catch (err) {
      dispatch(alert(err.response.data.errors));
      console.error(err.response.data);
    }
  };
};

export const deleteMember = (memberID) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("suppression en cours ... ", "info"));
      const res = await axios.delete(_base_url_member + memberID);
      dispatch({
        type: DELETE_MEMBER,
        payload: res.data,
      });
      res.status === 200
        ? dispatch(handleSnackbar("membre supprimé avec succès", "success"))
        : dispatch(
            handleSnackbar(
              "Oups!! le membre n'a pas été supprimer veuillez ressayer!",
              "error"
            )
          );
    } catch (err) {
      dispatch(
        handleSnackbar(
          "Oups!! le membre n'a pas été supprimer veuillez ressayer!",
          "error"
        )
      );
    }
  };
};
export const memberDetails = (member) => {
  return (dispatch) => {
    dispatch({
      type: MEMBER_DETAILS,
      payload: member,
    });
  };
};
export const editMember = (member) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const res = await axios.put(_base_url_member + member._id, {
        civilite: member.civilite,
        firstname: member.firstname,
        lastname: member.lastname,
        image: {
          _url: member.image._url,
          _delete_url: member.image._delete_url,
        },
        email: member.email,
        phone: member.phone,
      });
      res.status === 200
        ? dispatch(handleSnackbar("membre modifié avec succès", "success"))
        : dispatch(
            handleSnackbar(
              "Oups!! le membre n'a pas été modifier veuillez ressayer!",
              "error"
            )
          );
      dispatch({
        type: EDIT_MEMBER,
        payload: res.data,
      });
      await dispatch(alert([]));
      await dispatch(toggle("updateMemberModal", false));
    } catch (err) {
      if (err.response.status === 400) {
        dispatch(alert(err.response.data.errors));
        dispatch(
          handleSnackbar(
            "Veuillez remplir tous les champs obligatoires",
            "error"
          )
        );
      } else if (err.response.status === 404) {
        dispatch(
          handleSnackbar(
            "Oups erreur 404!! le membre n'a pas été modifier veuillez ressayer!",
            "error"
          )
        );
      } else {
        dispatch(
          handleSnackbar(
            "Oups!! le membre n'a pas été modifier veuillez ressayer!",
            "error"
          )
        );
      }
    }
  };
};

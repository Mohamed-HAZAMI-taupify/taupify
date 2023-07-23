import axios from "axios";
import { RESET_PASSWORD } from "../../data/actionTypes";
import { _base_url_reset_password } from "../../data/config";
import { alert, handleSnackbar } from "./AlertActions";
export const resetPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ...", "info"));
      const res = await axios.post(_base_url_reset_password, email);
      if (res.data === "added") {
        dispatch(
          handleSnackbar(
            "Un email de réinitialisation de mot de passe vous a été envoyé",
            "success"
          )
        );
        dispatch({
          type: RESET_PASSWORD,
        });
      } 
      else if (res.data === "The user is undefined.") {
        dispatch(handleSnackbar("l'email entrée n'est pas valide", "error"));
      } 
      else {
         dispatch(handleSnackbar("erreur lors de l'envoi de votre demande", "error")); 
        dispatch(alert(""));
      }
    } catch (err) {
      if (err.response.status === 400) {
        console.log("err", err)
        dispatch(handleSnackbar("erreur lors de l'envoi de votre demande", "error"));
        dispatch(alert(err.response.data.errors));
      }
    }
  };
};

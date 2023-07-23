import axios from "axios";
import {
  _base_url_email,
  _confirmation_rdv_mail,
  _cancelation_rdv_mail,
} from "../../data/config";
import {
  SEND_EMAIL,
  SEND_CONFIRMATION_EMAIL_RDV,
  SEND_CANCELATION_EMAIL,
} from "../../data/actionTypes";
export const sendEmail = (mailObjet, mailDestinataire, mailTheme, mailTest) => {
  return (dispatch) => {
    axios
      .post(_base_url_email, {
        objet: mailObjet.objet,
        selectedDestinataire:
          mailDestinataire.selectedDestinataireListDistincts,
        selectedThemeName: mailTheme.selectedThemeName,
        envoie_test: mailTest.test,
      })
      .then((res) => {
        dispatch({
          type: SEND_EMAIL,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const sendConfirmationEmailRDVs = (RDV) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(_confirmation_rdv_mail, {
        firstname: RDV.firstname,
        lastname: RDV.lastname,
        email: RDV.email,
        plannedForDate: RDV.plannedForDate,
        plannedForTime: RDV.plannedForTime,
        _id: RDV._id,
      });
      dispatch({
        type: SEND_CONFIRMATION_EMAIL_RDV,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const sendAnnulationMail = (RDV) => {
  return (dispatch) => {
    axios
      .post(_cancelation_rdv_mail, {
        lastname: RDV.lastname,
        firstname: RDV.firstname,
        email: RDV.email,
        phone: RDV.phone,
        plannedForDate: new Date(RDV.plannedForDate).toLocaleDateString(
          "fr",
          RDV.DATE_OPTIONS
        ),
        plannedForTime: RDV.plannedForTime,
      })
      .then((res) => {
        dispatch({
          type: SEND_CANCELATION_EMAIL,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

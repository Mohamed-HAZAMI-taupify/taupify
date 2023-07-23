import axios from "axios";
import { alert, handleSnackbar } from "./AlertActions";
import {
  ADD_CONTACT_EVEREST,
  CONTACT_EVEREST_DETAILS,
  DELETE_CONTACT_EVEREST,
  UPDATE_CONTACT_EVEREST,
} from "../../data/actionTypes";
import {
  contact_us_prospect,
  _base_url_contact,
  _pre_registration_confirmation_mail,
} from "../../data/config";
import { toggle } from "./AdminActions";
import { data } from "../../data/routes/routesData";

export const addContactEverest = (contact, state) => {
  return async (dispatch) => {
    try {
      dispatch(handleSnackbar("Téléchargment des données ... ", "info"));
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const res = await axios.post(_base_url_contact, contact, config);
      if (res.status === 200) {
        await dispatch(
          handleSnackbar("Demande envoyée avec succès", "success")
        );
        if (state === "catalog") {
          dispatch(toggle("catalog", false));
        }
        if (state === "prospect_juin_us") {
          const { givenName, email } = contact;
          await axios.post(
            _pre_registration_confirmation_mail,
            {
              _id: res.data._id,
              givenName,
              email,
            },
            config
          );
          setTimeout((window.location.href = "/"), 3000);
        }
        if (state === "contest_game") {
          setTimeout((window.location.href = data.buy_tshirt_everest), 1500);
        }
        if (state === "exten_emails") {
          dispatch(toggle("externEmail", false));
        }

        if (state === "admin_prospect") {
          await dispatch(toggle("prospect", false));
        }

        if (state === "pop_up") {
          const { givenName, email } = contact;
          await axios.post(
            _pre_registration_confirmation_mail,
            {
              _id: res.data._id,
              givenName,
              email,
            },
            config
          );
          await dispatch(toggle("inscriptionhomePageModal", false));
          await dispatch(toggle("homePageModal", false));
        }

        if (state === "contact_us") {
          axios
            .get(contact_us_prospect + "/contact-exist/" + contact.email)
            .then((isExisting) => {
              if (isExisting.data.length > 0) {
                axios.put(
                  contact_us_prospect + "/" + isExisting.data.map((k) => k._id),
                  {
                    message: isExisting.data[0].message.concat(contact.message),
                  }
                );
              } else {
                axios.post(
                  contact_us_prospect,
                  {
                    contact: res.data._id,
                    email: contact.email,
                    message: contact.message,
                  },
                  config
                );
                setTimeout((window.location.href = data.accueil), 2500);
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      } else {
        dispatch(handleSnackbar("Demande non envoyée", "error"));
      }
      dispatch({
        type: ADD_CONTACT_EVEREST,
      });

      await dispatch(alert([]));
    } catch (err) {
      dispatch(alert(err.response.data.errors));
      dispatch(handleSnackbar("Demande non envoyée", "error"));
      console.error(err.response.data);
    }
  };
};

export const deleteContactEverest = (id) => {
  return async (dispatch) => {
    const res = await axios.delete(_base_url_contact + "/" + id);

    dispatch({
      type: DELETE_CONTACT_EVEREST,
      payload: res.data,
    });
  };
};

export const contactEverestDetails = (contact_everest) => {
  return (dispatch) => {
    dispatch({
      type: CONTACT_EVEREST_DETAILS,
      payload: contact_everest,
    });
  };
};

export const updateContactUser = (contactEverestID, data) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        _base_url_contact + "/" + contactEverestID,
        data
      );
      await dispatch({
        type: UPDATE_CONTACT_EVEREST,
        payload: res.data,
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };
};

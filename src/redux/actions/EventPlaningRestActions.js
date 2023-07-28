import axios from "axios";
import { GET_EVENTPLANINIG_REST } from "../../data/actionTypes";
import { _base_url_EventPlaning } from "../../data/config";

export const getEventPlaningRest = () => {
  return async (dispatch) => {
      await axios
        .get( _base_url_EventPlaning )
        .then(async (res) => {
          await dispatch({
            type: GET_EVENTPLANINIG_REST,
            payload: res.data,
          });
        });
    }
};


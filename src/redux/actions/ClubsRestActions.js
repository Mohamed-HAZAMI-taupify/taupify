import axios from "axios";
import { GET_CLUBS_REST } from "../../data/actionTypes";
import { _base_url_club } from "../../data/config";

export const getClubsRest = () => {
  return async (dispatch) => {
      await axios
        .get( _base_url_club + "/AllClubs")
        .then(async (res) => {
          await dispatch({
            type: GET_CLUBS_REST,
            payload: res.data,
          });
        });
    }
};


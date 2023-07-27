import axios from "axios";
import { GET_ACTIVITY_REST } from "../../data/actionTypes";
import { _base_url_activity } from "../../data/config";

export const getActivityRest = () => {
  return async (dispatch) => {
      await axios
        .get(_base_url_activity + "/AllActivity")
        .then(async (res) => {
          await dispatch({
            type: GET_ACTIVITY_REST,
            payload: res.data,
          });
        });
    }
};


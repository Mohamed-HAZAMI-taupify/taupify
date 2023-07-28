import axios from "axios";
import { GET_STUDIO_REST } from "../../data/actionTypes";
import {_base_url_studio } from "../../data/config";

export const getStudioRest = () => {
  return async (dispatch) => {
      await axios
        .get(_base_url_studio + "/AllStudio")
        .then(async (res) => {
          await dispatch({
            type: GET_STUDIO_REST,
            payload: res.data,
          });
        });
    }
};


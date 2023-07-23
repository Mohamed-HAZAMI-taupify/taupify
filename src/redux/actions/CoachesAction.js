import axios from "axios";
import { GET_COACHES  } from "../../data/actionTypes";
import { _base_url_coach } from "../../data/config";

export const getCoaches = () => {
  return async (dispatch) => {
    try {
         await axios.get( _base_url_coach + "/AllCoaches")
        .then( (res , err) => {
          dispatch({
            type: GET_COACHES,
            payload: res.data
          })
         }
        )
    } catch (err) {
      console.error(err);
    }
  };
};
import axios from "axios";
import { GET_CLUB, GET_CLUB_BY_ID } from "../../data/actionTypes";
import { _base_url_resamania, _base_url_club } from "../../data/config";

var showClub = true;
const showClubs = () => {
  showClub = !showClub;
};

export const getClubs = () => {
  return async (dispatch) => {
    if (showClub) {
      await axios.get(_base_url_club).then((res) => {
        dispatch({
          type: GET_CLUB,
          payload: res.data,
        });
      });
      showClubs();
    }
  };
};
export const getClubById = (club) => {
  return async (dispatch) => {
    await axios.get(_base_url_resamania + club).then((res) => {
      dispatch({
        type: GET_CLUB_BY_ID,
        payload: res.data,
      });
    });
  };
};

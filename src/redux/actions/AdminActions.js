import { PATH_TOGGLE, TOGGLE } from "../../data/actionTypes";
import { alert } from "./AlertActions";

export const actifPath = () => {
  return (dispatch) => {
    dispatch({
      type: PATH_TOGGLE,
    });
  };
};

export const toggle = (toggleName, etat) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE,
      payload: toggleName,
      etat,
    });
    if (!etat) {
      dispatch(alert([]));
    }
  };
};

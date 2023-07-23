import axios from "axios";
import { GET_All_ADMIN  } from "../../data/actionTypes";
import { _base_url_auth } from "../../data/config";

export const getAllAdmin = () => {
  return async (dispatch) => {
    try {
         await axios.get(_base_url_auth + "/everest-admin/all")
        .then( (res , err) => {
          dispatch({
            type: GET_All_ADMIN,
            payload: res.data
          })
         }
        )
    } catch (err) {
      console.error(err);
    }
  };
};

export const addAdmin = (formData) => {
  return async (dispatch) => {
    try {
        await axios.post(_base_url_auth + "/everest-admin", formData)
        .then( (res , err) => {
          if(res) {
            dispatch(getAllAdmin())
          } 
         }
        )
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateAdmin = (idAdmin , formData) => {
  return async (dispatch) => {
    try {
      await axios.put(_base_url_auth + `/everest-admin/${idAdmin}`, formData)
        .then( (res , err) => {
          if(res) {
            dispatch(getAllAdmin())
          } 
         }
        )
    } catch (err) {
      console.error(err);
    }
  };
};
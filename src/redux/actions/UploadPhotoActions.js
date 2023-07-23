import { UPLOAD_PHOTO_SUCCESS } from "../../data/actionTypes";
import axios, { post } from "axios";

export const addPhoto =  (file) => {
  return async (dispatch) => {
    const url = `https://api.imgbb.com/1/upload`;
    const formData = new FormData();
    delete axios.defaults.headers.common["x-auth-token"];
   formData.append("image", file);
  formData.append("key", "881f6a30630e96747675ad6aa76cb50b");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    
  dispatch({
    type: UPLOAD_PHOTO_SUCCESS,
    payload: await  post(url, formData, config),
  });
  };
};
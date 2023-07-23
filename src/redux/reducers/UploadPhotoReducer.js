import {
    UPLOAD_PHOTO_SUCCESS,
}from "../../data/actionTypes"

const initialState = {
    uploadPhoto: {},
    loading: true,
   
}

const UploadPhotoReducer = (state  = initialState, action) =>{
    switch (action.type) {
        case UPLOAD_PHOTO_SUCCESS : 
            return {
                ...state,
                uploadPhoto : action.payload,

            }
         default:
            return state;
        }
} ;
export default UploadPhotoReducer


import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toggle } from "../../../../../../../../redux/actions/AdminActions";
import TextField from "@material-ui/core/TextField";
import axios, { post } from "axios";
import Select from "react-select";
import { editCoachList } from "../../../../../../../../redux/actions/CoachActions";
import { getActivity } from "../../../../../../../../redux/actions/ActivityActions";
import { colourStyles } from "../../../../../../../../data/select-react-styles";
import UploadPhoto from "../../../../../../../common-components/upload-photo/UploadPhoto";

const EditNewCoach = (props) => {
  const { activityList } = props.activityReducer;
  const { coachListDetails } = props.coachListReducer;
  const { alerts } = props.alertReducer;

  const [formData, setFormData] = useState({
    _id: coachListDetails._id,
    givenName: coachListDetails.givenName,
    familyName: coachListDetails.familyName,
    alternateName: coachListDetails.alternateName,
    image: {
      _url: coachListDetails.image && coachListDetails.image._url,
      _delete_url: coachListDetails.image && coachListDetails.image._delete_url,
    },
    activities: coachListDetails.activities && coachListDetails.activities,
    socialmedia: {
      facebook:
        coachListDetails.socialmedia && coachListDetails.socialmedia.facebook,
      instagram:
        coachListDetails.socialmedia && coachListDetails.socialmedia.instagram,
      youtube:
        coachListDetails.socialmedia && coachListDetails.socialmedia.youtube,
    },
    email: coachListDetails.email,
    phone: coachListDetails.phone,
    description: coachListDetails.description,
    num: coachListDetails.num,
    id_resamania: coachListDetails.coachDetails,
  });
  const [file, setFile] = useState(
    coachListDetails.image && coachListDetails.image._url
  );
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const {
    givenName,
    familyName,
    alternateName,
    image,
    email,
    socialmedia,
    description,
    activities,
  } = formData;

  useEffect(() => {
    props.getActivity({});
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeActivity = (newValue) => {
    setFormData({
      ...formData,
      activities: newValue,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const photoFile = await fileUpload(file);
    formData.image._url = photoFile.data.data.display_url;
    formData.image._delete_url = photoFile.data.data.delete_url;
    props.editCoachList(formData);
  };

  let photoChanged = false;

  const onChangePhoto = (e) => {
    const [file] = e.target.files;
    if (file && file.size < 614400) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      photoChanged = true;
    } else {
      window.alert(
        "fichier trés volumineux,Veuillez télécharger un fichier ne dépassant pas 300 K0"
      );
      setFile(coachListDetails.image && coachListDetails.image._url);
    }
  };

  const onChangeSocialMedia = (e) => {
    setFormData({ ...formData });
    if (e.target.name === "facebook") {
      formData.socialmedia.facebook = e.target.value;
    }
    if (e.target.name === "instagram") {
      formData.socialmedia.instagram = e.target.value;
    }
    if (e.target.name === "youtube") {
      formData.socialmedia.youtube = e.target.value;
    }
  };
  const fileUpload = async (file) => {
    const url = `https://api.imgbb.com/1/upload`;
    const formData = new FormData();
    await delete axios.defaults.headers.common["x-auth-token"];
    await formData.append("image", file);
    await formData.append("key", "881f6a30630e96747675ad6aa76cb50b");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="block-image-container">
        <div>
          <UploadPhoto
            firstImageSrc={image._url}
            onChangeImage={onChangePhoto}
            uploadedImage={uploadedImage}
            className="image-container-circular-bordered"
          />
        </div>
      </div>
      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>Prénom</h3>
          <TextField
            label="prénom"
            className="input-modal-input-box"
            name="givenName"
            value={givenName}
            onChange={(e) => onChange(e)}
          />
          <label className="alert">
            {alerts.givenName && alerts.givenName}
          </label>
        </div>
        <div className="input-modal-element">
          <h3>Nom</h3>

          <TextField
            label="Nom"
            placeholder="nom"
            className="input-modal-input-box"
            value={familyName}
            name="familyName"
            onChange={(e) => onChange(e)}
          />
          <label className="alert">
            {alerts.familyName && alerts.familyName}
          </label>
        </div>
      </div>

      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>Adresse email</h3>
          <TextField
            label="Adresse email"
            className="input-modal-input-box"
            value={email}
            name="email"
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="input-modal-element">
          <h3>Téléphone</h3>

          <TextField
            label="phone"
            placeholder="phone"
            className="input-modal-input-box"
            name="phone"
            onChange={(e) => onChange(e)}
            type="number"
          />
        </div>

        <div className="input-modal-element">
          <h3>Nom alternatif</h3>
          <TextField
            label="Nom alternatif"
            placeholder="Nom alternatif"
            className="input-modal-input-box"
            name="alternateName"
            value={alternateName}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="input-modal-element input-select-box">
          <h3>Activités</h3>
          <Select
            placeholder="activities"
            isMulti
            onChange={handleChangeActivity}
            options={activityList.map((e) => ({
              label: e.name,
              value: e["@id"],
            }))}
            value={activities}
            styles={colourStyles}
          />
          <label className="alert">
            {alerts.activities && alerts.activities}
          </label>
        </div>
      </div>
      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>Facebook</h3>

          <TextField
            label="facebook"
            placeholder="facebook"
            className="input-modal-input-box"
            value={socialmedia.facebook}
            name="facebook"
            onChange={(e) => onChangeSocialMedia(e)}
          />
        </div>
        <div className="input-modal-element">
          <h3>Instagram</h3>

          <TextField
            label="instagram"
            placeholder="instagram"
            className="input-modal-input-box"
            value={socialmedia.instagram}
            name="instagram"
            onChange={(e) => onChangeSocialMedia(e)}
          />
        </div>
        <div className="input-modal-element">
          <h3>Youtube</h3>

          <TextField
            label="youtube"
            placeholder="youtube"
            className="input-modal-input-box"
            value={socialmedia.youtube}
            name="youtube"
            onChange={(e) => onChangeSocialMedia(e)}
          />
        </div>
      </div>

      <div className="input-modal-inputs-container">
        <div className="input-modal-element input-modal-description">
          <h3>Description</h3>
          <TextField
            label="description"
            placeholder="description"
            multiline
            rowsMax={4}
            className="input-modal-input-box"
            value={description}
            name="description"
            onChange={(e) => onChange(e)}
          />
          <label className="alert">
            {alerts.description && alerts.description}
          </label>
        </div>
      </div>

      <div className="button-container-add">
        <button className="btn-ev btn-s uppercase" type="submit">
          Modifier
        </button>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },

  editCoachList: (coach) => {
    dispatch(editCoachList(coach));
  },
  getActivity: () => {
    dispatch(getActivity());
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    coachListReducer: state.CoachListReducer,
    activityReducer: state.ActivityReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNewCoach);

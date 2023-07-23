import React, { useEffect, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios, { post } from "axios";
import { connect } from "react-redux";
import Select from "react-select";
import { addCoach } from "../../../../../../../redux/actions/CoachActions";
import UploadPhoto from "../../../../../../common-components/upload-photo/UploadPhoto";
import { colourStyles } from "../../../../../../../data/select-react-styles";
import {
  LOAD_ACTIVITIES,
  LOAD_COACHES,
} from "../../../../../../graphQL/Queries";
import { useQuery } from "@apollo/client";

const AddCoachModalContent = (props) => {
  const { alerts } = props.alertReducer;
  const [activityList, setSportList] = useState([]);
  const [coachList, setCoachList] = useState([]);
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    alternateName: "",
    image: {
      _url: "https://i.ibb.co/Wt4Bz6x/user3.png",
      _delete_url: "",
    },
    activities: [],
    socialmedia: {
      facebook: "",
      instagram: "",
      youtube: "",
    },
    email: "",
    phone: "",
    description: "",
    calendly: "",
    num: coachList.length,
  });
  const [file, setFile] = useState("https://i.ibb.co/Wt4Bz6x/user3.png");
  const uploadedImage = useRef(null);
  const { data: dataCoach } = useQuery(LOAD_COACHES);

  const { loading: loadingActivities, data: dataActivities } =
    useQuery(LOAD_ACTIVITIES);

  const {
    givenName,
    familyName,
    alternateName,
    email,
    phone,
    socialmedia,
    description,
    calendly,
  } = formData;

  useEffect(() => {
    if (dataActivities) {
      setSportList(dataActivities.activities);
    }

    if (dataCoach) {
      setCoachList(dataCoach.coaches);
    }
  }, [dataActivities, dataCoach]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeActivity = (newValue, actionMeta) => {
    setFormData({
      ...formData,
      activities: newValue,
      num: coachList.length,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const photoFile = await fileUpload(file);
    formData.image._url = photoFile.data.data.display_url;
    formData.image._delete_url = photoFile.data.data.delete_url;
    await props.addCoach(formData);
    setFormData({
      givenName: "",
      familyName: "",
      alternateName: "",
      image: {
        _url: "https://i.ibb.co/Wt4Bz6x/user3.png",
        _delete_url: "",
      },
      activities: [],
      socialmedia: {
        facebook: "",
        instagram: "",
        youtube: "",
      },
      email: "",
      phone: "",
      description: "",
      calendly: "",
      num: coachList.length,
    });
  };

  const onChangePhoto = (e) => {
    const [file] = e.target.files;
    if (file && file.size < 307200) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      window.alert(
        "fichier trés volumineux,Veuillez télécharger un fichier ne dépassant pas 300 K0"
      );
      setFile("https://i.ibb.co/Wt4Bz6x/user3.png");
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
    <>
      <div className="block-image-container">
        <UploadPhoto
          firstImageSrc="https://i.ibb.co/Wt4Bz6x/user3.png"
          onChangeImage={onChangePhoto}
          uploadedImage={uploadedImage}
        />
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="input-modal-inputs-container">
          <div className="input-modal-element">
            <h3>Prénom</h3>
            <TextField
              className="input-modal-input-box"
              name="givenName"
              value={givenName && givenName}
              onChange={(e) => onChange(e)}
            />
            <label className="alert">
              {alerts.givenName && alerts.givenName}
            </label>
          </div>
          <div className="input-modal-element">
            <h3>Nom</h3>
            <TextField
              className="input-modal-input-box"
              value={familyName && familyName}
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
              className="input-modal-input-box"
              name="email"
              value={email && email}
              onChange={(e) => onChange(e)}
            />
            <label className="alert">{alerts.email && alerts.email}</label>
          </div>
          <div className="input-modal-element input-select-box">
            <h3>Activités</h3>
            <Select
              isMulti
              placeholder="activities"
              onChange={handleChangeActivity}
              options={
                !loadingActivities
                  ? activityList.map((e) => ({
                      label: e.name,
                      value: e.id,
                    }))
                  : null
              }
              styles={colourStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
            <label className="alert">
              {alerts.activities && alerts.activities}
            </label>
          </div>

          <div className="input-modal-element">
            <h3>Téléphone</h3>
            <TextField
              className="input-modal-input-box"
              type="number"
              value={phone && phone}
              name="phone"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="input-modal-element">
            <h3>Nom alternatif</h3>
            <TextField
              className="input-modal-input-box"
              name="alternateName"
              value={alternateName && alternateName}
              onChange={(e) => onChange(e)}
            />
            <label className="alert">
              {alerts.familyName && alerts.familyName}
            </label>
          </div>
        </div>
        <div className="input-modal-inputs-container">
          <div className="input-modal-element">
            <h3>Facebook</h3>
            <TextField
              placeholder="Facebook"
              className="input-modal-input-box"
              value={socialmedia && socialmedia.facebook}
              name="facebook"
              onChange={(e) => onChangeSocialMedia(e)}
            />
          </div>
          <div className="input-modal-element">
            <h3>Instagram</h3>

            <TextField
              placeholder="Instagram"
              className="input-modal-input-box"
              value={socialmedia && socialmedia.instagram}
              name="instagram"
              onChange={(e) => onChangeSocialMedia(e)}
            />
          </div>
          <div className="input-modal-element">
            <h3>Youtube</h3>

            <TextField
              placeholder="Youtube"
              className="input-modal-input-box"
              value={socialmedia && socialmedia.youtube}
              name="youtube"
              onChange={(e) => onChangeSocialMedia(e)}
            />
          </div>
        </div>

        <div className="input-modal-inputs-container">
          <div className="input-modal-element input-modal-description">
            <h3>Description</h3>

            <TextField
              placeholder="Description"
              multiline
              rows={6}
              className="input-modal-input-box"
              value={description && description}
              name="description"
              onChange={(e) => onChange(e)}
            />
            <label className="alert">
              {alerts.description && alerts.description}
            </label>

            <h3>Calendly coach</h3>

            <TextField
              placeholder="calendly"
              multiline
              rows={6}
              className="input-modal-input-box"
              value={calendly && calendly}
              name="calendly"
              onChange={(e) => onChange(e)}
            />
            <label className="alert">
              {alerts.calendly && alerts.calendly}
            </label>
          </div>
        </div>

        <div className="button-container-add">
          <button className="btn-ev btn-s uppercase" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addCoach: (coach) => {
    dispatch(addCoach(coach));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCoachModalContent);

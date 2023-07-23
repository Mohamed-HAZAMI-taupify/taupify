import React, { useRef, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { post } from "axios";
import { connect } from "react-redux";
import SelectStatic from "react-select";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { addMember } from "../../../../../../redux/actions/ClientActions";
import { toggle } from "../../../../../../redux/actions/AdminActions";
import UploadPhoto from "../../../../../common-components/upload-photo/UploadPhoto";

const AddMemberModal = (props) => {
  const { member } = props.adminReducer.modal;
  const { alerts } = props.alertReducer;

  const [file, setFile] = useState("");

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    prospectType: "EVEREST web",
    essaie: false,
    comment: "",
    subscribe: true,
    birthday: "1990-01-01",
    civilite: "",
    password: "",
    image: {
      _url: "https://i.ibb.co/GHCw38g/unnamed22.png",
      _delete_url: "",
    },
  });
  const {
    firstname,
    lastname,
    email,
    phone,
    prospectType,
    essaie,
    comment,
    civilite,
    image,
    birthday,
    password,
  } = formData;
  const onChangeCivilite = (e) => {
    civilite = e.value;
  };
  const onChange = (e) => {
    let el = e.target.value;
    if (e.target.type === "checkbox") {
      el = e.target.checked;
    }

    formData.password = formData.firstname + formData.phone;
    setFormData({ ...formData, [e.target.name]: el });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const photoFile = await fileUpload(file);
    image._url = photoFile.data.data.display_url;
    image._delete_url = photoFile.data.data.delete_url;
    props.addMember(formData);
  };

  const onChangePhoto = (e) => {
    setFile(e.target.files[0]);
    const [file] = e.target.files;
    if (file && file.size < 614400) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Veuillez télécharger une photo qui ne dépasse pas 300 K0");
    }
  };
  const options = [
    {
      label: "Femme",
      value: "femme",
    },
    {
      label: "Homme",
      value: "homme",
    },
    {
      label: "Autre",
      value: "autre",
    },
  ];
  const fileUpload = (file) => {
    const url = `https://api.imgbb.com/1/upload`;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "881f6a30630e96747675ad6aa76cb50b");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  return (
    <Modal
      isOpen={member}
      toggle={() => props.toggle("member", false)}
      className="add-prospect-modal add-container-admin-modals coach-adding-modal"
    >
      <div className="add-modal-admin-header">
        {" "}
        <ModalHeader toggle={() => props.toggle("member", false)}></ModalHeader>
      </div>
      <div className="add-prospect-modal-content">
        <ModalBody>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="block-image-container">
              <UploadPhoto
                firstImageSrc="https://i.ibb.co/Jt2xK2k/791768-middle.png"
                onChangeImage={onChangePhoto}
                uploadedImage={uploadedImage}
              />
              <div
                className="image-container-circular-bordered"
                onClick={() => imageUploader.current.click()}
              >
                <img
                  className="image-circular-bordered"
                  src="https://i.ibb.co/Wt4Bz6x/user3.png"
                  ref={uploadedImage}
                />
              </div>
            </div>
            <span className="add-title-white">Modifier Membre</span>
            <div className="inputs-add-container">
              <div className="input-add max">
                <SelectStatic
                  className="input-add-box select-box"
                  name="civilite"
                  onChange={(e) => {
                    onChangeCivilite(e);
                  }}
                  options={options}
                />
              </div>
              <div className="input-add">
                <TextField
                  placeholder="Prénom"
                  className="input-filled-add-box"
                  value={firstname}
                  name="firstname"
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">
                  {alerts.firstname && alerts.firstname}
                </label>
              </div>
              <div className="input-add">
                <TextField
                  placeholder="nom"
                  className="input-filled-add-box"
                  value={lastname}
                  name="lastname"
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">
                  {alerts.lastname && alerts.lastname}
                </label>
              </div>
              <div className="input-add  ">
                <TextField
                  id="date"
                  type="date"
                  name="birthday"
                  placeholder="Date de Naissance"
                  className="input-filled-add-box"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={birthday}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="input-add">
                <TextField
                  placeholder="Téléphone"
                  className="input-filled-add-box"
                  value={phone}
                  name="phone"
                  onChange={(e) => onChange(e)}
                  type="number"
                />
                <label className="alert">{alerts.phone && alerts.phone}</label>
              </div>
              <div className="input-add max ">
                <TextField
                  placeholder="Adresse email"
                  className="input-filled-add-box"
                  value={email}
                  name="email"
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">{alerts.email && alerts.email}</label>
              </div>
              <div className="input-add max ">
                <TextField
                  placeholder="Mot de passe"
                  className="input-filled-add-box"
                  value={password}
                  name="password"
                  disabled
                />
              </div>
              <div className="input-add max ">
                <TextField
                  placeholder="remarque"
                  className="input-filled-add-box"
                  name="comment"
                  value={comment}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="inputs-add-container last-container-add specific-iput-type ">
                <div className=" check-input">
                  <input
                    type="checkbox"
                    name="essaie"
                    value={essaie}
                    onChange={(e) => onChange(e)}
                  ></input>{" "}
                  <h3>ESSAIE</h3>
                  <label htmlFor="essaie"></label>
                </div>
                <div className="input-add select">
                  <h3>COMMENT?</h3>
                  <Select
                    className="input-add-box select-box"
                    value={prospectType}
                    name="prospectType"
                    onChange={(e) => onChange(e)}
                  >
                    <MenuItem value="Everst web">Everest web</MenuItem>
                    <MenuItem value="Téléphone">Téléphone</MenuItem>
                    <MenuItem value="email">email</MenuItem>
                    <MenuItem value="passage">passage</MenuItem>
                    <MenuItem value="Site MSDS">Site MSDS</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="button-container-add">
                <button className=" btn-ev btn-s uppercase" type="submit">
                  Ajouter
                </button>
              </div>
            </div>
          </form>
        </ModalBody>
      </div>
    </Modal>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addMember: (member) => {
    dispatch(addMember(member));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
    alertReducer: state.AlertReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberModal);

import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  addEverfitContact,
  getTrainings,
} from "../../redux/actions/everfit/ContactActions";
import { useMediaQuery } from "react-responsive";
import ImageLoader from "../common-components/image-loader";

const BecomeCoachContactForm = (props) => {
  React.useEffect(() => {
    // props.getTrainings();
    window.scrollTo(0, 0);
  }, []);

  const ResponsiveImage = ({ children }) => {
    const isDesktop = useMediaQuery({ maxWidth: 430 });
    return isDesktop ? children : null;
  };
  const { alerts } = props.alertReducer;
  const { trainingList } = props.everfitContactReducer;
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    email: "",
    mobile: "",
    postalCode: "",
    deliverableMail: true,
    BPJEPSAF:"",
    // training: "62e92d79247e7602843d9d8d",
    motivation: "",
    source: "EVEREST",
  });
  const onChange = (e) => {
    let el = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: el });
  };
  const {
    givenName,
    familyName,
    email,
    mobile,
    deliverableMail,
    postalCode,
    motivation,
    BPJEPSAF,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
      setFormData({ ...formData});
    props.addEverfitContact(formData);
  };
  return (
    <section className="rejoignez-nous-become-coach">
      <section className="first-section-become-coach">
        <div className="image-section-become-coach">
          <ImageLoader
            alt="rejoignez nous-become-coach"
            className="rejoignez-nous-image-become-coach"
            src="https://i.ibb.co/NyzHbxn/DSC09601.jpg"
          />
          <ResponsiveImage>
            <img
              alt="rejoignez nous-become-coach"
              className="rejoignez-nous-image-become-coach"
              src="https://i.ibb.co/T4K69wb/become-coachs.jpg"
            />
          </ResponsiveImage>
        </div>
        <div className="title-image-be-coach">
          <div className="bottom-direction-container">
            <a href="#0">
              <img
                alt="bottom direction"
                className="bottom-direction"
                src="https://i.ibb.co/YPHncCX/bottom-Direction.png"
              ></img>
            </a>
          </div>
        </div>
      </section>

      <section className="inscription-be-coach" id="0">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="formulaire">
            <h2 className="title-become-coach ">
              Envie de démarrer une formation? <br />
              contactez-nous
            </h2>
            <p>
              Nos conseillers vous accompagnent dans votre projet discutons en:
            </p>
            <div className="inputs-be-coach">
              <div className="input-be-coach">
                <h3>
                  PRENOM <span className="required-label">*</span>{" "}
                </h3>
                <TextField
                  className="text-field"
                  name="givenName"
                  value={givenName}
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">
                  {alerts.givenName && alerts.givenName}
                </label>
              </div>
              <div className="input-be-coach">
                <h3>
                  NOM <span className="required-label">*</span>
                </h3>
                <TextField
                  className="text-field"
                  value={familyName}
                  name="familyName"
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">
                  {alerts.familyName && alerts.familyName}
                </label>
              </div>
              <div className="input-be-coach">
                <h3>
                  ADRESSE MAIL <span className="required-label">*</span>
                </h3>
                <TextField
                  className="text-field"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">{alerts.email && alerts.email}</label>
              </div>
              <div className="input-be-coach">
                <h3>
                  TELEPHONE <span className="required-label">*</span>
                </h3>
                <TextField
                  className="text-field"
                  type="number"
                  value={mobile}
                  name="mobile"
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">
                  {alerts.mobile && alerts.mobile}
                </label>
              </div>
              <div className="input-be-coach">
                <h3>
                  CODE POSTALE <span className="required-label">*</span>
                </h3>
                <TextField
                  className="text-field"
                  type="number"
                  value={postalCode}
                  name="postalCode"
                  onChange={(e) => onChange(e)}
               
                />
                <label className="alert">
                  {alerts.postalCode && alerts.postalCode}
                </label>
              </div>
              {/* <div className="input-be-coach">
                <h3>BPJEPS AF</h3>
                <FormControl className="text-field">
                  <Select
                    native
                    id="grouped-native-select"
                    name="trainingId"
                    onChange={(e) => onChange(e)}
                  >
                    {trainingList &&
                      trainingList.map((el, index) => (
                        <option key={index} value={el._id}>
                          {el.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </div> */}
              <div className="input-be-coach">
              <h3>BPJEPS AF</h3>
                <FormControl className="text-field">
                  <Select
                    native
                    id="grouped-native-select"
                    value={BPJEPSAF}
                    onChange={(e) => onChange(e)}
                    name="BPJEPSAF"
                  >
                     <option value={""}>
                      
                      </option>
                    <option
                      value={"BPJEPS AF OPTION HALTÉROPHILIE MUSCULATION"}
                    >
                      BPJEPS AF haltérophilie musculation
                    </option>
                    <option value={"BPJEPS AF OPTION COURS COLLECTIF"}>
                      BPJEPS AF cours collectif
                    </option>
                    <option
                      value={
                        "BPJEPS MENTION SPORTS DE CONTACT (EN COURS D’HABILITATION) "
                      }
                    >
                      BPJEPS mention sports de contact ( en cours
                      d'habilitation)
                    </option>
                  </Select>
                </FormControl>
              </div>
              <div className="input-be-coach max">
                <h3>
                  MESSAGE <span className="required-label">*</span>
                </h3>
                <TextField
                  className="text-field"
                  id="standard-multiline-static"
                  multiline
                  rows={3}
                  value={motivation}
                  name="motivation"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <p>COMMENCEZ AUJOURD'HUI</p>
            <div className="input-checkbox">
              <input
                color="black"
                checked={deliverableMail}
                type="checkbox"
                name="deliverableMail"
                onChange={(e) => onChange(e)}
              ></input>
              <span className="input-label">
              Envoyez-moi des offres et des conseils d'entraînement, de nutrition et de fitness par e-mail, sms, WhatsApp et RCS.
              </span>
            </div>
            <button
              className="button-become-coach"
              style={{
                backgroundColor: "black",
                border: "none",
                height: "40px",
                width: "250px",
                margin: "20px",
                cursor: "pointer",
              }}
              color="primary"
              type="submit"
            >
              <span style={{ color: "white", fontSize: "20px" }}>ENVOYER</span>
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addEverfitContact: (data) => {
    dispatch(addEverfitContact(data));
  },
  getTrainings: () => {
    dispatch(getTrainings());
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    everfitContactReducer: state.EverfitContactReducer,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BecomeCoachContactForm);
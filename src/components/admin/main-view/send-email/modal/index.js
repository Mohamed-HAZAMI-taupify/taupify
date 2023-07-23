import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  Button,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import ModalBody from "reactstrap/lib/ModalBody";
import SendEmailConfirmationModal from "./confirmation";
import { themeEmailData } from "../../../../../data/data";
import { DestinataireEmailData } from "../../../../../data/data";
import TooltipTheme from "./theme";
import Container from "reactstrap/lib/Container";
import { sendEmail } from "../../../../../redux/actions/EmailActions";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { toggle } from "../../../../../redux/actions/AdminActions";
import restart from "../../../../../styles/circular-arrow.svg";
import remove from "../../../../../styles/remove.svg";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ErrorTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#393b44",
    color: "rgb(231, 231, 222)",
    boxShadow: theme.shadows[1],
    fontSize: 18,
  },
}))(Tooltip);
function EmailFormModal(props) {
  const [dropdownThemeOption, setDropdownThemeOption] = useState(false);
  const toggleThemeOption = () => setDropdownThemeOption(!dropdownThemeOption);
  const [dropdownDestinataireOption, setDropdownDestinataireOption] =
    useState(false);
  const toggleDestinataireOption = () =>
    setDropdownDestinataireOption(!dropdownDestinataireOption);
  const [selectedThemeName, setSelectedThemeName] = useState("");
  const [selectedThemeImg, setSelectedThemeImg] = useState("");
  const [selectedDestinataireList, setSelectedDestinataireList] = useState([]);
  let selectedDestinataireListDistincts = [
    ...new Set(selectedDestinataireList),
  ];
  const [emailModal, setEmailmodal] = useState(false);
  const toggleEmailModal = () => setEmailmodal(!emailModal);
  const [objet, setObjet] = useState("");
  const [test, setTest] = useState(true);
  const sendToDestinataires = () => {
    setTest(false);
  };
  const changeObjet = (event) => {
    setObjet(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const allSelected =
    objet &&
    selectedDestinataireListDistincts.length !== 0 &&
    selectedThemeName;
  const allSelectedForTest = objet && selectedThemeName;
  let errorObjet = "";
  let errorDestinataire = "";
  let errorTheme = "";
  if (objet === "") {
    errorObjet = "un objet ";
  }
  if (selectedThemeName === "") {
    errorTheme = "un theme ";
  }
  if (selectedDestinataireListDistincts.length === 0) {
    errorDestinataire = "et un destinataire";
  }
  return (
    <div>
      <Modal isOpen={props.emailFormModal} toggle={props.toggleEmailFormModal}>
        <ModalHeader
          toggle={props.toggleEmailFormModal}
          onClick={() => {
            setSelectedThemeName("");
            setSelectedDestinataireList([]);
            setObjet("");
            setSelectedThemeImg("");
          }}
          className="mail-header"
        >
          <div className="reinitialiser-mail">
            <img src={restart} />
          </div>
          <Snackbar
            open={open}
            autoHideDuration={2500}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <div>
              <Alert onClose={handleClose} severity="success">
                <p>Le mail de test est envoyé avec succès</p>
              </Alert>
            </div>
          </Snackbar>
        </ModalHeader>
        <div className="body-details-prospect">
          <ModalBody>
            <Form>
              <div className="form-group-objet">
                <FormGroup>
                  <Label for="exampleEmail" className="objet-mail">
                    Objet du mail:{" "}
                  </Label>
                  <Input
                    className="form-objet"
                    bsSize="lg"
                    type="text"
                    name="email"
                    id="exampleEmail"
                    placeholder="Objet du mail"
                    value={objet}
                    onChange={changeObjet}
                  />
                </FormGroup>
              </div>
            </Form>
            <div className="drops-container">
              <Container>
                <Row>
                  <Col sm="1" md="6">
                    <ButtonDropdown
                      className="dropdown-theme-mail"
                      isOpen={dropdownThemeOption}
                      toggle={toggleThemeOption}
                    >
                      <DropdownToggle
                        className="mail-button-black mail-button "
                        id="dropdown-basic"
                      >
                        Themes
                      </DropdownToggle>
                      <DropdownMenu>
                        {themeEmailData.map((data, index) => (
                          <div
                            key={index}
                            className="con-tooltip-mail right-mail"
                          >
                            <DropdownItem
                              className="dropdownItem dropdown-item-mail"
                              onClick={() => {
                                setSelectedThemeName(data.theme_name);
                                setSelectedThemeImg(data.theme_image);
                              }}
                            >
                              <div className="tooltip-mail positioned">
                                <TooltipTheme
                                  key={index}
                                  image={data.theme_image}
                                />
                              </div>
                              {data.template_name}
                            </DropdownItem>
                          </div>
                        ))}
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                  <Col sm="1" md="6">
                    <ButtonDropdown
                      className="dropdown-theme-mail"
                      isOpen={dropdownDestinataireOption}
                      toggle={toggleDestinataireOption}
                    >
                      <DropdownToggle
                        className="mail-button-white mail-button"
                        id="dropdown-basic"
                      >
                        Destinataire
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-mail">
                        {DestinataireEmailData.map((data, index) => (
                          <div
                            key={index}
                            className="con-tooltip-mail right-mail"
                          >
                            <DropdownItem
                              className="dropdownItem dropdown-item-mail"
                              onClick={() => {
                                setSelectedDestinataireList([
                                  ...selectedDestinataireList,
                                  data.destination_name,
                                ]);
                              }}
                            >
                              {data.destination_name}
                            </DropdownItem>
                          </div>
                        ))}
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="selected-mail">
                      {selectedThemeName !== "" ? (
                        <>
                          Theme :
                          <p className="selected-mail-res">
                            {selectedThemeName}

                            <span
                              className="remove-icon"
                              onClick={() => {
                                setSelectedThemeName("");
                                setSelectedThemeImg("");
                              }}
                            >
                              <img src={remove} />
                            </span>
                          </p>
                        </>
                      ) : null}
                    </div>
                  </Col>
                  <Col>
                    <div className="selected-mail">
                      {selectedDestinataireListDistincts.length !== 0 ? (
                        <> Destinataires : </>
                      ) : null}
                      {selectedDestinataireListDistincts.map((dest, index) =>
                        dest !== "" ? (
                          <div key={index}>
                            <p className="selected-mail-res">
                              {dest}
                              <span
                                className="remove-icon"
                                onClick={() => {
                                  selectedDestinataireListDistincts.splice(
                                    index,
                                    1
                                  );
                                  setSelectedDestinataireList(
                                    selectedDestinataireListDistincts
                                  );
                                }}
                              >
                                <img src={remove} />
                              </span>
                            </p>
                          </div>
                        ) : null
                      )}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <Container>
              {selectedThemeImg !== "" ? (
                <div className="selected-mail-theme">
                  <TransformWrapper>
                    <TransformComponent>
                      <img
                        alt="Everest Studio page"
                        src={selectedThemeImg}
                      ></img>
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              ) : null}
            </Container>
          </ModalBody>
          <ModalFooter className="mail-footer">
            <div className="envoyer-test">
              {allSelectedForTest ? (
                <a
                  onClick={() => {
                    props.sendEmail(
                      { objet },
                      { selectedDestinataireListDistincts },
                      { selectedThemeName },
                      { test }
                    );
                    handleClick();
                  }}
                >
                  Envoyer un test
                </a>
              ) : null}
            </div>
            {allSelected ? (
              <Button
                className="mail-button mail-button-white"
                onClick={() => {
                  props.toggle("sendEmailConfirmationModal", true);
                  props.toggleEmailFormModal();
                  sendToDestinataires();
                }}
              >
                <span> Envoyer </span>
              </Button>
            ) : (
              <ErrorTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Pour envoyer</Typography>
                    <p>
                      Veuillez choisir {errorObjet} {errorTheme}
                      {errorDestinataire}{" "}
                    </p>
                  </React.Fragment>
                }
              >
                <span>
                  <Button disabled className="mail-button disabled-button">
                    <span> Envoyer </span>
                  </Button>
                </span>
              </ErrorTooltip>
            )}
          </ModalFooter>
        </div>
      </Modal>
      <SendEmailConfirmationModal
        emailModal={emailModal}
        toggleEmailModal={toggleEmailModal}
        objet={objet}
        selectedDestinataireListDistincts={selectedDestinataireListDistincts}
        selectedThemeName={selectedThemeName}
        test={test}
      />
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  sendEmail: (mailObjet, mailDestinataire, mailTheme, mailTest) => {
    dispatch(sendEmail(mailObjet, mailDestinataire, mailTheme, mailTest));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    emailReducer: state.EmailReducer,
    adminReducer: state.AdminReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormModal);

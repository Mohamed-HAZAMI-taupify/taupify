import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Gallery } from "./Gallery";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Modal, ModalBody, Card, CardBody } from "reactstrap";
import { toggle } from "../../redux/actions/AdminActions";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { data } from "../../data/routes/routesData";
import { addContactEverest } from "../../redux/actions/ContactEverestActions";

const Catalogue = (props) => {
  const { catalog } = props.adminReducer.modal;
  const { alerts } = props.alertReducer;

  const [formData, setFormData] = useState({
    email: "",
    subscribe: true,
    state: "exten_emails",
    sourceId: "catalog",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    props.addContactEverest(formData, "catalog");
  };

  return (
    <div className="catalogue-page">
      <Modal isOpen={catalog} className="modal-catalogue" centered>
        <ModalBody>
          <form onSubmit={(e) => onSubmit(e)}>
            <h3>Veuillez entrez votre Email pour continuer</h3>
            <InputGroup>
              <Input
                placeholder="Email ..."
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                className="input-email-catalog"
              />
              <InputGroupAddon addonType="append">
                <Button type="submit">VALIDER</Button>
              </InputGroupAddon>
            </InputGroup>
            <label className="alert-catalog-input">
              {alerts.email && alerts.email}
            </label>
          </form>
        </ModalBody>
      </Modal>
      <Router>
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter initial={false}>
              <Switch location={location} key={location.pathname}>
                <Route path={data.catalogue} component={Gallery} />
              </Switch>
            </AnimatePresence>
          )}
        />
      </Router>
      {/* <div className="gallery">
        <div className="thumbnails">
          <Card className="thumbnail">
            <CardBody>
              {props.prospectCatReducer.prospectCreated.isSubscribed ? (
                <div className="modal-catalog-width">
                  <h2>Jours privilèges !</h2>
                  <h5>
                    Commencez l'expérience et participez à nos offres VIP dans
                    votre futur club.
                  </h5>
                  <h5>
                    Prenez rendez-vous pour découvrir tout l'univers EVEREST.
                  </h5>
                  <h5 className="attention">Attention places limitées !</h5>
                  <a href={data.rdv} className="btn-rdv">
                    <Button className="btn-preinscrire">Prendre un RDV</Button>
                  </a>
                </div>
              ) : (
                <div className="modal-catalog-width">
                  <h2>journées découverte!</h2>
                  <h5>
                    Inscrivez-vous et faites partie de nos membres fondateurs
                  </h5>
                  <h5>
                    pour participer à nos journées découverte dans votre futur
                    club.
                  </h5>

                  <h5 className="attention">Attention places limitées ! </h5>
                  <a href={data.rejoignez_nous} className="btn-rdv">
                    <Button className="btn-preinscrire">Me préinscrire</Button>
                  </a>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div> */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addContactEverest: (prospectCat, state) => {
    dispatch(addContactEverest(prospectCat, state));
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

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);

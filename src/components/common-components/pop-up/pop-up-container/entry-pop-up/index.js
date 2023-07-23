import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleProspectType } from "../../../../../redux/actions/AlertActions";
import { data } from "../../../../../data/routes/routesData";
function EntryPopUp(props) {
  const date = Date.parse(new Date());
  const time = Date.parse("November, 28, 2021") - date;
  return (
    <div className="entry-pop-up-container">
      <h3 className="entry-h3-web weight-semi-bold">
        {time < 0
          ? "DÉMARREZ L'EXPÉRIENCE EVEREST DÈS MAINTENANT AVEC UNE OFFRE DE BIENVENUE! 25% DE RÉDUCTION SUR LES FRAIS D'INSCRIPTION! "
          : "DÉMARREZ L'EXPÉRIENCE EVEREST DÈS MAINTENANT AVEC UNE OFFRE DE BIENVENUE! 25% DE RÉDUCTION SUR LES FRAIS D'INSCRIPTION!"}

        <span className="espace-spans">-</span>
        <span
          className="span-inscription weight-semi-bold"
          onClick={() => {
            props.handleProspectType("entryPopUp");
          }}
        >
          {" "}
          <Link className="link-inscription" to={data.rdv_offre_bienvenue_nav}>
            Prendre rendez-vous
          </Link>
          {/* <a
            className="link-inscription"
            href={
              time < 0
                ? "https://docs.google.com/forms/d/e/1FAIpQLScToGCyTEF-0NFlRplCSpNjxCLe7ICVQA73mM51mH8jQKp79A/viewform"
                : data.rdv_black_friday_pop_up
            }
            target="_blank"
          >
            Je m'inscris{" "}
          </a> */}
        </span>
      </h3>

      <h3 className="entry-h3-mobile ">
        <span className="first-span ">
          {time < 0
            ? "DÉMARREZ L'EXPÉRIENCE EVEREST DÈS MAINTENANT AVEC UNE OFFRE DE BIENVENUE! 25% DE RÉDUCTION SUR LES FRAIS D'INSCRIPTION!"
            : "DÉMARREZ L'EXPÉRIENCE EVEREST DÈS MAINTENANT AVEC UNE OFFRE DE BIENVENUE! 25% DE RÉDUCTION SUR LES FRAIS D'INSCRIPTION!"}
        </span>
        <br />
        <span
          className="span-inscription "
          onClick={() => {
            props.handleProspectType("entryPopUp");
          }}
          chaabene
        >
          <Link className="link-inscription" to={data.rdv_offre_bienvenue_nav}>
            Prendre rendez-vous
          </Link>
          {/* <a
            className="link-inscription weight-semi-bold"
            href={
              time < 0
                ? "https://docs.google.com/forms/d/e/1FAIpQLScToGCyTEF-0NFlRplCSpNjxCLe7ICVQA73mM51mH8jQKp79A/viewform"
                : data.rdv_black_friday_pop_up
            }
            target="_blank"
          >
            Je m'inscris{" "}
          </a> */}
        </span>
      </h3>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleProspectType: (prospectType) => {
    dispatch(handleProspectType(prospectType));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryPopUp);
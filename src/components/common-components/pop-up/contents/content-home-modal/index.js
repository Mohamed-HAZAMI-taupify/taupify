import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggle } from "../../../../../redux/actions/AdminActions";
import { data } from "../../../../../data/routes/routesData";
function ConetntHomeModal(props) {
  return (
    <section className="modal-right-inscri">
      <img
        className="img-logo"
        src="https://i.ibb.co/qF62zhh/logo-everest.png"
      />

      <h2 className="promo-modal-title">JUILLET & AOÛT OFFERTS</h2>

      <p className="promo-description-modal">
        Everest fete son premier anniversaire et à cette occasion JUILLET & AOÛT
        sont OFFERTS pour toute nouvelle inscription
      </p>
      <div className="promo-popup-button">
        <Link
          to={data.rdv_juillet_aout_offerts_pop_up}
          className="link-rdv-pop-up"
        >
          <button
            className=" btn-ev btn-m hvr-transparent uppercase"
            onClick={() => {
              props.toggle("homePageModal", false);
            }}
          >
            <span> prendre rendez-vous </span>
          </button>
        </Link>
      </div>
    </section>
  );
}
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});

export default connect(null, mapDispatchToProps)(ConetntHomeModal);

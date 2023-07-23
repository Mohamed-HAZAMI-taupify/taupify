import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggle } from "../../../../../redux/actions/AdminActions";
import { addPopUpNbre } from "../../../../../redux/actions/PopUpClickActions";
import { data } from "../../../../../data/routes/routesData";
function ContentRentreeHomeModal(props) {
  return (
    <section className="modal-right-home">
      <div className="modal-right-home-container">
        <p className="promo-description-modal title-p uppercase">
          commencez l'expérience Everest aujourd'hui et bénéficiez de 20% de
          réduction sur votre premier règlement !
        </p>
        {/* <h2 className="pop-up-entree-message">
Réservez votre rendez-vous et bénéficiez de nos nombreux avantages
        </h2> */}
      </div>
      <div className="promo-popup-button div-btn-rentree-modal">
        <Link to={data.rdv_pop_up}>
          <button
            className=" btn-ev btn-m hvr-transparent uppercase"
            onClick={async () => {
              await props.addPopUpNbre(1);
              props.toggle("homePageModal", false);
            }}
          >
            J'en profite
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
  addPopUpNbre: (nbr) => {
    dispatch(addPopUpNbre(nbr));
  },
});

export default connect(null, mapDispatchToProps)(ContentRentreeHomeModal);

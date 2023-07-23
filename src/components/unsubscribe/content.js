import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { data } from "../../data/routes/routesData";
const Unsubscribe = (props) => {
  useEffect(() => {
    // props.isSubscribedProspect(props.id);
  }, []);

  const editProspect = async () => {
    // await props.updateSubscription(props.id, false);
  };
  const editProspectToSubscribe = async () => {
    //  await props.updateSubscription(props.id, true);
  };

  return (
    <section className="unsubscription-section">
      {true ? (
        <div className="unsubscription-box">
          <img
            className="unsubscription-image"
            src="https://i.ibb.co/GfmZpV3/unsubscribe.png"
            alt="Oups.."
          ></img>
          <h5>
            Vous avez manifesté le souhait de ne plus être informé(e) <br />
            en avant-première de nos actualités, événements exclusifs et offres
            privilèges.
            <br /> Voulez-vous confirmer?
          </h5>

          <div className="btn-choice">
            <Link className="link-btn-choice" to={data.accueil}>
              <button className="btn-ev btn-s btn-black btn-unsub">
                Annuler
              </button>
            </Link>

            <button className="btn-ev btn-s btn-unsub" onClick={editProspect}>
              Confirmer
            </button>
          </div>
        </div>
      ) : (
        <div className="unsubscription-box">
          <h5>Vous n’êtes plus inscrit à notre newsletter. </h5>
          <h5>Veuillez vous inscrire de nouveau si vous voulez recevoir</h5>
          <h5>en avant-première nos offres et nos conseils par email...</h5>
          <div className="btn-choice">
            <button
              className="btn-ev btn-s btn-unsub btn-black"
              onClick={editProspectToSubscribe}
            >
              <span>S'inscrire</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Unsubscribe;

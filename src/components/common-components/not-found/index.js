import React from "react";
import { data } from "../../../data/routes/routesData";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="wrong-route-page wrong-route-page-path">
      <h2>PAGE WEB INACCESSIBLE </h2>
      <p>Le lien est peut être rompu ou la page a été supprimée.</p>
      <img src="https://i.ibb.co/sqrrSym/error.png" />
      <Link className="link-home" to={data.accueil}>
        Retourner vers la page d'accueil
      </Link>
    </section>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { data } from "../../data/routes/routesData";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="extern-links">
        <a
          href="https://www.instagram.com/everest_sport_club_besancon/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.facebook.com/EverestSportClubBesancon/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-square"></i>
        </a>

        <a
          href="https://www.youtube.com/channel/UCp_GzBY8bA8qwOoYKD-9Ntw"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-youtube"></i>
        </a>
        <a
          href="https://www.linkedin.com/company/everest-sport-club-besan%C3%A7on/?originalSubdomain=fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <ul>
        <Link to={data.mentions_Legales} className="link">
          <li> MENTIONS LÉGALES</li>
        </Link>
        <Link to={data.politique_de_confidentialite} className="link">
          <li> POLITIQUE DE CONFIDENTIALITÉ</li>
        </Link>
        <Link to={data.conditions_generales_de_vente} className="link">
          <li> CONDITIONS GÉNÉRALES DE VENTE</li>
        </Link>
        <Link className="link" to={data.contact_us}>
          <li> CONTACTEZ-NOUS</li>
        </Link>
        <Link className="link" to={data.devenir_coach}>
          <li> DEVENIR COACH</li>
        </Link>
      </ul>
    </footer>
  );
};
export default Footer;
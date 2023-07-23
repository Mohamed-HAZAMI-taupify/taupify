import React from "react";
import Brand from "./Brand";
import BurgerMenu from "./burger-menu";
import CollapseMenu from "./collapse-menu";
import { Link, NavLink, withRouter } from "react-router-dom";
import agenda from "../../assets/agenda.png";
import { NavItem } from "react-bootstrap";
import { connect } from "react-redux";
import { toggle } from "../../redux/actions/AdminActions";
import { logout, logoutEverest } from "../../redux/actions/authActions";
import ConnexionModal from "../common-components/pop-up/pop-up-container/connexion-modal";
import { handleProspectType } from "../../redux/actions/AlertActions";
import { data } from "../../data/routes/routesData";

const Navbar = (props) => {
  const { isAuthenticated, user, isAuthenticatedEverest } = props.authReducer;

  return (
    <nav id="navbar" className="nav-menu weight-regular">
      <div className="bottom-nav">
        <div className="bottom-left">
          <Link to={data.planning}>
            <img
              alt="agenda"
              className="far fa-calendar-alt"
              src={agenda}
            ></img>
          </Link>
          <Link to={data.accueil} className="everest-icon">
            <Brand />
          </Link>
          <div className="burger-wrapper">
            <BurgerMenu />
          </div>
        </div>
        <div className="bottom-right">
          <ul className="nav-links">
            <div className="clubs-link">
              <Link to={data.accueil} className="link">
                ACCUEIL
              </Link>
            </div>
            <Link to={data.experience} className="link">
              EXPÉRIENCE
            </Link>
            <Link to={data.studios} className="link">
              STUDIOS
            </Link>
            <a
              href="https://www.lescale-beaute-and-spa.fr/"
              className="link"
              target="_blank"
            >
              SPA
            </a>
            <Link to={data.coaches} className="link">
              TRAINERS
            </Link>
            <Link to={data.journal} className="link">
              JOURNAL
            </Link>
            <Link to={data.planning} className="link">
              PLANNING
            </Link>
            {/* <Link to={data.location_our_club} className="link">
                LOCATION DE SALLES
              </Link>
              <span className="link separation"> &ensp;&ensp; </span> */}

            <div className="rejoignez-nous">
              {isAuthenticated || isAuthenticatedEverest ? null : (
                <>
                  <Link
                    to={data.rejoignez_nous}
                    className="link"
                    onClick={() => {
                      props.handleProspectType("Rejoignez-nous");
                    }}
                  >
                    M'INSCRIRE
                  </Link>
                  <span className="link separation"> | </span>
                </>
              )}
              <Link
                to={
                  isAuthenticated
                    ? data.member
                    : isAuthenticatedEverest
                    ? data.admin_path
                    : ""
                }
                onClick={() =>
                  !isAuthenticated &&
                  !isAuthenticatedEverest &&
                  props.toggle("connexionModal", true)
                }
                className="link"
              >
                {isAuthenticated
                  ? user.givenName
                  : isAuthenticatedEverest
                  ? "ADMINISTRATION"
                  : "ME CONNECTER"}
              </Link>
              <ConnexionModal />
            </div>
          </ul>
          <Link to={data.rdv_offre_bienvenue_nav} className="prendre-rdv-link">
            <p className="prendre-rdv weight-regular">PRENDRE RENDEZ-VOUS</p>
          </Link>
          {isAuthenticated ? (
            <NavItem
              onClick={() => props.logout()}
              className="nav-item-navigation-logout"
            >
              <div className="navigation-logout">
                <i className="fas fa-sign-out-alt" />
              </div>
            </NavItem>
          ) : null}
          {isAuthenticatedEverest ? (
            <NavItem>
              <NavLink
                tag={Link}
                to={data.login_admin}
                onClick={() => props.logoutEverest()}
              >
                <div className="navigation-logout">
                  <i className="fas fa-sign-out-alt" />
                </div>
              </NavLink>
            </NavItem>
          ) : null}
        </div>
      </div>
      <CollapseMenu />
    </nav>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  logout: () => {
    dispatch(logout());
  },
  logoutEverest: () => {
    dispatch(logoutEverest());
  },
  handleProspectType: (prospectType) => {
    dispatch(handleProspectType(prospectType));
  },
});
const mapStateToProps = (state) => {
  return {
    authReducer: state.AuthReducer,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
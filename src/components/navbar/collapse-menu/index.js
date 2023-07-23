import React from "react";
import { Link } from "react-router-dom";
import { useSpring } from "react-spring";
import { connect } from "react-redux";
import { toggle } from "../../../redux/actions/AdminActions";
import { logout, logoutEverest } from "../../../redux/actions/authActions";
import { data } from "../../../data/routes/routesData";

const CollapseMenu = (props) => {
  const { openStyle } = useSpring({ openStyle: props.navbarState ? 0 : 1 });
  const { isAuthenticated, isAuthenticatedEverest, user } = props.authReducer;
  let navbar_state = props.adminReducer.modal.navbarState;
  const date = Date.parse(new Date());
  const time = Date.parse("November, 28, 2021") - date;
  return navbar_state ? (
    <div
      className="collapse-wrapper"
      style={{
        transform: openStyle
          .interpolate({
            range: [0, 0.2, 0.3, 1],
            output: [0, -20, 0, -200],
          })
          .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
      }}
    >
      <ul className="nav-links">
        <li>
          <Link
            to={data.accueil}
            onClick={() => props.toggle("navbarState", false)}
          >
            ACCUEIL
          </Link>
        </li>
        <li>
          <Link
            to={data.experience}
            onClick={() => props.toggle("navbarState", false)}
          >
            EXPERIENCE
          </Link>
        </li>
        <li>
          <Link
            to={data.studios}
            onClick={() => props.toggle("navbarState", false)}
          >
            STUDIOS
          </Link>
        </li>
        <li>
          <a
            onClick={() => props.toggle("navbarState", false)}
            href="https://www.lescale-beaute-and-spa.fr/"
            target="_blank"
          >
            SPA
          </a>
        </li>
        <li>
          <Link
            to={data.coaches}
            onClick={() => props.toggle("navbarState", false)}
          >
            TRAINERS
          </Link>
        </li>
        <li>
          <Link
            to={data.journal}
            onClick={() => props.toggle("navbarState", false)}
          >
            JOURNAL
          </Link>
        </li>

        <li>
          <Link
            onClick={() => props.toggle("navbarState", false)}
            to={data.planning}
          >
            PLANNING
          </Link>
        </li>

        {/* <li>
          <Link
            onClick={() => props.toggle("navbarState", false)}
            to={data.location_our_club}
          >
            LOCATION DE SALLES
          </Link>
        </li> */}

        <li>
          {isAuthenticated || isAuthenticatedEverest ? null : (
            <Link
              to={data.rejoignez_nous}
              className="link"
              onClick={() => props.toggle("navbarState", false)}
            >
              M'INSCRIRE
            </Link>
          )}
        </li>
        <li>
          <Link
            to={
              time < 0
                ? data.rdv_offre_bienvenue_nav
                : data.rdv_offre_bienvenue_nav
            }
            onClick={() => props.toggle("navbarState", false)}
          >
            PRENDRE RENDEZ-VOUS
          </Link>
        </li>

        <li>
          <Link
            to={
              isAuthenticated
                ? data.member
                : isAuthenticatedEverest
                ? data.admin_path
                : ""
            }
            onClick={() => {
              !isAuthenticated &&
                !isAuthenticatedEverest &&
                props.toggle("connexionModal", true);
              props.toggle("navbarState", false);
            }}
            className="link"
          >
            {isAuthenticated
              ? user.givenName
              : isAuthenticatedEverest
              ? "ADMINISTRATION"
              : "ME CONNECTER"}
          </Link>
          {/* <li>
            <a
              href="https://api.resamania.com/oauth/login/everestsportclubbesancon?client_id=26_2532ba2d23446346e4f83dda1570fdd224ce70c546251c4ce84bd734e0e18811&redirect_uri=https%3A//member.resamania.com/everestsportclubbesancon/&response_type=code"
              className="link"
            >
              ME CONNECTER
            </a>
          </li> */}
        </li>
        <li>
          {isAuthenticated ? (
            <Link
              tag={Link}
              to={data.accueil}
              onClick={() => {
                props.logout();
                props.toggle("navbarState", false);
              }}
            >
              <div className="navigation-logout">
                <i className="fas fa-sign-out-alt" />
              </div>
            </Link>
          ) : null}
          {isAuthenticatedEverest ? (
            <Link
              tag={Link}
              to={data.accueil}
              onClick={() => {
                props.logoutEverest();
                props.toggle("navbarState", false);
              }}
            >
              <div className="navigation-logout">
                <i className="fas fa-sign-out-alt" />
              </div>
            </Link>
          ) : null}
        </li>
      </ul>
    </div>
  ) : null;
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
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
    authReducer: state.AuthReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollapseMenu);
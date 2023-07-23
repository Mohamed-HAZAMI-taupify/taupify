import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import "./styles/style.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/footer";
import Content from "./components/common-components/routing/Content";
import Store from "./redux/Store";
import { loadUser } from "./redux/actions/authActions";
import { loadUserEverest } from "./redux/actions/authActions";
import { connect } from "react-redux";
import setAuthTokenEverest from "./data/utils/setAuthentification";
import EntryPopUp from "./components/common-components/pop-up/pop-up-container/entry-pop-up";
import { IntlProvider } from "react-intl";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { data } from "./data/routes/routesData";
import PopUpEverest from "./components/common-components/pop-up-everest";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});
const link = from([errorLink, new HttpLink()]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App = (props) => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadUserEverest());
  }, []);
  if (localStorage.token) {
    setAuthTokenEverest(localStorage.token);
  }
  const { isAuthenticated, loading, isAuthenticatedEverest } =
    props.authReducer;
  const { homePopup } = props.adminReducer.modal;

  return loading ? (
    <ApolloProvider client={client}>
      <Router>
        {
        window.location.pathname === data.accueil &&
        !isAuthenticated &&
        !isAuthenticatedEverest &&
        !localStorage.getItem("isNewProspect") ? (
          <PopUpEverest
            modalToggle={"homePopup"}
            modalIsOpen={homePopup}
            clientSide={true}
          />
        ) : null}
        <Navbar />
        {window.location.pathname.startsWith(data.admin_path) ||
        window.location.pathname === data.login_admin ||
        window.location.pathname === data.member ||
        window.location.pathname === data.journal ||
        window.location.pathname === data.rdv_vente_flash_mail ||
        window.location.pathname === data.rdv_vente_flash_sms ||
        window.location.pathname === data.rdv_juillet_aout_offerts ||
        window.location.pathname === data.rdv_juillet_aout_offerts_mail ||
        window.location.pathname === data.formulaire_everest ||
        window.location.pathname === data.rdv_juillet_aout_offerts_fb ? null : (
          <EntryPopUp />
        )}
        <IntlProvider locale={"en"}>
          <Content />
        </IntlProvider>
        {window.location.pathname.startsWith(data.admin_path) ? null : (
          <Footer />
        )}
      </Router>
    </ApolloProvider>
  ) : null;
};
const mapDispatchToProps = (dispatch) => ({
  loadUser: () => {
    dispatch(loadUser());
  },
});
const mapStateToProps = (state) => {
  return {
    membersReducer: state.MembersReducer,
    alertReducer: state.AlertReducer,
    authReducer: state.AuthReducer,
    searchingResult: state.SearchingReducer,
    EventReducer: state.EventReducer,
    adminReducer: state.AdminReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

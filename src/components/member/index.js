import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import MemberProfil from "./Profile";
import MemberSessionReservation from "./Reservations";
import MemberListeAttente from "./WaitingList";
import MemberSales from "./Purchase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMemberOwnEvents } from "../../redux/actions/MemberOwnEventsActions";
import { getSubscriptions } from "../../redux/actions/SubscriptionActions";
import ReservationSkeleton from "../common-components/skeleton/ReservationSkeleton";
import { getArticles } from "../../redux/actions/ArticleActions";
import { data } from "../../data/routes/routesData";
import { useQuery } from "@apollo/client";
import {
  LOAD_ACTIVITIES,
  LOAD_CLUBS,
  LOAD_COACHES,
  LOAD_STUDIOS,
} from "../graphQL/Queries";

const Member = (props) => {
  const { user, isAuthenticated, contactId } = props.authReducer;
  const { loading, memberOwnEventsList } = props.membersReducer;
  const [myProfile, setMyProfile] = useState(true);
  const [isBooked, setIsBooked] = useState(false);
  const [waitingList, setWaitingList] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const [bankCard, setBankCard] = useState(false);

  useQuery(LOAD_ACTIVITIES);

  useQuery(LOAD_ACTIVITIES)

  useQuery(LOAD_CLUBS);

  useQuery(LOAD_STUDIOS);

  useQuery(LOAD_COACHES);

  const displayProfile = () => {
    setMyProfile(true);
    setIsBooked(false);
    setWaitingList(false);
    setPurchase(false);
    setBankCard(false);
  };
  const displayMySessions = () => {
    setMyProfile(false);
    setIsBooked(true);
    setWaitingList(false);
    setPurchase(false);
    setBankCard(false);
  };
  const displayWaitingList = () => {
    setMyProfile(false);
    setIsBooked(false);
    setWaitingList(true);
    setPurchase(false);
    setBankCard(false);
  };
  const displayPurchaseList = () => {
    setMyProfile(false);
    setIsBooked(false);
    setWaitingList(false);
    setPurchase(true);
    setBankCard(false);
  };
  const displayBankCarte = () => {
    setMyProfile(false);
    setIsBooked(false);
    setWaitingList(false);
    setPurchase(false);
    setBankCard(true);
  };

  if (!isAuthenticated) {
    return <Redirect replace to={data.accueil} />;
  }
  if (loading) {
    return <ReservationSkeleton />;
  }
  return (
    <section className="member-page">
      <div className="container-member-space">
        <div className="navbar-profile">
          <div className="profile-nav-2">
            <Button
              onClick={displayProfile}
              className="profile-nav-button"
              id={myProfile ? "active-profile-nav-button" : null}
            >
              <span className="navigation-buttons desktop"> Mon Profil</span>
            </Button>
            <Button
              onClick={() => {
                displayMySessions();
              }}
              className="profile-nav-button"
              id={isBooked ? "active-profile-nav-button" : null}
            >
              <span className="navigation-buttons desktop">
                Sessions réservées
              </span>
            </Button>
          </div>
          <div className="profile-nav-2">
            <Button
              onClick={displayWaitingList}
              className="profile-nav-button"
              id={waitingList ? "active-profile-nav-button" : null}
            >
              <span className="navigation-buttons desktop">
                Liste d'attente
              </span>
            </Button>
            <Button
              onClick={() => {
                displayPurchaseList();
              }}
              className="profile-nav-button"
              id={purchase ? "active-profile-nav-button" : null}
            >
              <span className="navigation-buttons desktop"> Achats</span>{" "}
            </Button>
          </div>
        </div>
      </div>
      {myProfile ? <MemberProfil /> : null}
      {isBooked ? <MemberSessionReservation /> : null}
      {waitingList ? <MemberListeAttente /> : null}
      {purchase ? <MemberSales /> : null}
    </section>
  );
};
const mapDispatchToProps = (dispatch) => ({
  getMemberOwnEvents: (page, eventState) => {
    dispatch(getMemberOwnEvents(page, eventState));
  },
  getSubscriptions: () => {
    dispatch(getSubscriptions());
  },
  getArticles: () => {
    dispatch(getArticles());
  },
});
const mapStateToProps = (state) => {
  return {
    membersReducer: state.MembersReducer,
    alertReducer: state.AlertReducer,
    authReducer: state.AuthReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Member);

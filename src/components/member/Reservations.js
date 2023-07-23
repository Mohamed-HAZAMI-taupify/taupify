import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { CancelMemberEvent } from "../../redux/actions/MemberOwnEventsActions";
import MemberOwnEventsCard from "./own-events";
import { NotFoundPage } from "../common-components/not-found/Page";
import WhiteSpinnerLoading from "../common-components/spinner-loanding/WhiteSpinnerLoading";
import Pagination from "@mui/material/Pagination";
import { LOAD_MEMBER_OWN_EVENTS } from "../graphQL/Queries";
import { useQuery } from "@apollo/client";
import jwt_decode from 'jwt-decode';
import {
  LOAD_ACTIVITIES,
  LOAD_CLUBS,
  LOAD_COACHES,
  LOAD_STUDIOS,
} from "../graphQL/Queries";

const MemberSessionReservation = (props) => {
  var today = new Date();
  var endDate = new Date();
  endDate.setHours(today.getHours() + 1, 0, 0, 0);
  const endedAt = endDate
    .toISOString()
    .replace(/\.\d+Z/, "Z")
    .replace(/\:\d+Z/, "Z");

  const [isIncoming, setIsIncoming] = useState(true);
  const [isPast, setIsPast] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [page, setPage] = React.useState(1);
  const [stateMemberOwnEvents, setStateMemberOwnEvents] = useState("booked");
  const [strictlyAfter, setStrictlyAfter] = useState(endedAt);
  const [strictlyBefore, setStrictlyBefore] = useState(null);

  const [memberOwnEventListGQL, setMemberOwnEventListGQL] = useState([]);
  const [memberOwnEventTotalItemsGQL, setMemberOwnEventTotalItemsGQL] =
    useState([]);

  const {
    loading: loadingMemberOwnEvents,
    error: errors,
    data: dataMemberOwnEvents,
    refetch,
  } = useQuery(LOAD_MEMBER_OWN_EVENTS, {
    variables: {
      memberOwnEventsArgs: {
        page: page,
        state: stateMemberOwnEvents,
        strictlyAfter: strictlyAfter,
        strictlyBefore: strictlyBefore,
        targetId: jwt_decode(localStorage.getItem('token')).targetId
      },
    },
    fetchPolicy: "no-cache",
  });

  const { loadingMemberEvents } = props.alertReducer;
  const PaginationLengthInComming = Math.ceil(memberOwnEventTotalItemsGQL / 30);
  const PaginationLengthPastEvents = Math.ceil(
    memberOwnEventTotalItemsGQL / 30
  );
  const PaginationLengthCanceledEvents = Math.ceil(
    memberOwnEventTotalItemsGQL / 30
  );

  useQuery(LOAD_ACTIVITIES);

  useQuery(LOAD_ACTIVITIES)

  useQuery(LOAD_CLUBS);

  useQuery(LOAD_STUDIOS);

  useQuery(LOAD_COACHES);

  useEffect(() => {
    if (dataMemberOwnEvents) {
      setMemberOwnEventListGQL(
        dataMemberOwnEvents.memberOwnEvents[0].memberOwnEventsList
      );
    }
    if (dataMemberOwnEvents) {
      setMemberOwnEventTotalItemsGQL(
        dataMemberOwnEvents.memberOwnEvents[0].totalItems
      );
    }
  }, [dataMemberOwnEvents]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const displayIncomingEvents = () => {
    setPage(1);
    setIsIncoming(true);
    setIsPast(false);
    setIsCanceled(false);
    setStateMemberOwnEvents("booked");
    setStrictlyAfter(endedAt);
    setStrictlyBefore(null);
  };

  const displayPastEvents = () => {
    setPage(1);
    setIsIncoming(false);
    setIsPast(true);
    setIsCanceled(false);
    setStateMemberOwnEvents("booked");
    setStrictlyAfter(null);
    setStrictlyBefore(endedAt);
  };

  const displayCanceledEvents = async () => {
    setIsIncoming(false);
    setIsPast(false);
    setIsCanceled(true);
    setStateMemberOwnEvents("canceled");
    setPage(1);
    setStrictlyAfter(null);
    setStrictlyBefore(null);
  };

  return (
    <div className="member-page">
      <div className="container-fluid">
        <div className="container-after-card">
          <div className="infos-after-card">
            Il est possible d’annuler une réservation
            <b className="im-bold"> jusqu’à 2h </b> à l'avance.
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div className="sessions-reserved-nav ">
          <div className="nav-session-reserved">
            <Button
              onClick={displayIncomingEvents}
              className="session-nav-button"
              id={isIncoming ? "active-session-nav-button" : null}
            >
              <span className="navigation-buttons desktop"> À venir</span>
            </Button>
          </div>
          <div className="nav-session-reserved">
            <Button
              onClick={displayPastEvents}
              className="session-nav-button"
              id={isPast ? "active-session-nav-button" : null}
            >
              <span className="navigation-buttons desktop">passées</span>
            </Button>
          </div>
          <div className="nav-session-reserved">
            <Button
              onClick={displayCanceledEvents}
              className="session-nav-button"
              id={isCanceled ? "active-session-nav-button" : null}
            >
              <span className="navigation-buttons desktop">Annulées</span>
            </Button>
          </div>
        </div>
      </div>

      {loadingMemberOwnEvents || loadingMemberEvents ? (
        <WhiteSpinnerLoading
          loading={loadingMemberOwnEvents || loadingMemberEvents}
        />
      ) : (
        <div className="list_events_padding">
          <div>
            {isIncoming && memberOwnEventListGQL.length > 0 ? (
              <div>
                {memberOwnEventListGQL.map((event, index) => (
                  <MemberOwnEventsCard
                    key={index}
                    i={index}
                    data={event}
                    func={() => {
                      props.CancelMemberEvent(event.id.replace(/^\D+/g, ""));
                      setTimeout(() => {
                        refetch({
                          memberOwnEventsArgs: {
                            page: page,
                            state: stateMemberOwnEvents,
                            strictlyAfter: strictlyAfter,
                            strictlyBefore: strictlyBefore,
                            targetId: jwt_decode(localStorage.getItem('token')).targetId
                          },
                        });
                      }, 2000);
                    }}
                  />
                ))}
                {PaginationLengthInComming > 1 ? (
                  <div className="pagination-container">
                    <Pagination
                      count={PaginationLengthInComming}
                      variant="outlined"
                      color="primary"
                      page={page}
                      onChange={handleChange}
                    />
                  </div>
                ) : null}
              </div>
            ) : isIncoming && memberOwnEventListGQL.length === 0 ? (
              <p className="title-events-not-found">
                Pas d'évenements réservés à venir à afficher
              </p>
            ) : null}
          </div>
          <div>
            {isPast && memberOwnEventListGQL.length > 0 ? (
              <div>
                {memberOwnEventListGQL.map((event, index) => (
                  <MemberOwnEventsCard key={index} i={index} data={event} />
                ))}
                {PaginationLengthPastEvents > 1 ? (
                  <div className="pagination-container">
                    <Pagination
                      count={PaginationLengthPastEvents}
                      variant="outlined"
                      color="primary"
                      page={page}
                      onChange={handleChange}
                    />
                  </div>
                ) : null}
              </div>
            ) : isPast && memberOwnEventListGQL.length === 0 ? (
              <p className="title-events-not-found">
                Pas d'évenements réservés passés à afficher
              </p>
            ) : null}
          </div>

          <div>
            {isCanceled && memberOwnEventListGQL.length > 0 ? (
              <div>
                {memberOwnEventListGQL.map((event, index) => (
                  <MemberOwnEventsCard key={index} i={index} data={event} />
                ))}

                {PaginationLengthCanceledEvents > 1 ? (
                  <div className="pagination-container">
                    <Pagination
                      count={PaginationLengthCanceledEvents}
                      variant="outlined"
                      color="primary"
                      page={page}
                      onChange={handleChange}
                    />
                  </div>
                ) : null}
              </div>
            ) : isCanceled && memberOwnEventListGQL.length === 0 ? (
              <p className="title-events-not-found">
                Pas d'évenements annulés à afficher
              </p>
            ) : null}
          </div>
        </div>
      )}

      {errors ? (
        <NotFoundPage src="https://i.ibb.co/gTt2PYk/reservation.png" />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  CancelMemberEvent: (eventId) => {
    dispatch(CancelMemberEvent(eventId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberSessionReservation);
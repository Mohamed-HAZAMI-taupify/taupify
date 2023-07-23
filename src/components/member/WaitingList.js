import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CancelMemberEvent } from "../../redux/actions/MemberOwnEventsActions";
import MemberOwnEventsCard from "./own-events";
import { NotFoundPage } from "../common-components/not-found/Page";
import { LOAD_MEMBER_OWN_EVENTS } from "../graphQL/Queries";
import Pagination from "@mui/material/Pagination";
import WhiteSpinnerLoading from "../common-components/spinner-loanding/WhiteSpinnerLoading";
import jwt_decode from 'jwt-decode';
import { useQuery } from "@apollo/client";
import {
  LOAD_ACTIVITIES,
  LOAD_CLUBS,
  LOAD_COACHES,
  LOAD_STUDIOS,
} from "../graphQL/Queries";



const MemberListeAttente = (props) => {
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
  const [memberOwnEventListGQL, setMemberOwnEventListGQL] = useState([]);
  const [queued, setStateMemberOwnEvents] = useState("queued");
  const [strictlyAfter, setStrictlyAfter] = useState(endedAt);
  const [strictlyBefore, setStrictlyBefore] = useState(null);
  const displayIncomingEvents = () => {
    setPage(1);
    setIsIncoming(true);
    setIsPast(false);
    setIsCanceled(false);
    setStateMemberOwnEvents("queued");
    setStrictlyAfter(endedAt);
    setStrictlyBefore(null);
  };
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
        state: queued,
        strictlyAfter: strictlyAfter,
        strictlyBefore: strictlyBefore,
        targetId: jwt_decode(localStorage.getItem('token')).targetId
      },
    },
  });

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

  const handleChangePage = (value) => {
    setPage(value);
  };

  const PaginationLength = Math.ceil(memberOwnEventTotalItemsGQL / 30);
  return (
    <div className="member-page">
      <div className="container-fluid">
        <i className="fas fa-tasks mobile icon-member-space"></i> &nbsp;
        <span className="title-member"> Liste d'attente</span>
      </div>
      <div className="container-fluid">
        <div className="container-after-card">
          <div className="infos-after-card">
            Il est possible de s'inscrire au maximum à une liste d'attente
            simultanément. L'inscription en liste d'attente ne requiert pas de
            crédit. Cependant pour passer de la liste d'attente à la liste des
            inscrits pour une session donnée, un crédit valide pour celle-ci est
            nécessaire. Si aucune place se libère 2h avant le début du cours
            alors toutes les inscriptions en liste d'attente sont annulées
          </div>
        </div>
      </div>

      {loadingMemberOwnEvents ? (
        <WhiteSpinnerLoading loading={loadingMemberOwnEvents} />
      ) : (
        <div className="list_events_padding">

          <div>
            {memberOwnEventListGQL.length > 0 ? (
              
              memberOwnEventListGQL.map((event, index) => (
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
                          state: queued,
                          strictlyAfter: strictlyAfter,
                          strictlyBefore: strictlyBefore,
                          targetId: jwt_decode(localStorage.getItem('token')).targetId
                        },
                      });
                    }, 2000);
                  }}
                />
              ))
            ) : memberOwnEventListGQL.length === 0 ? (
              <p className="title-events-not-found">
                Pas d'évenements dans la liste d'attente à venir à afficher
              </p>
            ) : null}

            {PaginationLength > 1 ? (
              <div className="pagination-container">
                <Pagination
                  count={PaginationLength}
                  variant="outlined"
                  color="primary"
                  page={page}
                  onChange={handleChangePage}
                />
              </div>
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

const mapDispatchToProps = (dispatch) => ({
  CancelMemberEvent: (eventId) => {
    dispatch(CancelMemberEvent(eventId));
  },
});
const mapStateToProps = (state) => {
  return {
    memberOwnEventsReducer: state.MemberOwnEventsReducer,
    alertReducer: state.AlertReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberListeAttente);

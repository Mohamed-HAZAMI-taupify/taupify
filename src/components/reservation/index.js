import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DATE_OPTIONS } from "../../data/dateOptions";
import { toggle } from "../../redux/actions/AdminActions";
import {
  GetClassEventById,
  Reserver,
} from "../../redux/actions/MemberOwnEventsActions";
import { Button } from "react-bootstrap";
import { useState } from "react";
import ReservationSkeleton from "../common-components/skeleton/ReservationSkeleton";
import { Link, useParams } from "react-router-dom";
import {
  LOAD_ACTIVITIES,
  LOAD_CLUBS,
  LOAD_COACHES,
  LOAD_STUDIOS,
} from "../graphQL/Queries";
import { useQuery } from "@apollo/client";
import { data } from "../../data/routes/routesData";
import jwt_decode from 'jwt-decode';

const Reservation = (props) => {
  const { id } = useParams();
  const { coach } = useParams();
  const { classEventListById } = props.memberOwnEventsReducer;
  const { isAuthenticated } = props.authReducer;
  const { contactData } = props.membersReducer;
  const { reservationSpinner } = props.alertReducer;

  const { data: dataActivities } = useQuery(LOAD_ACTIVITIES);

  const { data: dataClub } = useQuery(LOAD_CLUBS);

  const { data: dataStudio } = useQuery(LOAD_STUDIOS);

  const { data: dataCoach } = useQuery(LOAD_COACHES);

  const [formData, setFormData] = useState({
    contactNumber: contactData.number,
    classEvent: `/everestsportclubbesancon/class_events/${id}`,
  });

  useEffect(() => {
    props.GetClassEventById(id);
  }, []);

  useEffect(() => {
    setFormData({
      contactNumber: contactData.number,
      classEvent: `/everestsportclubbesancon/class_events/${id}`,
      targetId: localStorage.getItem('token') && jwt_decode(localStorage.getItem('token')).targetId
    });
  }, [contactData]);

  function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
      await props.Reserver(formData, id);
  };

  if (reservationSpinner) {
    return <ReservationSkeleton />;
  }

  const thisCoach =
    dataCoach &&
    dataCoach.coaches.filter(
      (coachs) =>
        coachs.id_resamania_prod ===
        `/everestsportclubbesancon/coaches/${coach}`
    );

  return (
    <div className=" reservation-body">
      <div id="main" className="reservation">
        <div className="wrap">
          <div className="reservation-steps">
            <section className="reservation_step1">
              <div className="w_grid limited-content no-gutter">
                <div className="reservation-title grid-col col_size-10 mobile_size-12 centered">
                  <h1 className="title-xl-black">Réserver une session</h1>
                  <div className="text-regular">
                    Voici le récapitulatif de votre session
                  </div>
                </div>
              </div>
              {classEventListById.length
                ? classEventListById &&
                  classEventListById.map((t, i) => (
                    <div className="w_grid limited-content no-gutter" key={i}>
                      <div className=" ">
                        <div className="resa-cover_container">
                          {thisCoach &&
                            thisCoach.map((coach) => (
                              <img
                                style={{ width: "100%", zIndex: "12" }}
                                className="resa-cover_container_img"
                                src={coach.image._url}
                              ></img>
                            ))}
                        </div>
                      </div>
                      <div className="resa-recap grid-col col_size-5 mobile_size-12">
                        <div className="session-item">
                          <div className="session-item__content thm-border-rowing">
                            <h4 className="masterclass-txt-reservation">
                              {new Date(t.startedAt).toLocaleDateString(
                                "fr",
                                DATE_OPTIONS
                              )}
                            </h4>

                            <h2 className="title-l masterclass-txt-reservation">
                              {dataActivities &&
                                dataActivities.activities.map((activity) =>
                                  activity.id === t.activity
                                    ? activity.name
                                    : null
                                )}
                            </h2>
                            <div className="commentary">
                              {dataClub &&
                                dataClub.clubs.map((club) =>
                                  club.id === t.club ? club.name : null
                                )}
                            </div>
                            <div className="session-item__content_infos">
                              <time className="">
                                {new Date(t.startedAt).getHours() +
                                  ":" +
                                  String(
                                    new Date(t.startedAt).getMinutes()
                                  ).padStart(2, "0")}{" "}
                                ({" "}
                                {t.startedAt && t.endedAt
                                  ? getDifferenceInMinutes(
                                      new Date(t.endedAt),
                                      new Date(t.startedAt)
                                    ) + " min"
                                  : "--"}
                                ) •{" "}
                              </time>
                              <span className="">
                                {dataCoach &&
                                  dataCoach.coaches.map((coach) =>
                                    coach.id_resamania_prod === t.coach
                                      ? " Avec  " + coach.givenName
                                      : null
                                  )}
                              </span>

                              <address className="adress-reservation">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                <span>
                                  {dataStudio &&
                                    dataStudio.studios.map((studio) =>
                                      studio.id === t.studio
                                        ? studio.name
                                        : null
                                    )}
                                </span>
                              </address>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </section>

            <section className="reservation-cta">
              <div className="w_grid limited-content no-gutter">
                <div className="reservation-cta_quit center grid-col col_size-10 margin-1 mobile_size-12">
                  <a href={data.planning} className="link-annuler">
                    Annuler
                  </a>

                  {(isAuthenticated &&
                    classEventListById.map((t) =>
                      t.bookedAttendees
                        .map((k) => k.contactId)
                        .includes(contactData["@id"])
                    ) == "true") ||
                  classEventListById.map((t) =>
                    t.queuedAttendees
                      .map((k) => k.contactId)
                      .includes(contactData["@id"])
                  ) == "true" ? (
                    <div>
                      <Link to={data.planning} className="link-btn-reserver">
                        <Button
                          className="button-reservation negatif button-loader open-login"
                          variant="outline-secondary"
                        >
                          Continuer mes réservations
                        </Button>
                      </Link>
                    </div>
                  ) : null}
                  {isAuthenticated &&
                  classEventListById.map((t) =>
                    t.bookedAttendees
                      .map((k) => k.contactId)
                      .includes(contactData["@id"])
                  ) == "false" &&
                  classEventListById.map((t) =>
                    t.queuedAttendees
                      .map((k) => k.contactId)
                      .includes(contactData["@id"])
                  ) == "false" ? (
                    <div>
                      <form onSubmit={(e) => onSubmit(e)}>
                        <Button
                          className="button-reservation negatif button-loader open-login"
                          type="submit"
                        >
                          Je réserve
                        </Button>
                      </form>
                    </div>
                  ) : null}
                  {!isAuthenticated ? (
                    <div
                      className="button-reservation negatif button-loader open-login"
                      onClick={() => props.toggle("connexionModal", true)}
                    >
                      Je réserve
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  GetClassEventById: (id) => {
    dispatch(GetClassEventById(id));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  Reserver: (classEvent, eventId) => {
    dispatch(Reserver(classEvent, eventId));
  },
});

const mapStateToProps = (state) => {
  return {
    memberOwnEventsReducer: state.MemberOwnEventsReducer,
    authReducer: state.AuthReducer,
    membersReducer: state.MembersReducer,
    alertReducer: state.AlertReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);

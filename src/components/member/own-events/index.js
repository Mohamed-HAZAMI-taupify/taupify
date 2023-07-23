import React from "react";
import Swal from "sweetalert2/src/sweetalert2.js";
import { DATE_OPTIONS_MEMBER_OWN_EVENTS } from "../../../data/dateOptions";

const MemberOwnEventsCard = (props) => {
  const { i, data } = props;
  var dateOfToday = new Date();
  var today = new Date();
  today.setHours(today.getHours() + 2);
  return (
    <div className="member_own_event">
      <ul id="container_planning">
        <li
          id={i}
          className="own-events-item grid-coll col_size-12 is-pointer status-reserver"
          data-jour={data.classEvent ? data.classEvent.startedAt : null}
          //data-sport={data.activityObject ? data.activityObject.name : null}
          data-sport={data.activityName ? data.activityName : null}
          data-coach={data.coachObject ? data.coachObject.givenName : null}
          data-hub="everest-hub"
          data-studio={data.studioObject ? data.studioObject.name : null}
          key={i}
        >
          <div
            className="own-events-item__container thm-after-athletic"
            id="changing-item"
          >
            <div className="planning-cell planning-date">
              <h3 className="title-m masterclass-txt-planning">
                {new Date(data.classEvent.startedAt).toLocaleDateString(
                  "fr",
                  DATE_OPTIONS_MEMBER_OWN_EVENTS
                )}
              </h3>
            </div>
            <div className="planning-cell planning-time">
              {" "}
              <time className="masterclass-txt-planning title-sm">
                {new Date(data.classEvent.startedAt).toLocaleTimeString("fr", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>{" "}
            </div>
            <div className="planning-cell planning-studio">
              <div>
                <div className="con-tooltip left">
                  <h2
                    className="title-m masterclass-txt-planning tooltip-helper"
                    data-type="sport"
                    data-id="927325"
                  >
                    <span
                      className="tooltip-container"
                      href="#"
                      id="UncontrolledTooltipExample"
                    >
                      {/* {data.activityObject ? data.activityObject.name : "--"} */}
                      {data.activityName ? data.activityName : "--"}
                    </span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="planning-cell planning-coach">
              <div className="con">
                <div className="con-tooltip right">
                  <h4
                    className="masterclass-txt-planning tooltip-helper"
                    data-type="coach"
                    data-id="43073"
                  >
                    {data.coachObject ? data.coachObject.givenName : "--"}
                  </h4>
                </div>
              </div>
            </div>

            <div className="planning-cell planning-address">
              {" "}
              <address
                className="masterclass-txt-planning tooltip-helper"
                data-type="hub"
                data-id="927314"
              >
                {data.studioObject ? data.studioObject.name : "--"}
              </address>
            </div>

            {new Date(data.classEvent.startedAt).getTime() <
              dateOfToday.getTime() && data.state === "queued" ? (
              <div className="planning-cell planning-cta">
                <h4 className="masterclass-txt-planning tooltip-helper">
                  {" "}
                  Session non jouée{" "}
                </h4>
              </div>
            ) : new Date(data.classEvent.startedAt).getTime() >
                dateOfToday.getTime() && data.state === "queued" ? (
                  <div className="planning-cell planning-cta">
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Annuler la réservation?",
                        text:
                          "êtes-vous sûr de vouloir annuler la réservation en liste d'attente pour " +
                          data.activityName +
                          " ?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Oui, Annuler!",
                        cancelButtonText: "Non, Ne pas Annuler!",
                        customClass: {
                          cancelButton: "btn-ev btn-black",
                          confirmButton: "btn-ev",
                        },
                      }).then((result) => {
                        if (result.isConfirmed) {
                          props.func();
                        }
                      });
                    }}
                    className="button thm-button-yoga everest-hub"
                  >
                    Annuler
                  </button>
                </div>
            ) : new Date(data.classEvent.startedAt).getTime() <
                dateOfToday.getTime() && data.state === "booked" ? (
              <div className="planning-cell planning-cta">
                <h4 className="masterclass-txt-planning tooltip-helper">
                  {" "}
                  Session jouée{" "}
                </h4>
              </div>
            ) : data.state === "canceled" ? (
              <div className="planning-cell planning-cta">
                <h4 className="masterclass-txt-planning tooltip-helper">
                  Session annulée
                </h4>
              </div>
            ) : new Date(data.classEvent.startedAt) < today &&
              data.state === "booked" ? (
              <div className="planning-cell planning-cta">
                <h4 className="masterclass-txt-planning tooltip-helper">
                  Annulation désactivée
                </h4>
              </div>
            ) : (
              <div className="planning-cell planning-cta">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Annuler la réservation?",
                      text:
                        "êtes-vous sûr de vouloir annuler la réservation pour " +
                        data.activityName +
                        " ?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Oui, Annuler!",
                      cancelButtonText: "Non, Ne pas Annuler!",
                      customClass: {
                        cancelButton: "btn-ev btn-black",
                        confirmButton: "btn-ev",
                      },
                    }).then((result) => {
                      if (result.isConfirmed) {
                        props.func();
                      }
                    });
                  }}
                  className="button thm-button-yoga everest-hub"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MemberOwnEventsCard;
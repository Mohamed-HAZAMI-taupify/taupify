import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from "@fullcalendar/list"; //For List View
import timeGridPlugin from "@fullcalendar/timegrid";
import { Col, Row } from "reactstrap";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2/src/sweetalert2.js";
import { toggle } from "../../redux/actions/AdminActions";
import { connect } from "react-redux";
import AddCalendarEvents from "./add-events";
import { getCalendarEvents } from "../../redux/actions/EventCalendarActions";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const today = new Date();
const tomorrow = new Date(today);
const tomorowDate = tomorrow.setDate(tomorrow.getDate() + 1);
var time = today.getHours() + 1 + ":00";

class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          title: "Event 1",
          id: "1",
          duration: "02:00",
          startTime: "10:00",
          endTime: "18:00",
          daysOfWeek: [1, 2, 3, 4],
          backgroundColor: "lightblue",
          height: "auto",
          start: "2021-03-24T10:00:00",
          end: "2021-03-24T16:00:00",
        },
        {
          title: "Event 2",
          id: "2",
          duration: "01:00",
          startTime: "08:00",
          endTime: "12:00",
          daysOfWeek: [1, 2, 3, 4, 5],
          backgroundColor: "yellow",
          height: "fit-content",
          start: "2021-03-24T12:00:00",
          end: "2021-03-24T16:00:00",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.getCalendarEvents();
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        var title = eventEl.getAttribute("title");
        var id = eventEl.getAttribute("title");
        var event_duration = eventEl.getAttribute("duration");
        var backgroundColor = eventEl.getAttribute("backgroundColor");
        var height = eventEl.getAttribute("height");

        return {
          title: title,
          id: id,
          duration: event_duration,
          backgroundColor: backgroundColor,
          height: height,
          borderColor: backgroundColor,
        };
      },
    });
  }

  eventClick = (eventClick) => {
    Swal.fire({
      title: eventClick.event.title,
      text:
        "êtes-vous sûr de vouloir supprimer l'activité " +
        eventClick.event.title +
        " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",

      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        eventClick.event.remove(); // It will remove event from the calendar

        Swal.fire(
          "Supprimé !",
          eventClick.event.title + " est supprimé avec succès.",
          "success"
        );
      }
    });
  };

  render() {
    const calendarEventList = this.props.eventCalendarReducer.calendarEventList;

    return (
      <div className="container-calendar ">
        <div className="calendar-container">
          <Row>
            <Col lg={3} sm={3} md={3}>
              <div className="center-calendar-events">
                <Button
                  onClick={() => this.props.toggle("calendarEvents", true)}
                  variant="contained"
                  className="add-event-calendar"
                  endIcon={<AddIcon />}
                >
                  Ajouter événement
                </Button>
              </div>

              <div
                id="external-events"
                className="external-events-fc"
                style={{ textAlign: "center" }}
              >
                <div id="external-events-listing">
                  <p className="event-title-calendar">liste des événements</p>
                  {calendarEventList.map((event) => (
                    <div
                      style={{
                        backgroundColor: event.backgroundColor,
                        height: event.height,
                        borderColor: event.backgroundColor,
                      }}
                      className="fc-event"
                      title={event.title.value}
                      data={event._id}
                      key={event._id}
                      duration={event.duration.value}
                      backgroundColor={event.backgroundColor}
                      height={event.height}
                    >
                      <ul>
                        <li>
                          {" "}
                          <span className="bold-span">Evenemnt: </span>
                          {event.title.label}{" "}
                        </li>
                        <li>
                          {" "}
                          <span className="bold-span">Durée: </span>{" "}
                          {event.duration.label}{" "}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            <Col lg={9} sm={9} md={9}>
              <div id="calendar">
                <FullCalendar
                  plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    listPlugin,
                    timeGridPlugin,
                  ]}
                  validRange={{
                    start: tomorowDate,
                  }}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                  }}
                  allDayText="toute la journée"
                  locale="fr"
                  buttonText={{
                    today: "Aujourd'hui",
                    month: "Mois",
                    week: "Semaine",
                    day: "Jour",
                    list: "Liste",
                  }}
                  eventTextColor="black"
                  editable={true}
                  droppable={true}
                  eventDurationEditable={false}
                  initialView="dayGridMonth"
                  events={[
                    { title: "event 1", date: "2021-03-23" },
                    { title: "event 2", date: "2021-03-22" },
                  ]}
                  eventClick={this.eventClick}
                  slotMinTime={"06:00"}
                  slotMaxTime={"23:00"}
                />
              </div>
            </Col>
          </Row>
        </div>

        <AddCalendarEvents />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  getCalendarEvents: () => {
    dispatch(getCalendarEvents());
  },
});
const mapStateToProps = (state) => {
  return {
    eventCalendarReducer: state.EventCalendarReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DemoApp);

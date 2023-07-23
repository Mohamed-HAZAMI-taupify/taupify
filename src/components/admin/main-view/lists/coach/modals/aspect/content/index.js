import React, { useState } from "react";
import { connect } from "react-redux";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2/src/sweetalert2.js";
import { makeStyles } from "@material-ui/core/styles";
import { toggle } from "../../../../../../../../redux/actions/AdminActions";
import {
  deleteNewCoach,
  coachListDetails,
} from "../../../../../../../../redux/actions/CoachActions";

const actions = [
  { icon: <EditIcon />, name: "Edit" },
  { icon: <DeleteForeverIcon />, name: "Supprimer" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: 40,
    transform: "translateZ(0px)",
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    "& .MuiFab-primary": {
      backgroundColor: "black",
    },
  },
}));

function DetailsContentCoach(props) {
  const { coachListDetails } = props.coachListReducer;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openEditModal = async (coach) => {
    await props.toggle("updateCoachModal", true);
    await props.coachListDetails(coach);
    props.toggle("coachDetailsModal", false);
  };

  const deleteCoach = async (el) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer le coach " + el.givenName + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",
      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await props.deleteNewCoach(el._id);
      }
      props.toggle("coachDetailsModal", false);
    });
  };

  return (
    <Card className="card-details">
      <Card.Body>
        <div className="details-container">
          <div className="details-label"> Prénom :</div>
          <div className="details-value">{coachListDetails.givenName}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Nom :</div>
          <div className="details-value">{coachListDetails.familyName}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Activités :</div>
          <div className="details-value">
            {" "}
            {coachListDetails.activities &&
              coachListDetails.activities.map((e, index) => (
                <span key={index}>{e.label}</span>
              ))}
          </div>
        </div>
        <div className="details-container">
          <div className="details-label"> Réseaux Sociaux :</div>
          <div className="details-value">
            <span className="sportlist-deatils-modal">
              <ul className="ul-text">
                <li>
                  {coachListDetails.socialmedia &&
                  coachListDetails.socialmedia.instagram !== "" ? (
                    <a
                      href={`${coachListDetails.socialmedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  ) : (
                    "--"
                  )}
                </li>

                <li>
                  {coachListDetails.socialmedia &&
                  coachListDetails.socialmedia.facebook ? (
                    <a
                      href={`${coachListDetails.socialmedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-square"></i>
                    </a>
                  ) : (
                    "--"
                  )}
                </li>

                <li>
                  {coachListDetails.socialmedia &&
                  coachListDetails.socialmedia.youtube ? (
                    <a
                      href={`${coachListDetails.socialmedia.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  ) : (
                    "--"
                  )}
                </li>
              </ul>
            </span>
          </div>
        </div>
        <div className="details-container">
          <div className="details-label"> Téléphone :</div>
          <div className="details-value">{coachListDetails.phone}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Email :</div>
          <div className="details-value"> {coachListDetails.email}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Date d'inscription :</div>
          <div className="details-value">
            {coachListDetails.date && coachListDetails.date.split("T")[0]}{" "}
            {coachListDetails.date &&
              coachListDetails.date.split("T")[1].split(".")[0]}
          </div>
        </div>
        <div className="details-container">
          <div className="details-label">Description : </div>
          {/* <div className="details-value"> {""} </div> */}
        </div>

        <Card className="card-description">
          <Card.Body>
            <p className="description-details">
              {coachListDetails.description}
            </p>
          </Card.Body>
        </Card>
        <div className={classes.root}>
          <SpeedDial
            FabProps={{ size: "small" }}
            ariaLabel="SpeedDial openIcon example"
            className={classes.speedDial}
            hidden={false}
            icon={<EditIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {
                  handleClose();
                  action.name === "Supprimer" && deleteCoach(coachListDetails);
                  action.name === "Edit" && openEditModal(coachListDetails);
                }}
              />
            ))}
          </SpeedDial>
        </div>
      </Card.Body>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  deleteNewCoach: (coach) => {
    dispatch(deleteNewCoach(coach));
  },
  coachListDetails: (coach) => {
    dispatch(coachListDetails(coach));
  },
});
const mapStateToProps = (state) => {
  return {
    coachListReducer: state.CoachListReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsContentCoach);

import React from "react";
import { connect } from "react-redux";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2/src/sweetalert2.js";
import { makeStyles } from "@material-ui/core/styles";
import {
  deleteStudio,
  StudioDetails,
} from "../../../../../../../../redux/actions/StudiosActions";
import { toggle } from "../../../../../../../../redux/actions/AdminActions";

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

function DetailsContentStudio(props) {
  const { studioDetails } = props.studioReducer;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const deleteStudio = async (el) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text: "êtes-vous sûr de vouloir supprimer le studio " + el.name + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",
      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await props.deleteStudio(el.id.replace(/^\D+/g, ""));
      }
      props.toggle("studioDetailsModal", false);
    });
  };
  const openEditModal = async (studio) => {
    await props.toggle("updateStudioModal", true);
    await props.StudioDetails(studio);
    props.toggle("studioDetailsModal", false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className="card-details">
      <Card.Body>
        <div className="details-container">
          <div className="details-label"> Nom du studio :</div>
          <div className="details-value">{studioDetails.name}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Adresse :</div>
          <div className="details-value">{studioDetails.streetAddress}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Code postal :</div>
          <div className="details-value">{studioDetails.postalCode}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Ville :</div>
          <div className="details-value">{studioDetails.addressLocality}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Pays :</div>
          <div className="details-value">{studioDetails.addressCountry}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Club :</div>
          <div className="details-value">
            {" "}
            {studioDetails.club && studioDetails.club.name}
          </div>
        </div>
        <div className="details-container">
          <div className="details-label"> Crée le :</div>
          <div className="details-value">
            {studioDetails.createdAt && studioDetails.createdAt.split("T")[0]}
            {studioDetails.createdAt &&
              studioDetails.createdAt.split("T")[1].split(".")[0]}
          </div>
        </div>

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
                  action.name === "Supprimer" && deleteStudio(studioDetails);
                  action.name === "Edit" && openEditModal(studioDetails);
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
  StudioDetails: (studio) => {
    dispatch(StudioDetails(studio));
  },
  deleteStudio: (studioId) => {
    dispatch(deleteStudio(studioId));
  },
  StudioDetails: (studio) => {
    dispatch(StudioDetails(studio));
  },
});
const mapStateToProps = (state) => {
  return {
    studioReducer: state.StudioReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsContentStudio);

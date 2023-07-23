import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ImageLoader from "../common-components/image-loader";

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgb(0, 0, 0)",
    color: "#8c8c8c",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    justifyContent: "start",
    ["@media (max-width:800px)"]: {
      justifyContent: "center",
    },
    "&$expanded": {
      margin: "22px 0",
      borderBottom: "1px solid white",
      paddingBottom: "1px",
      color: "rgb(255, 255, 255)",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "rgb(0, 0, 0)",
    color: "rgb(255, 255, 255)",
    fontSize: "30px",
  },
}))(MuiAccordionDetails);

export default function ExperienceFourthRow() {
  const [expanded, setExpanded] = React.useState("panel1");

  const [image, setImage] = React.useState("https://i.ibb.co/fHTxHzD/7.jpg");

  const handleChange = (panel, im) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setImage(newExpanded ? im : im);
  };

  return (
    <div className="experience-studios-grid-forth-row">
      <div className="experience-studios-second-col single-accordeon-content-forth-row">
        <h2 className="experience-title-xl text-left-experience fourth-titel-xl">
          DÉROULEMENT
          <br /> DE VOTRE SÉANCE
        </h2>
        <div className="studio-accord">
          <Accordion
            square
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1", "https://i.ibb.co/fHTxHzD/7.jpg")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography className="typography-title">À L’ARRIVÉE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Mettez-vous en tenue de sport et déposez vos affaires dans l’un
                des casiers à code électronique.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2", "https://i.ibb.co/r0sD4Cb/10.jpg")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography className="typography-title">
                DÉBUT DE SÉANCE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Venez 15 minutes en avance pour que votre coach puisse vous
                expliquer le déroulé et les bénéfices de la session et pour lui
                demander conseil.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={expanded === "panel3"}
            onChange={handleChange(
              "panel3",
              "https://i.ibb.co/PGQq7BC/d-roul-de-la-sc-ance.jpg"
            )}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography className="typography-title">
                DÉROULÉ DE LA SÉANCE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Votre coach vous accompagne dans toutes les étapes de votre
                entraînement pour vous aider à atteindre vos objectifs ! Il vous
                conseille, vous motive, vous encadre et veille à ce que vous
                réalisiez convenablement tous vos exercices.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={expanded === "panel4"}
            onChange={handleChange(
              "panel4",
              "https://i.ibb.co/68SBhn1/Fin-de-session.jpg"
            )}
          >
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <Typography className="typography-title">
                FIN DE SÉANCE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Savourez le retour au calme et la magnifique sensation de
                satisfaction ! Vous avez assuré ! N’oubliez pas que les coachs
                Everest sont toujours à votre disposition, n’hésitez pas à
                solliciter leurs avis à tout moment.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className="experience-fourth-first-col single-accordeon-cover-forth-row ">
        <div className="single-accordeon-cover-item">
          <ImageLoader
            className="single-accordeon-cover-img"
            src={`${image}`}
          />
        </div>
      </div>
    </div>
  );
}
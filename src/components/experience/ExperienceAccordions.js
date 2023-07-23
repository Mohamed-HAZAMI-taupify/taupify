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
      margin: "12px 0",
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

export default function ExperienceAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const [image, setImage] = React.useState(
    "https://i.ibb.co/R2WXp0j/boxing.jpg"
  );

  const handleChange = (panel, image) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setImage(image);
  };

  return (
    <div className="experience-studios-grid">
      <div className="experience-studios-first-col single-accordeon-cover">
        <div className="single-accordeon-cover-item fade-in-image">
          <ImageLoader
            className="single-accordeon-cover-img"
            src={`${image}`}
          />
        </div>
      </div>

      <div className="experience-studios-second-col single-accordeon-content">
        <h2 className="experience-title-xl text-left-experience second-titel-xl">
          Studios <br /> INÉDITS
        </h2>
        <div className="studio-accord">
          <Accordion
            square
            expanded={expanded === "panel1"}
            onChange={handleChange(
              "panel1",
              "https://i.ibb.co/R2WXp0j/boxing.jpg"
            )}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography className="typography-title">BOXING</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Apprenez à boxer comme un professionnel à Everest ! Soyez le
                boxeur que vous rêvez d’être grâce à un entraînement basé sur
                les fondamentaux de la boxe anglaise.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={expanded === "panel2"}
            onChange={handleChange(
              "panel2",
              "https://i.ibb.co/Ycy6Dmb/spirit.jpg"
            )}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography className="typography-title">SPIRIT</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Faites le vide dans votre tête et plongez dans un océan de
                bien-être en pratiquant le sport zen que vous préférez : Yoga,
                Pilates, Body Balance. Vous y trouverez votre bonheur !
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={expanded === "panel3"}
            onChange={handleChange(
              "panel3",
              "https://i.ibb.co/0ypSw43/cycling.jpg"
            )}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography className="typography-title">CYCLING</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Investissez-vous à fond dans un RPM immersif propice au
                dépassement de soi et aux nouveaux records personnels ou encore
                dans notre cours exclusif d’Oxygène Ride.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={expanded === "panel4"}
            onChange={handleChange(
              "panel4",
              "https://i.ibb.co/HrWgvnM/piscine.jpg"
            )}
          >
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <Typography className="typography-title">PISCINE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Plongez dans la piscine Everest pour faire de l’exercice dans un
                cours d’Aqua Bike, d’Aqua Dynamic ou d’Aqua Gym ou pour vous
                détendre après votre entraînement.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            square
            expanded={expanded === "panel5"}
            onChange={handleChange(
              "panel5",
              "https://i.ibb.co/Xs2XznW/athletic.jpg"
            )}
          >
            <AccordionSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
            >
              <Typography className="typography-title">ATHLETIC</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Développez vos capacités physiques telles que l’endurance, la
                souplesse et la coordination en variant les exercices dans un
                entraînement complet et intensif.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            square
            expanded={expanded === "panel6"}
            onChange={handleChange(
              "panel6",
              "https://i.ibb.co/cg0zv7f/euphoria.jpg"
            )}
          >
            <AccordionSummary
              aria-controls="panel6d-content"
              id="panel6d-header"
            >
              <Typography className="typography-title">EUPHORIA</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="studio-description typography-text">
                Défiez vos limites et réalisez ce que vous avez longtemps cru
                impossible dans une atmosphère motivante qui vous aidera à
                réveiller le champion qui sommeille en vous.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
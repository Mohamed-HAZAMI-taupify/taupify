import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card} from "react-bootstrap";

export default function Accordions({ image, title, dataTitle }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
      position: "absolute",
      left: 0,
      bottom: 20,
      zIndex: 1,
      color: "white",
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      marginTop: 5,
      marginLeft: "33.33%",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <Card.Body className="accordion-card-body">
          <div className="accodion-title">
            <span>{title}</span>
            <span>{dataTitle}</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

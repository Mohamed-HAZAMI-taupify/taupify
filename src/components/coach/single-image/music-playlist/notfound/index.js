import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: "20px",
  },
});

export default function PlayListNotFound() {
  const classes = useStyles();

  return (
    <div>
      <h3 className="audio-title">PLAYLIST D'ENTRAINEMENT</h3>
      <Button
        classes={{
          root: classes.root, // class name, e.g. `classes-nesting-root-x`
          label: classes.label, // class name, e.g. `classes-nesting-label-x`
        }}
        className="not-found-button"
      >
        Désolé, pas encore.
      </Button>
    </div>
  );
}

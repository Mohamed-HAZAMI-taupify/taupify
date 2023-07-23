import { Button } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";

export default function ReservationButton(props) {
  const { i, btnName, coach } = props;

  return (
    <div className="planning-cell planning-cta ">
      <Link to={`/reservation/${i}/${coach}`} className="link-btn-reserver">
        <Button className="button thm-button-yoga everest-hub">
          <span className="span-btn-reserver"> {btnName} </span>
        </Button>
      </Link>
    </div>
  );
}

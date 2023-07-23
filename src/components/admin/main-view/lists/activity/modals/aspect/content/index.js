import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { asMinutes } from "pomeranian-durations";

function DetailsContentActivity(props) {
  const { activityById } = props.activityReducer;

  return (
    <Card className="card-details">
      <Card.Body>
        <div className="details-container">
          <div className="details-label"> Nom de l'activité :</div>
          <div className="details-value">{activityById.name}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Durée(s) de l'activité</div>
          <div className="details-value">
            {activityById.durations
              ? activityById.durations.map(
                  (duration) => asMinutes(duration) + "Min  "
                )
              : null}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    activityReducer: state.ActivityReducer,
  };
};

export default connect(
  mapStateToProps,
  null
)(DetailsContentActivity);

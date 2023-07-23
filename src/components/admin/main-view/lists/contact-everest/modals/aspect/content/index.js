import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";

function ContentContactEverestAspectModal(props) {
  const { contactEverestDetails } = props.contactEverestReducer;

  return (
    <Card className="card-details">
      <Card.Body>
        <div className="details-container">
          <div className="details-label"> Prénom :</div>
          <div className="details-value">{contactEverestDetails.givenName}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Nom :</div>
          <div className="details-value">
            {contactEverestDetails.familyName}
          </div>
        </div>
        <div className="details-container">
          <div className="details-label"> Téléphone :</div>
          <div className="details-value">{contactEverestDetails.mobile}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> E-mail :</div>
          <div className="details-value">{contactEverestDetails.email}</div>
        </div>
        <div className="details-container">
          <div className="details-label"> Status :</div>
          <div className="details-value">
            {contactEverestDetails.state ? contactEverestDetails.state : "--"}
          </div>
        </div>
        <div className="details-container">
          <div className="details-label"> Date d'inscription :</div>
          <div className="details-value">
            {" "}
            {contactEverestDetails.createdAt &&
              contactEverestDetails.createdAt.split("T")[0]}
          </div>
        </div>
        <div className="details-container">
          <div className="details-label"> Source :</div>
          <div className="details-value">
            {!contactEverestDetails.sourceId
              ? "--"
              : contactEverestDetails.sourceId}
          </div>
        </div>
        <div className="details-container">
          <div className="details-label"> Subscribe :</div>
          <div className="details-value">
            {contactEverestDetails.subscribe === true ? "Oui" : "Non"}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    contactEverestReducer: state.ContactEverestReducer,
  };
};

export default connect(mapStateToProps, null)(ContentContactEverestAspectModal);

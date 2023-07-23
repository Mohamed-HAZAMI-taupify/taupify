import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import AnalyseProspectType from "./analyse-prospect-type";
import { countPopupClick } from "../../../redux/actions/PopUpClickActions";
import { connect } from "react-redux";
import StatContactEverestByDate from "./Stat-contact-everest-by-date";

function AnalyseProspect(props) {
  useEffect(() => {
    props.countPopupClick();
  }, []);

  const { popUpNumber } = props.popUpNbreReducer;

  return (
    <div className="container-admin analyse-container">
      <Row>
        <Col md className="col-analyse">
          <AnalyseProspectType />
        </Col>
        <Col md className="col-analyse">
          <StatContactEverestByDate />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="pop-up-click-number">
            <h3>
              Nombre de click sur le Pop Up d'accueil :
              <span> {popUpNumber && popUpNumber.map((t) => t)}</span>
            </h3>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  countPopupClick: () => {
    dispatch(countPopupClick());
  },
});
const mapStateToProps = (state) => {
  return {
    popUpNbreReducer: state.PopUpNbreReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyseProspect);

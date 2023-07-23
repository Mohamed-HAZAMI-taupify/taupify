import React from "react";
import { Col, Row } from "reactstrap";
import AnalyseProspectAll from "../../../analyse-prospect/analyse-everest-prospect";
import StatExternEmailsBySourceId from "../../../analyse-prospect/extern-emails";
import StatFakeClientBySourceId from "../../../analyse-prospect/fake-client";
import StatLostClientBySourceId from "../../../analyse-prospect/lost-client";

const StatsProspectsBySource = () => {
  return (
    <>
      <Row>
        <Col sm={6}>
          <div className="statistiques-card">
            <AnalyseProspectAll />
          </div>
        </Col>
        <Col sm={6}>
          <div className="statistiques-card">
            <StatExternEmailsBySourceId />
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm={6}>
          <div className="statistiques-card">
            <StatFakeClientBySourceId />
          </div>
        </Col>
        <Col sm={6}>
          <div className="statistiques-card">
            <StatLostClientBySourceId />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StatsProspectsBySource;

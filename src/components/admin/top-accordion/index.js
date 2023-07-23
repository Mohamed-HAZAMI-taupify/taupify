import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { LOAD_CONTACT_EVEREST_BY_STATE } from "../../graphQL/Queries";
import { useQuery } from "@apollo/client";
import Accordions from "../../common-components/accordions";

function TopAccordion() {
  const [statContactEverestByState, setStatContactEverestByState] = useState(
    []
  );

  const { data: dataStatContactEverestByState } = useQuery(
    LOAD_CONTACT_EVEREST_BY_STATE
  );

  useEffect(() => {
    if (dataStatContactEverestByState) {
      setStatContactEverestByState(
        dataStatContactEverestByState.getStatContactEverestByState
      );
    }
  }, [dataStatContactEverestByState]);

  return (
    <Row>
      {statContactEverestByState.map((stat, index) => (
        <Col lg className="col-accordion" key={index}>
          <Accordions
            title={
              stat.groupedBy == "lost_client"
                ? "Prospects Archivés"
                : stat.groupedBy == "fake_client"
                ? "Prospects Test"
                : stat.groupedBy == "exten_emails"
                ? "Emails Externes"
                : stat.groupedBy
            }
            dataTitle={stat.count}
          />
        </Col>
      ))}
    </Row>
  );
}

export default TopAccordion;

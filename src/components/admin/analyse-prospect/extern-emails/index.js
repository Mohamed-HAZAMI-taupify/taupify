import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import BarChart from "../../../common-components/chart-bar";
import { LOAD_CONTACT_EVEREST_BY_SOURCEID } from "../../../graphQL/Queries";

const StatExternEmailsBySourceId = () => {
  const [statContactEverestBySourceId, setStatContactEverestBySourceId] =
    useState([]);

  const {
    loading: loadingStatContactEverestBySourceId,
    error: errorStatContactEverestBySourceId,
    data: dataStatContactEverestBySourceId,
  } = useQuery(LOAD_CONTACT_EVEREST_BY_SOURCEID, {
    variables: {
      filter: {
        state: "exten_emails",
      },
    },
  });

  useEffect(() => {
    if (dataStatContactEverestBySourceId) {
      setStatContactEverestBySourceId(
        dataStatContactEverestBySourceId.getStatContactEverestBySourceId
      );
    }
  }, [dataStatContactEverestBySourceId]);

  return (
    <>
      <BarChart
        loading={loadingStatContactEverestBySourceId}
        fetchError={errorStatContactEverestBySourceId}
        dataFetch={statContactEverestBySourceId}
        labels={statContactEverestBySourceId.map((e) => e.groupedBy)}
        title={"Prospects EVEREST Emails Extérieur"}
        data={statContactEverestBySourceId.map((e) => e.count)}
        text={"Prospects EVEREST Emails Extérieur par Source"}
        backgroundColor={["rgba(60, 99, 255, 0.6)", "rgba(50, 159, 64, 0.6)"]}
      />
    </>
  );
};

export default StatExternEmailsBySourceId;

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import BarChart from "../../../common-components/chart-bar";
import { LOAD_CONTACT_EVEREST_BY_SOURCEID } from "../../../graphQL/Queries";

const StatLostClientBySourceId = () => {
  const [statContactEverestBySourceId, setStatContactEverestBySourceId] =
    useState([]);

  const {
    loading: loadingStatContactEverestBySourceId,
    error: errorStatContactEverestBySourceId,
    data: dataStatContactEverestBySourceId,
  } = useQuery(LOAD_CONTACT_EVEREST_BY_SOURCEID, {
    variables: {
      filter: {
        state: "lost_client",
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
        title={"Prospects EVEREST Archivés"}
        data={statContactEverestBySourceId.map((e) => e.count)}
        text={"Prospects EVEREST Archivés par Source"}
        backgroundColor={["rgba(50, 159, 64, 0.6)", "rgba(50, 19, 64, 0.6)"]}
      />
    </>
  );
};

export default StatLostClientBySourceId;

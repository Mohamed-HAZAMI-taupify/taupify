import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { LOAD_CONTACT_EVEREST_BY_STATE } from "../../../graphQL/Queries";
import { useQuery } from "@apollo/client";
import { defaultProps } from "../../../../data/utils/defaultProps";

const AnalyseProspectType = (props) => {
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
    <div className="analyse-prospect">
      <div className="card">
        <div className="card-header analyse-prospect-header">
          <h4 className="analyse-prospect-title">Contact Everest par Type</h4>
        </div>
        <div className="card-body">
          <div className="card-block">
            <div className="prospect-chart">
              <div className="chart">
                <Pie
                  data={{
                    labels: statContactEverestByState.map((e) =>
                      e.groupedBy == "lost_client"
                        ? "Prospects Archivés"
                        : e.groupedBy == "fake_client"
                        ? "Prospects Test"
                        : e.groupedBy == "exten_emails"
                        ? "Emails Externes"
                        : e.groupedBy
                    ),
                    datasets: [
                      {
                        label: "nombre de Contact Everest par Type",
                        data: statContactEverestByState.map((e) => e.count),
                        backgroundColor: [
                          "rgba(255, 0, 0, 0.6)",
                          "rgba(60, 99, 255, 0.6)",
                          "rgba(153, 102, 255)",
                          "rgba(50, 159, 64, 0.6)",
                          "rgba(255, 100, 86, 0.6)",
                          "rgba(0, 99, 132, 0.6)",
                        ],
                      },
                    ],

                    options: {
                      scale: {
                        ticks: {
                          beginAtZero: false,
                        },
                      },
                    },
                  }}
                  options={{
                    maintainAspectRatio: false,
                    title: {
                      display: defaultProps.displayTitle,
                      text: "nombre de Contact Everest par Type ",
                      fontSize: 20,
                    },
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            min: 0,
                            stepSize: 1,
                          },
                        },
                      ],
                    },
                    legend: {
                      display: defaultProps.displayLegend,
                      position: defaultProps.legendPosition,
                    },
                  }}
                  width={100}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnalyseProspectType;

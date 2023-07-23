import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_CONTACT_EVEREST_BY_DATE } from "../../../graphQL/Queries";
import { Line } from "react-chartjs-2";
import { defaultProps } from "../../../../data/utils/defaultProps";

const StatContactEverestByDate = () => {
  const [statContactEverestByDate, setStatContactEverestByDate] = useState([]);
  const [statLostClientByDate, setStatLostClientByDate] = useState([]);
  const [statExternEmailsByDate, setStatExternEmailsByDate] = useState([]);

  const { data: dataStatContactEverestByDate } = useQuery(
    LOAD_CONTACT_EVEREST_BY_DATE,
    {
      variables: {
        filter: {
          state: "prospect",
        },
      },
    }
  );

  const { data: dataStatLostClientByDate } = useQuery(
    LOAD_CONTACT_EVEREST_BY_DATE,
    {
      variables: {
        filter: {
          state: "lost_client",
        },
      },
    }
  );

  const { data: dataStatExternEmailsByDate } = useQuery(
    LOAD_CONTACT_EVEREST_BY_DATE,
    {
      variables: {
        filter: {
          state: "exten_emails",
        },
      },
    }
  );

  useEffect(() => {
    if (dataStatContactEverestByDate) {
      setStatContactEverestByDate(
        dataStatContactEverestByDate.getStatContactEverestByDate
      );
    }
    if (dataStatLostClientByDate) {
      setStatLostClientByDate(
        dataStatLostClientByDate.getStatContactEverestByDate
      );
    }
    if (dataStatExternEmailsByDate) {
      setStatExternEmailsByDate(
        dataStatExternEmailsByDate.getStatContactEverestByDate
      );
    }
  }, [
    dataStatContactEverestByDate,
    dataStatLostClientByDate,
    dataStatExternEmailsByDate,
  ]);

  return (
    <>
      <div className="analyse-prospect">
        <div className="card">
          <div className="card-header analyse-prospect-header">
            <h4 className="analyse-prospect-title">Contact Everest par Date</h4>
          </div>
          <div className="card-body">
            <div className="card-block">
              <div className="prospect-chart">
                <div className="chart">
                  <Line
                    data={{
                      labels: statContactEverestByDate.map((e) => e.groupedBy), //data._id
                      datasets: [
                        {
                          label: "nombre de Prospects Everest par Date",
                          data: statContactEverestByDate.map((e) => e.count),
                          backgroundColor: "rgba(153, 102, 255)",
                          fill: false,
                          borderColor: "rgba(153, 102, 255)",
                          borderWidth: 3,
                        },
                        {
                          label: "nombre de contact Everest archivés par Date",
                          data: statLostClientByDate.map((e) => e.count),
                          backgroundColor: "rgba(255, 99, 132)",
                          fill: false,
                          borderColor: "rgba(255, 99, 132)",
                          borderWidth: 3,
                        },
                        {
                          label:
                            "nombre de contact Everest Emails extérieur par Date",
                          data: statExternEmailsByDate.map((e) => e.count),
                          backgroundColor: "rgba(54, 162, 235)",
                          fill: false,
                          borderColor: "rgba(54, 162, 235)",
                          borderWidth: 3,
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
                        text: "nombre de Contact Everest par Date ",
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
    </>
  );
};

export default StatContactEverestByDate;

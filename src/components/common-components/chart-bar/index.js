import React from "react";
import { Bar } from "react-chartjs-2";
import { defaultProps } from "../../../data/utils/defaultProps";
import NotFoundBody from "../not-found/Body";
import SpinnerLoadings from "../spinner-loanding";

const BarChart = (props) => {
  const {
    labels,
    title,
    data,
    text,
    loading,
    fetchError,
    dataFetch,
    backgroundColor,
  } = props;

  if (loading) {
    return <SpinnerLoadings loading={loading} />;
  }

  if ((!dataFetch && !loading) || fetchError) {
    return <NotFoundBody />;
  }

  return (
    <div className="analyse-prospect">
      <div className="card">
        <div className="card-header analyse-prospect-header">
          <h4 className="analyse-prospect-title">{title}</h4>
        </div>
        <div className="card-body">
          <div className="card-block">
            <div className="prospect-chart">
              <div className="chart">
                <Bar
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        label: title,
                        data: data,
                        backgroundColor: backgroundColor,
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
                      text: text,
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

export default BarChart;

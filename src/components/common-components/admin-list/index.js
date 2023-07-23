import React from "react";
import { ExportDataXLSXDouble } from "../../export-data-xlsx/Double";
import NotFoundBody from "../not-found/Body";
import SpinnerLoadings from "../spinner-loanding";

const AdminList = (props) => {
  if (props.loading) {
    return <SpinnerLoadings loading={props.loading} />;
  }
  return !props.listData && !props.loading ? (
    <NotFoundBody />
  ) : (
    <div className="table-container">
      <table className="table-back-office">
        <thead>
          <tr>
            <th>Num</th>
            {props.listData[0] &&
              Object.keys(props.listData[0]).map(
                (field, index) =>
                  props.fieldsToShow.includes(field) && (
                    <th key={index}>{field}</th>
                  )
              )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.listData &&
            props.listData.map((el, indexData) => (
              <tr key={indexData}>
                <td>{indexData + 1}</td>
                {Object.keys(el).map(
                  (field, index) =>
                    props.fieldsToShow.includes(field) &&
                    (props.customCell &&
                    props.customCell.map((el) => el.field).includes(field) ? (
                      
                      props.customCell.find((el) => el.field === field).cell
                      
                    ) : (
                      <td key={index}>{el[field]}</td>
                    ))
                )}

                <td className="actions-cell">
                  {props.customIcons.map((icon, index) => (
                    <span
                      key={index}
                      className="action-icon"
                      onClick={() => {
                        window.sessionStorage.setItem(
                          "clickedElement",
                          JSON.stringify(el)
                        );
                        icon.action();
                      }}
                    >
                      <i className={icon.iconClassName}></i>
                    </span>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="export-button">
        <ExportDataXLSXDouble
          csvData={props.listData}
          option1={"Affichés"}
          fileName={window.location.pathname.split("/").pop() + "_filtrés"}
          csvData2={props.listData}
          fileName2={"tous_les_" + window.location.pathname.split("/").pop()}
          option2={"Tous"}
        />
      </div>
    </div>
  );
};

export default AdminList;

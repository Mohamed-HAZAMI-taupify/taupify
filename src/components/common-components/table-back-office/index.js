
import React from "react";
import { connect } from "react-redux";
import { handleScrollPage } from "../../../redux/actions/Searching";
import ExportDataXLSX from "../../export-data-xlsx";
import NotFoundBody from "../not-found/Body";
import SpinnerLoadings from "../spinner-loanding";

const TableBackOffice = (props) => {
  const handleScroll = async (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight + 1) {
      await props.handleScrollPage(props.page + 1);
    }
  };

  if (props.loading) {
    return <SpinnerLoadings loading={props.loading} />;
  }
  return (!props.listData && !props.loading) || props.error ? (
    <NotFoundBody />
  ) : (
    <>
      <div className="export-button">
        <ExportDataXLSX
          csvData={props.listData}
          fileName={props.fileName}
          buttonName={"Télecharger sous format csv"}
        />
      </div>
      <div className="table-container">
        <table className="table-back-office">
          <thead>
            <tr>
              <th>Num</th>
              {props.theadData.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody onScroll={handleScroll}>{props.tbody}</tbody>
        </table>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleScrollPage: (page) => {
    dispatch(handleScrollPage(page));
  },
});

export default connect(null, mapDispatchToProps)(TableBackOffice);

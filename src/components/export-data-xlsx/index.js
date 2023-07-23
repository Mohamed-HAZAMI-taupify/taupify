import React from "react";
import Button from "react-bootstrap/Button";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Tooltip } from "@material-ui/core";

const ExportDataXLSX = (props) => {
  const { csvData, fileName, buttonName } = props;

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Tooltip title="Télécharger sous format xlsx">
      <Button
        variant="dark"
        className="download-btn"
        onClick={(e) => exportToCSV(csvData, fileName)}
      >
        <span className="download-btn-name">{buttonName}</span>
      </Button>
    </Tooltip>
  );
};

export default ExportDataXLSX;

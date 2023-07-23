import React, { useState } from "react";
import Dropdown from "react-dropdown";
import { SpinnerDotted } from "spinners-react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import "react-dropdown/style.css";

export const ExportDataXLSXDouble = ({
  csvData,
  option1,
  fileName,
  csvData2,
  option2,
  fileName2,
}) => {
  const [selected, setSelected] = useState("");

  const options = [option1, option2];
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const onSelect = async (option) => {
    switch (option.label) {
      case option1:
        exportToCSV(csvData, fileName);
        break;
      case option2:
        exportToCSV(csvData2, fileName2);
        break;
    }
    setSelected("wait");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSelected("done");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSelected("");
  };

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div>
      {selected === "wait" && (
        <SpinnerDotted size={35} thickness={179} speed={131} color="#1d1d1d" />
      )}

      {selected === "" && (
        <Dropdown
          controlClassName="myControlClassName"
          placeholderClassName="myPlaceholderClassName"
          arrowClassName="myArrowClassName"
          menuClassName="myMenuClassName"
          options={options}
          onChange={onSelect}
          placeholder={<i class="fa fa-download" aria-hidden="true"></i>}
        />
      )}
      {selected === "done" && (
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      )}
    </div>
  );
};

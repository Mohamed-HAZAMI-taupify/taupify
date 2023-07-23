import React from "react";
import Select, { components } from 'react-select'
import { FixedSizeList as List } from 'react-window';

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "#f2f2f2" , fontSize:"12px",textTransform: "uppercase",fontFamily:"monospace", letterSpacing:"0.1em" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontFamily: "monospace",
      fontSize: "15px",
      backgroundColor:
         isSelected
        ? data.color
        : isFocused
        ? "grey" //hover highlight color
        : "#222831", //color of the backgroud of all elements,
      color:
         isSelected
        ? data.color
          ? "white"
          : "black"
        : "white", //color of elements (text)
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : "#bbbfca") //onClick highlight
      }
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "grey",


    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "yellow",

  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: "#bbbfca",
      color: "white",

    }
  })
};
///// STYLING FILTER SELECT ENDS /////


const names = [
  {value: "Oliver Hansen", label:"Oliver Hansen"},
  {value: "Van Henry",label:"Van Henry"},
  {value: "April Tucker",label:"April Tucker"},
  {value: "Ralph Hubbard",label:"Ralph Hubbard"},
  {value: "Omar Alexander",label:"Omar Alexander"},
  {value: "Carlos Abbott",label:"Carlos Abbott"},
  {value: "Miriam Wagner",label:"Miriam Wagner"},
  {value: "Bradley Wilkerson",label:"Bradley Wilkerson"},
  {value: "Virginia Andrews",label:"Virginia Andrews"}
];



export default function TrainerFilter() {


  return (
    <div className="grid-col col_size-4 mobile_size-12 filter-container-membre">
      <Select
    closeMenuOnSelect={false}
    placeholder="Entraineur"
    isMulti
    options={names}
    styles={colourStyles}
  />
    </div>
  );
}

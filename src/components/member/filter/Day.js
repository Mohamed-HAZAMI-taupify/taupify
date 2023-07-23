import React from "react";
import Select from "react-select";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#f2f2f2",
    fontSize: "12px",
    textTransform: "uppercase",
    fontFamily: "monospace",
    letterSpacing: "0.1em",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontFamily: "monospace",
      fontSize: "15px",
      backgroundColor: isSelected
        ? data.color
        : isFocused
          ? "grey" //hover highlight color
          : "#222831", //color of the backgroud of all elements,

      color: isSelected ? (data.color ? "white" : "black") : "white", //color of elements (text)
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? data.color : "#bbbfca"), //onClick highlight
      },
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
    },
  }),
};

///// STYLING FILTER SELECT ENDS /////

const days = [
  { value: "LUNDI", label: "LUNDI" },
  { value: "MARDI", label: "MARDI" },
  { value: "MERCREDI", label: "MERCREDI" },
  { value: "JEUDI", label: "JEUDI" },
  { value: "VENDREDI", label: "VENDREDI" },
  { value: "SAMEDI", label: "SAMEDI" },
  { value: "DIMANCHE", label: "DIMANCHE" },
];

export default function DayFilter() {
  return (
    <div className="grid-col col_size-4 mobile_size-12 filter-container-membre">
      <Select
        closeMenuOnSelect={false}
        placeholder="Jours"
        isMulti
        options={days}
        styles={colourStyles}
      />
    </div>
  );
}

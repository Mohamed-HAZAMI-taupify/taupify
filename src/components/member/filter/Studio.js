import React from "react";
import Select, { components } from "react-select";

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

const studios = [
  { value: "bodypump", label: "bodypump" },
  { value: "bodycombat", label: "bodycombat" },
  { value: "bodybalance", label: "bodybalance" },
  { value: "bodyattack", label: "bodyattack" },
  { value: "sprint", label: "sprint" },
  { value: "rpm", label: "rpm" },
  { value: "bodystep", label: "bodystep" },
  { value: "the trip", label: "the trip" },
  { value: "cxworks", label: "cxworks" },
];

export default function StudioFilter() {
  return (
    <div className="grid-col col_size-4 mobile_size-12 filter-container-membre">
      <Select
        closeMenuOnSelect={false}
        placeholder="Studio"
        isMulti
        options={studios}
        styles={colourStyles}
      />
    </div>
  );
}

export const SelectSearchStyle = {
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: "black",
    height: "100%",
    color: "withe",
    borderRadius: 0,
    borderWidth: isFocused ? 1 : isSelected ? 1 : 1,
    borderColor: isFocused ? "grey" : isSelected ? "grey" : "#555",
    minHeight: 45,
    boxShadow: "none", // no box-shadow
    width: 300,
    "&:hover": { borderWidth: 1, borderColor: "grey" }, // border style on hover
  }),
  input: () => ({
    color: "white",
    fontSize: 17,
    fontWeight: 600,
    fontFamily: "Relway, sans-serif",
  }),
  menu: (provided, state) => ({
    ...provided,

    color: "black",
    padding: 0,
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: "#1a1a1a",
    zIndex: 8,
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: 17,
    textTransform: "uppercase",
    fontFamily: "Raleway,sans-serif",
    fontWeight: 800,
    padding: 5,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      zIndex: 8,
      borderWidth: 0,
      borderRadius: 0,
      fontSize: 12,
      fontWeight: 600,
      textAlign: "left",
      textTransform: "uppercase",
      fontFamily: "Relway, sans-serif",
      background: isSelected
        ? "grey"
        : isFocused
        ? "grey" //hover highlight color
        : "#1a1a1a",
      //color of the backgroud of all elements,

      color: isSelected ? (data.color ? "white" : "black") : "white", //color of elements (text)
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? "#bbbfca" : "#bbbfca"), //onClick highlight
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "black",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "sans-serif",
    fontWeight: 600,
  }),
  singleValue: (styles, { data, isFocused, isSelected }) => ({
    ...styles,
    color: "white",
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "sans-serif",
    fontWeight: 600,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontSize: 25,
    ":hover": {
      backgroundColor: "#bbbfca",
      color: "white",
    },
  }),
};

export const PlanningSelectSearchStyle = {
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: "black",
    // marginLeft: 50,
    // marginRight: 50,
    height: "100%",
    color: "withe",
    borderRadius: 0,
    borderWidth: isFocused ? 1 : isSelected ? 1 : 1,
    borderColor: isFocused ? "grey" : isSelected ? "grey" : "#555",
    minHeight: 45,
    boxShadow: "none", // no box-shadow
    width: "100%",
    "&:hover": { borderWidth: 1, borderColor: "grey" }, // border style on hover
  }),
  input: () => ({
    color: "white",
    fontSize: 17,
    fontWeight: 600,
    fontFamily: "Relway, sans-serif",

    //  width: 400,
  }),
  menu: (provided, state) => ({
    ...provided,
    // marginLeft: 50,
    // maddingRight: 50,
    color: "black",
    padding: 0,
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: "#1a1a1a",
    zIndex: 8,

    width: "100%",
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: 17,
    textTransform: "uppercase",
    fontFamily: "Raleway,sans-serif",
    fontWeight: 800,
    padding: 5,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      zIndex: 2008,
      borderWidth: 0,
      borderRadius: 0,
      fontSize: 12,
      fontWeight: 600,
      textAlign: "left",
      textTransform: "uppercase",
      fontFamily: "Relway, sans-serif",
      background: isSelected
        ? "grey"
        : isFocused
        ? "grey" //hover highlight color
        : "#1a1a1a",
      //color of the backgroud of all elements,

      color: isSelected ? (data.color ? "white" : "black") : "white", //color of elements (text)
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? "#bbbfca" : "#bbbfca"), //onClick highlight
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "black",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "sans-serif",
    fontWeight: 600,
  }),
  singleValue: (styles, { data, isFocused, isSelected }) => ({
    ...styles,
    color: "white",
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "sans-serif",
    fontWeight: 600,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontSize: 25,
    ":hover": {
      backgroundColor: "#bbbfca",
      color: "white",
    },
  }),
};

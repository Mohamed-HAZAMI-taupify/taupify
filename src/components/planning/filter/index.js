import * as React from "react";
import { PlanningSelectSearchStyle } from "../../coach/gallery/select-search-style";
import Select from "react-select";

const SearchBarFilter = (props) => {
  const { value, placeholder, options, onChange, isMulti, isLoading } = props;

  return (
    <div className=" filter-container">
      <Select
        isClearable={false}
        value={value}
        closeMenuOnSelect={false}
        placeholder={placeholder}
        isMulti={isMulti}
        options={options}
        styles={PlanningSelectSearchStyle}
        onChange={onChange}
        components={{
          IndicatorSeparator: () => null,
        }}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchBarFilter;

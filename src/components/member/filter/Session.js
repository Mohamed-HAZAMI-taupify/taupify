import React from "react";
import DayFilter from "./Day";
import StudioFilter from "./StudioFilter";
import TimeFilter from "./TimeFilter";
import TypeFilter from "./TypeFilter";
import SportFilter from "./Sport";
import TrainerFilter from "./TrainerFilter";

const FilterSessions = (props) => {
  return (
    <div className="w_grid-member limited-content ">
      <div
        id="filters-list"
        className="fix-shadow-filters"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <DayFilter />
        <TypeFilter />
        <StudioFilter />
        <SportFilter />
        <TimeFilter />
        <TrainerFilter />
      </div>
    </div>
  );
};
export default FilterSessions;
